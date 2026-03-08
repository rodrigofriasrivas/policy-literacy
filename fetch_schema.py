import urllib.request
import json

url = 'https://szyhygctrotfysldfemh.supabase.co/rest/v1/?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6eWh5Z2N0cm90ZnlzbGRmZW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwMDQ5MjcsImV4cCI6MjA4NDU4MDkyN30.ixuEt2C0b4fCoUES_6LIN_vaQKOzEyOjQulIikV2vmg'

req = urllib.request.Request(url)
with urllib.request.urlopen(req) as response:
    data = response.read()
    schema = json.loads(data)

    output = []
    
    # definitions contains tables/views
    if 'definitions' in schema:
        for table_name, table_info in schema['definitions'].items():
            output.append(f"TABLE/VIEW: {table_name}")
            if 'properties' in table_info:
                for col_name, col_info in table_info['properties'].items():
                    col_type = col_info.get('type', 'Unknown')
                    col_format = col_info.get('format', '')
                    description = col_info.get('description', '')
                    # clean up description
                    if isinstance(description, str):
                        description = description.replace('\n', ' ')
                    output.append(f"  - {col_name} ({col_type} {col_format}) : {description}")
            output.append("")
            
    with open('schema_summary.txt', 'w') as f:
        f.write('\n'.join(output))

print("Saved schema_summary.txt")
