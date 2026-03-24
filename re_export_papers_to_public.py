#!/usr/bin/env python3
"""
Re-export papers.json from Supabase to /public/artefact/data/papers.json.
Selects all fields ordered by paper_id.
Supports pagination for large datasets.
"""

import os
import json
from dotenv import load_dotenv
import httpx

# Configuration
load_dotenv()
SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY") or os.getenv("VITE_SUPABASE_PUBLISHABLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY/VITE_SUPABASE_PUBLISHABLE_KEY must be set in .env")
    exit(1)

OUTPUT_FILE = "public/artefact/data/papers.json"

all_papers = []
page_size = 1000
offset = 0

print(f"Fetching papers from Supabase (all fields, ordered by paper_id)...")

try:
    while True:
        # Range header for pagination: start-end (inclusive)
        range_header = f"{offset}-{offset + page_size - 1}"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Range": range_header
        }
        
        response = httpx.get(
            f"{SUPABASE_URL}/rest/v1/papers?select=*&order=paper_id.asc",
            headers=headers,
        )
        response.raise_for_status()
        data = response.json()
        
        if not data:
            break
            
        all_papers.extend(data)
        print(f"Fetched {len(all_papers)} papers so far...")
        
        # If we got fewer than page_size, we've hit the end
        if len(data) < page_size:
            break
            
        offset += page_size

    # Save as JSON to the public/artefact/data directory
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding='utf-8') as f:
        json.dump(all_papers, f, indent=2, ensure_ascii=False)

    print(f"Successfully exported {len(all_papers)} papers to {OUTPUT_FILE}")

except Exception as e:
    print(f"Error during export: {e}")
    exit(1)
