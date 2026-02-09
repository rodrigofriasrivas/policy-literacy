-- View: v_chart4_topic_trends
-- Description: Annual count of papers by topic from 1980 to 2025
-- Corrected to use papers.paper_id for join, and output topic_label to match JS

CREATE OR REPLACE VIEW public.v_chart4_topic_trends AS
WITH years AS (
    SELECT generate_series(1980, 2025) AS year
),
topics AS (
    SELECT id, COALESCE(label, title, 'Topic ' || id) as topic_label, color 
    FROM public.topics
),
combinations AS (
    SELECT y.year, t.id as topic_id, t.topic_label, t.color
    FROM years y
    CROSS JOIN topics t
),
counts AS (
    SELECT 
        p.year, 
        tpl.topic_id, 
        COUNT(*) as cnt
    FROM public.papers p
    -- Fix: Join on papers.paper_id (text/original ID) not papers.id (serial PK)
    JOIN public.topic_paper_links tpl ON p.paper_id = tpl.paper_id
    WHERE p.year BETWEEN 1980 AND 2025
    GROUP BY p.year, tpl.topic_id
)
SELECT 
    c.year,
    c.topic_id,
    c.topic_label,
    c.color as series_color,
    COALESCE(cnt.cnt, 0) as papers_count
FROM combinations c
LEFT JOIN counts cnt ON c.year = cnt.year AND c.topic_id = cnt.topic_id
ORDER BY c.year, c.topic_id;

GRANT SELECT ON public.v_chart4_topic_trends TO anon;
GRANT SELECT ON public.v_chart4_topic_trends TO authenticated;

NOTIFY pgrst, 'reload schema';
