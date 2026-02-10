-- View: v_chart5_bigram_trends
-- Description: Annual count of bigram occurrences per topic from 1980 to 2025.
-- Top 5 bigrams per topic based on overall frequency.
-- Assumes existence of 'bigram_paper_links' table linking papers to bigrams via paper_id.

CREATE OR REPLACE VIEW public.v_chart5_bigram_trends AS
WITH 
years AS (
    SELECT generate_series(1980, 2025) AS year
),
-- Identify Top 5 Bigrams per Topic
top_bigrams AS (
    SELECT 
        id as bigram_id,
        topic_id,
        bigram,
        ROW_NUMBER() OVER (PARTITION BY topic_id ORDER BY normalized_frequency DESC) as rnk
    FROM public.bigrams
),
ranked_bigrams AS (
    SELECT * FROM top_bigrams WHERE rnk <= 5
),
-- Get Topic Info
topics_info AS (
    SELECT id, COALESCE(label, title, 'Topic ' || id) as topic_label, color 
    FROM public.topics
),
-- Generate All Combinations (Year x Top Bigram)
combinations AS (
    SELECT 
        y.year,
        rb.topic_id,
        t.topic_label,
        rb.bigram_id,
        rb.bigram,
        rb.rnk as bigram_rank,
        t.color as series_color
    FROM years y
    CROSS JOIN ranked_bigrams rb
    JOIN topics_info t ON rb.topic_id = t.id
),
-- Count Actual Occurrences
counts AS (
    SELECT 
        p.year,
        bpl.bigram_id,
        COUNT(*) as cnt
    FROM public.papers p
    JOIN public.bigram_paper_links bpl ON p.paper_id = bpl.paper_id
    WHERE p.year BETWEEN 1980 AND 2025
    GROUP BY p.year, bpl.bigram_id
)
SELECT 
    c.year,
    c.topic_id,
    c.topic_label,
    c.bigram,
    c.bigram_rank,
    COALESCE(cnt.cnt, 0) as value,
    c.series_color
FROM combinations c
LEFT JOIN counts cnt ON c.year = cnt.year AND c.bigram_id = cnt.bigram_id
ORDER BY c.topic_id, c.bigram_rank, c.year;

GRANT SELECT ON public.v_chart5_bigram_trends TO anon;
GRANT SELECT ON public.v_chart5_bigram_trends TO authenticated;

NOTIFY pgrst, 'reload schema';
