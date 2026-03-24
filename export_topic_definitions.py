#!/usr/bin/env python3
"""
Extract topic definitions from Supabase topics table.
Run from the project root. Requires .env with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
"""

import os
import json
from dotenv import load_dotenv
import httpx

load_dotenv()

SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY") or os.getenv("VITE_SUPABASE_PUBLISHABLE_KEY")

headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
}

response = httpx.get(
    f"{SUPABASE_URL}/rest/v1/topics?select=topic_id,topic_name,definition&order=topic_id.asc",
    headers=headers,
)

topics = response.json()

# Save as JSON for reference
with open("topics_definitions_export.json", "w") as f:
    json.dump(topics, f, indent=2, ensure_ascii=False)

# Save as readable text for editing
with open("topics_definitions_draft.txt", "w") as f:
    for t in topics:
        f.write(f"--- Topic {t['topic_id']}: {t['topic_name']} ---\n")
        f.write(f"{t.get('definition', '[no definition]')}\n\n")

print(f"Exported {len(topics)} topics.")
print("Files: topics_definitions_export.json + topics_definitions_draft.txt")
