#!/usr/bin/env python3
"""
export_data.py  –  Dump all Supabase tables / views to local JSON files
Run from the project root:
    python3 public/artefact/export_data.py
Output folder:  public/artefact/data/
"""

import json
import os
import sys
import urllib.request
import urllib.parse
import urllib.error

# ── Configuration ─────────────────────────────────────────────────────────────
SUPABASE_URL = "https://szyhygctrotfysldfemh.supabase.co"
SUPABASE_KEY = (
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    ".eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6eWh5Z2N0cm90ZnlzbGRmZW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwMDQ5MjcsImV4cCI6MjA4NDU4MDkyN30"
    ".ixuEt2C0b4fCoUES_6LIN_vaQKOzEyOjQulIikV2vmg"
)

HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
}

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(SCRIPT_DIR, "data")
os.makedirs(DATA_DIR, exist_ok=True)

PAGE_SIZE = 1000  # PostgREST max rows per request


# ── Helpers ────────────────────────────────────────────────────────────────────
def fetch_all_paginated(table_or_view, extra_params="", range_mode=False):
    """Fetch every row via pagination.

    range_mode=True  → uses Range header (for tables without stable offset)
    range_mode=False → uses limit/offset query params
    """
    all_rows = []
    page = 0
    print(f"  Fetching {table_or_view} ...", end="", flush=True)

    while True:
        if range_mode:
            start = page * PAGE_SIZE
            end = start + PAGE_SIZE - 1
            url = f"{SUPABASE_URL}/rest/v1/{table_or_view}?select=*{extra_params}"
            req = urllib.request.Request(url)
            for k, v in HEADERS.items():
                req.add_header(k, v)
            req.add_header("Range", f"{start}-{end}")
        else:
            offset = page * PAGE_SIZE
            url = (
                f"{SUPABASE_URL}/rest/v1/{table_or_view}"
                f"?select=*{extra_params}&limit={PAGE_SIZE}&offset={offset}"
            )
            req = urllib.request.Request(url)
            for k, v in HEADERS.items():
                req.add_header(k, v)

        try:
            with urllib.request.urlopen(req) as resp:
                batch = json.loads(resp.read().decode())
        except urllib.error.HTTPError as e:
            body = e.read().decode()
            print(f"\n  ❌ HTTP {e.code} for {table_or_view}: {body}")
            sys.exit(1)

        all_rows.extend(batch)
        print(f" {len(all_rows)}", end="", flush=True)

        if len(batch) < PAGE_SIZE:
            break
        page += 1

    print(f"  → {len(all_rows)} rows total")
    return all_rows


def fetch_view_simple(view_name, select="*", extra_params=""):
    """Fetch a view that fits in one page (no pagination needed)."""
    url = (
        f"{SUPABASE_URL}/rest/v1/{view_name}"
        f"?select={select}{extra_params}&limit=10000"
    )
    req = urllib.request.Request(url)
    for k, v in HEADERS.items():
        req.add_header(k, v)
    print(f"  Fetching view {view_name} ...", end="", flush=True)
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"\n  ❌ HTTP {e.code} for {view_name}: {body}")
        sys.exit(1)
    print(f" → {len(data)} rows")
    return data


def save(filename, data):
    path = os.path.join(DATA_DIR, filename)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, separators=(",", ":"))
    size_kb = os.path.getsize(path) / 1024
    print(f"  ✅ Saved {filename}  ({size_kb:.1f} KB)")


# ── Export tasks ──────────────────────────────────────────────────────────────
def main():
    print("\n=== Supabase → Local JSON Export ===\n")

    # 1. Core tables (range-mode pagination preserves all rows)
    print("[1/7] topics")
    save("topics.json", fetch_all_paginated("topics", range_mode=True))

    print("[2/7] bigrams")
    save("bigrams.json", fetch_all_paginated("bigrams", range_mode=True))

    print("[3/7] papers  (large table – may take a minute)")
    save("papers.json", fetch_all_paginated("papers", range_mode=True))

    print("[4/7] topic_paper_links  (large table)")
    save("topic_paper_links.json", fetch_all_paginated("topic_paper_links", range_mode=True))

    # 2. Named views used by charts
    print("[5/7] v_topic_prevalence_top8_other_by_year_v3  (Chart 1)")
    data5 = fetch_view_simple(
        "v_topic_prevalence_top8_other_by_year_v3",
        select="year,series_key,series_rank,series_name,papers_count,series_color",
        extra_params="&order=year.asc",
    )
    save("v_chart1_prevalence.json", data5)

    print("[6/7] v_topic_trends_10yr_v2  (Chart 3)")
    data6 = fetch_view_simple(
        "v_topic_trends_10yr_v2",
        select="direction,topic_id,topic_name,share_change_pp,first_decade_share,last_decade_share",
    )
    save("v_chart3_trends_10yr.json", data6)

    print("[7a/8] v_chart4_topic_trends  (Chart 4)")
    data7 = fetch_all_paginated(
        "v_chart4_topic_trends",
        extra_params="&order=year.asc,topic_id.asc",
        range_mode=False,
    )
    save("v_chart4_topic_trends.json", data7)

    print("[7b/8] v_chart5_bigram_trends  (Chart 5 – old)")
    data8 = fetch_all_paginated(
        "v_chart5_bigram_trends",
        extra_params="&order=year.asc,bigram_rank.asc",
        range_mode=False,
    )
    save("v_chart5_bigram_trends.json", data8)

    print("[8/8] v_chart5_bigram_trends_corrected  (Chart 5 – corrected)")
    data9 = fetch_all_paginated(
        "v_chart5_bigram_trends_corrected",
        extra_params="&order=year.asc",
        range_mode=False,
    )
    save("v_chart5_bigram_trends_corrected.json", data9)

    print("\n✅ All data exported to:", DATA_DIR)
    print("Next step: open index.html in a browser or serve with:")
    print("  python3 -m http.server 8080  (from the artefact/ folder)\n")


if __name__ == "__main__":
    main()
