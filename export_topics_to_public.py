#!/usr/bin/env python3
"""
Re-export topics.json from Supabase to /public/artefact/data/topics.json.
Selects topic_id, topic_name, and definition ordered by topic_id.
Requires .env with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
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
    print("Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in .env")
    exit(1)

OUTPUT_FILE = "public/artefact/data/topics.json"

headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
}

print(f"Fetching topics from Supabase...")
try:
    response = httpx.get(
        f"{SUPABASE_URL}/rest/v1/topics?select=topic_id,topic_name,definition&order=topic_id.asc",
        headers=headers,
    )
    response.raise_for_status()
    topics = response.json()

    # Save as JSON to the public/artefact/data directory
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w") as f:
        json.dump(topics, f, indent=2, ensure_ascii=False)

    print(f"Successfully exported {len(topics)} topics to {OUTPUT_FILE}")

except Exception as e:
    print(f"Error: {e}")
    exit(1)
