import urllib.request
import json

url = 'https://szyhygctrotfysldfemh.supabase.co/rest/v1/coverage_summary?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6eWh5Z2N0cm90ZnlzbGRmZW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwMDQ5MjcsImV4cCI6MjA4NDU4MDkyN30.ixuEt2C0b4fCoUES_6LIN_vaQKOzEyOjQulIikV2vmg&select=*'
req = urllib.request.Request(url)
with urllib.request.urlopen(req) as response:
    print(json.loads(response.read()))
