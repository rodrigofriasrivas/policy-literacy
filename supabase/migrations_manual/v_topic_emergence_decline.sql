-- View: v_topic_emergence_decline
-- Description: Comparison of topic share in the most recent 10 years (2015-2024) vs previous 10 years (2005-2014)

CREATE OR REPLACE VIEW public.v_topic_emergence_decline AS
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
        
        -- Period 1: Previous Decade (2005-2014) Sums
        SUM(CASE WHEN tac.year BETWEEN 2005 AND 2014 THEN tac.papers_in_topic ELSE 0 END) as p1_count,
        (SELECT SUM(year_total) FROM base_counts WHERE year BETWEEN 2005 AND 2014) as p1_corpus,
        
        -- Period 2: Last Decade (2015-2024) Sums
        SUM(CASE WHEN tac.year BETWEEN 2015 AND 2024 THEN tac.papers_in_topic ELSE 0 END) as p2_count,
        (SELECT SUM(year_total) FROM base_counts WHERE year BETWEEN 2015 AND 2024) as p2_corpus
        
    FROM topic_annual_counts tac
    GROUP BY tac.topic_id
)
SELECT 
    t.id as topic_id,
    COALESCE(t.label, t.title, 'Topic ' || t.id::text) as topic_name,
    t.color as topic_color,
    
    -- Shares (%) in Period 1
    ROUND(
        (ps.p1_count::numeric / NULLIF(ps.p1_corpus, 0)) * 100, 
        2
    ) as prev_10y_share_pct,
    
    -- Shares (%) in Period 2
    ROUND(
        (ps.p2_count::numeric / NULLIF(ps.p2_corpus, 0)) * 100, 
        2
    ) as last_10y_share_pct,
    
    -- Share Delta (pp)
    ROUND(
        ((ps.p2_count::numeric / NULLIF(ps.p2_corpus, 0)) * 100) - 
        ((ps.p1_count::numeric / NULLIF(ps.p1_corpus, 0)) * 100), 
        2
    ) as share_delta_pp,
    
    -- Trend Direction
    CASE 
        WHEN ((ps.p2_count::numeric / NULLIF(ps.p2_corpus, 0)) - (ps.p1_count::numeric / NULLIF(ps.p1_corpus, 0))) > 0 THEN 'Rising'
        ELSE 'Declining'
    END as trend_direction

FROM period_stats ps
JOIN public.topics t ON ps.topic_id = t.id
WHERE 
    ps.p1_corpus > 0 AND ps.p2_corpus > 0 -- Ensure data exists for both periods to calculate delta
ORDER BY share_delta_pp DESC;
