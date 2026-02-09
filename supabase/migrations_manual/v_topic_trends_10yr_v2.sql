-- View: v_topic_trends_10yr_v2
-- Description: Comparison of topic share in period 1980-1989 vs 2016-2025 (Corresponds to "Emerging vs Declining")
-- Replaces v1 to fix the timeframe (1980-1989 vs 2016-2025)

CREATE OR REPLACE VIEW public.v_topic_trends_10yr_v2 AS
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
        -- Period 1: 1980-1989
        SUM(CASE WHEN tac.year BETWEEN 1980 AND 1989 THEN tac.papers_in_topic ELSE 0 END) as p1_count,
        (SELECT COALESCE(SUM(year_total), 0) FROM base_counts WHERE year BETWEEN 1980 AND 1989) as p1_corpus,
        
        -- Period 2: 2016-2025
        SUM(CASE WHEN tac.year BETWEEN 2016 AND 2025 THEN tac.papers_in_topic ELSE 0 END) as p2_count,
        (SELECT COALESCE(SUM(year_total), 0) FROM base_counts WHERE year BETWEEN 2016 AND 2025) as p2_corpus
    FROM topic_annual_counts tac
    GROUP BY tac.topic_id
),
calculated AS (
    SELECT 
        t.id as topic_id,
        COALESCE(t.label, t.title, 'Topic ' || t.id::text) as topic_name,
        t.color as series_color,
        
        -- Calculate Shares (Percentage of Total Corpus in that period)
        ROUND((ps.p1_count::numeric / NULLIF(ps.p1_corpus, 0)) * 100, 2) as first_decade_share,
        ROUND((ps.p2_count::numeric / NULLIF(ps.p2_corpus, 0)) * 100, 2) as last_decade_share,
        
        -- Delta (Period 2 - Period 1)
        ROUND(
            ((ps.p2_count::numeric / NULLIF(ps.p2_corpus, 0)) * 100) - 
            ((ps.p1_count::numeric / NULLIF(ps.p1_corpus, 0)) * 100)
        , 2) as share_delta_pp
    FROM period_stats ps
    JOIN public.topics t ON ps.topic_id = t.id
    -- Only include if there is data in at least one period to avoid noise
    WHERE (ps.p1_count > 0 OR ps.p2_count > 0)
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
    1980 as start_year,
    2025 as end_year,
    share_delta_pp as share_change_pp,
    first_decade_share,
    last_decade_share,
    series_color
FROM ranked
WHERE rnk <= 50  -- Return top 50 emerging and top 50 declining (though partition rank logic above does top N per group, filtering by rnk <= 50 gives top 50 of each)
ORDER BY direction DESC, ABS(share_change_pp) DESC;

GRANT SELECT ON public.v_topic_trends_10yr_v2 TO anon;
GRANT SELECT ON public.v_topic_trends_10yr_v2 TO authenticated;

NOTIFY pgrst, 'reload schema';
