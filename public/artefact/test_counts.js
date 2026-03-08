const https = require('https');

const SUPABASE_URL = 'https://szyhygctrotfysldfemh.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6eWh5Z2N0cm90ZnlzbGRmZW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwMDQ5MjcsImV4cCI6MjA4NDU4MDkyN30.ixuEt2C0b4fCoUES_6LIN_vaQKOzEyOjQulIikV2vmg';

function get(table, offset) {
    const url = `${SUPABASE_URL}/rest/v1/${table}?select=paper_id,topic_id&limit=1000&offset=${offset}`;
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
}

async function run() {
    let papers = [];
    let page = 0;
    while (true) { let r = await get('papers', page * 1000); if (!r.length) break; papers.push(...r); page++; }

    let links = [];
    page = 0;
    while (true) { let r = await get('topic_paper_links', page * 1000); if (!r.length) break; links.push(...r); page++; }

    const paperTopicMap = {};
    links.forEach(l => { if (!paperTopicMap[l.paper_id]) paperTopicMap[l.paper_id] = l.topic_id; });

    let mapped = 0;
    let fallback = 0;
    papers.forEach(p => {
        if (paperTopicMap[p.paper_id]) { mapped++; }
        else { fallback++; }
    });

    console.log(`Total papers: ${papers.length}`);
    console.log(`Mapped: ${mapped}`);
    console.log(`Fallback: ${fallback}`);
}
run();
