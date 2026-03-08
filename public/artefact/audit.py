import urllib.request
import json
import os

SUPABASE_URL = "https://szyhygctrotfysldfemh.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6eWh5Z2N0cm90ZnlzbGRmZW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwMDQ5MjcsImV4cCI6MjA4NDU4MDkyN30.ixuEt2C0b4fCoUES_6LIN_vaQKOzEyOjQulIikV2vmg"

def fetch_json(endpoint):
    url = f"{SUPABASE_URL}{endpoint}"
    req = urllib.request.Request(url, headers={'apikey': SUPABASE_KEY, 'Authorization': f'Bearer {SUPABASE_KEY}'})
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode('utf-8'))
    except Exception as e:
        print(f"Error fetching {endpoint}: {e}")
        return []

def audit():
    print("--- Diagnostic Report for Topic 2 ---")
    
    # 1. Total unique papers assigned to Topic 2
    links = fetch_json("/rest/v1/topic_paper_links?topic_id=eq.2")
    papers_in_topic = set([str(l['paper_id']) for l in links])
    print(f"[Topic 2 total papers] = {len(papers_in_topic)}")
    
    # 2. Get top 5 bigrams
    all_bigrams = fetch_json("/rest/v1/bigrams?topic_id=eq.2")
    # Sort them by normalized_frequency
    sorted_bigrams = sorted(all_bigrams, key=lambda x: x.get('normalized_frequency', 0) or 0, reverse=True)[:5]
    top_5_strings = [b['bigram'] for b in sorted_bigrams]
    print(f"Top 5 bigrams: {top_5_strings}")
    
    # 3. Papers for these bigrams (we can look at topic_paper_links to find them)
    # Actually topic_paper_links maps paper_id -> topic_id and bigram string
    # Let's count how many of the Topic 2 links use one of the top 5 bigrams 
    # (Since topic_paper_links has a 'bigram' column)
    papers_with_top_5 = set([str(l['paper_id']) for l in links if l.get('bigram') in top_5_strings])
    
    print(f"[Topic 2 papers covered by top-5 chart] = {len(papers_with_top_5)}")
    uncovered = len(papers_in_topic) - len(papers_with_top_5)
    print(f"[uncovered Topic 2 papers] = {uncovered}")
    
    # 4. Chart 5 values
    chart_data = fetch_json("/rest/v1/v_chart5_bigram_trends_corrected?topic_id=eq.2")
    chart_sum = sum(row['unique_papers_count'] for row in chart_data)
    print(f"[naive sum of points in chart] = {chart_sum}")

audit()
