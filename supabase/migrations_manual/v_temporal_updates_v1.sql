-- View: v_corpus_growth_by_year_v1
-- Description: Annual count of papers from 1980 to 2025, filling missing years with 0.

CREATE OR REPLACE VIEW public.v_corpus_growth_by_year_v1 AS
WITH years AS (
    SELECT generate_series(1980, 2025) AS year
),
counts AS (
    SELECT year, COUNT(*) AS papers_count
    FROM public.papers
    GROUP BY year
)
SELECT 
    y.year,
    COALESCE(c.papers_count, 0) AS papers_count
FROM years y
LEFT JOIN counts c ON y.year = c.year
ORDER BY y.year;

-- View: v_topic_trends_10yr_v1
-- Description: Comparison of topic share in period 2015-2024 vs 2005-2014.
-- Returns top 10 rising and top 10 declining topics.

CREATE OR REPLACE VIEW public.v_topic_trends_10yr_v1 AS
WITH base_counts AS (
  SELECT year, COUNT(*) AS year_total
  FROM public.papers
  GROUP BY year
),
topic_annual_counts AS (
    SELECT 
        tpl.topic_id,
        p.year,
        COUNT(*) as papers_in_topic
    FROM public.topic_paper_links tpl
    JOIN public.papers p ON tpl.paper_id = p.id
    GROUP BY tpl.topic_id, p.year
),
period_stats AS (
    SELECT 
        tac.topic_id,
        SUM(CASE WHEN tac.year BETWEEN 2005 AND 2014 THEN tac.papers_in_topic ELSE 0 END) as p1_count,
        (SELECT SUM(year_total) FROM base_counts WHERE year BETWEEN 2005 AND 2014) as p1_corpus,
        SUM(CASE WHEN tac.year BETWEEN 2015 AND 2024 THEN tac.papers_in_topic ELSE 0 END) as p2_count,
        (SELECT SUM(year_total) FROM base_counts WHERE year BETWEEN 2015 AND 2024) as p2_corpus
    FROM topic_annual_counts tac
    GROUP BY tac.topic_id
),
calculated AS (
    SELECT 
        t.id as topic_id,
        COALESCE(t.label, t.title, 'Topic ' || t.id::text) as topic_name,
        t.color as series_color,
        ROUND((ps.p1_count::numeric / NULLIF(ps.p1_corpus, 0)) * 100, 2) as prev_10y_share_pct,
        ROUND((ps.p2_count::numeric / NULLIF(ps.p2_corpus, 0)) * 100, 2) as last_10y_share_pct,
        ROUND(((ps.p2_count::numeric / NULLIF(ps.p2_corpus, 0)) * 100) - ((ps.p1_count::numeric / NULLIF(ps.p1_corpus, 0)) * 100), 2) as share_delta_pp
    FROM period_stats ps
    JOIN public.topics t ON ps.topic_id = t.id
    WHERE ps.p1_corpus > 0 AND ps.p2_corpus > 0
),
ranked AS (
    SELECT *,
        CASE WHEN share_delta_pp > 0 THEN 'rising' ELSE 'declining' END as trend_direction,
        ROW_NUMBER() OVER (PARTITION BY (CASE WHEN share_delta_pp > 0 THEN 1 ELSE 0 END) ORDER BY ABS(share_delta_pp) DESC) as rnk
    FROM calculated
)
SELECT 
    trend_direction as direction,
    topic_id,
    topic_name,
    2005 as start_year,
    2024 as end_year,
    share_delta_pp as share_change_pp,
    series_color
FROM ranked
WHERE rnk <= 10
ORDER BY direction DESC, ABS(share_change_pp) DESC;
