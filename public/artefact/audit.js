const fetch = require('node-fetch');

async function auditTopic2() {
    const SUPABASE_URL = "https://szyhygctrotfysldfemh.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6eWh5Z2N0cm90ZnlzbGRmZW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwMDQ5MjcsImV4cCI6MjA4NDU4MDkyN30.ixuEt2C0b4fCoUES_6LIN_vaQKOzEyOjQulIikV2vmg";
    const headers = { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` };

    // 1. Fetch all papers for Topic 2
    let res = await fetch(`${SUPABASE_URL}/rest/v1/papers?topic_id=eq.2&select=id`, { headers });
    let papersTopic2 = await res.json();
    const totalPapers = papersTopic2.length;
    console.log(`Topic 2 total papers (from papers logic) = ${totalPapers}`);

    // 2. Fetch all bigrams for Topic 2 to identify the top 5
    res = await fetch(`${SUPABASE_URL}/rest/v1/topic_bigrams?topic_id=eq.2&order=weight.desc&limit=5`, { headers });
    let topBigrams = await res.json();
    const topBigramIds = topBigrams.map(b => b.bigram_id);
    console.log(`Top 5 bigram IDs: ${topBigramIds.join(', ')}`);

    // 3. Fetch paper-bigram links for Topic 2's top 5 bigrams
    const bigramFilter = topBigramIds.map(id => `bigram_id.eq.${id}`).join(',');
    res = await fetch(`${SUPABASE_URL}/rest/v1/paper_bigrams?or=(${bigramFilter})&select=paper_id,bigram_id`, { headers });
    let paperBigrams = await res.json();

    const uniquePapersWithTop5 = new Set(paperBigrams.map(pb => pb.paper_id));
    console.log(`Unique papers containing at least one of the top 5 bigrams: ${uniquePapersWithTop5.size}`);

    // 4. Fetch the chart data
    res = await fetch(`${SUPABASE_URL}/rest/v1/v_chart5_bigram_trends_corrected?topic_id=eq.2&order=year.asc`, { headers });
    let chartData = await res.json();

    let sumOfSeries = 0;
    chartData.forEach(row => { sumOfSeries += row.unique_papers_count; });
    console.log(`Sum of unique_papers_count across the 5 series (naïve sum): ${sumOfSeries}`);

    console.log("\nChart Data Row sample:");
    console.log(chartData.slice(0, 3));
}

auditTopic2().catch(console.error);
