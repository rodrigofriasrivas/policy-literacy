-- Step 1: Create the view ensuring 1980-2025 range with zeros for missing years
CREATE OR REPLACE VIEW public.v_chart1_corpus_growth AS
WITH years AS (
  SELECT generate_series(1980, 2025) AS year
),
counts AS (
  SELECT
    year::int as year,
    COUNT(*)::int AS papers_count
  FROM public.papers
  WHERE year BETWEEN 1980 AND 2025
  GROUP BY 1
)
SELECT
  y.year,
  COALESCE(c.papers_count, 0) AS papers_count
FROM years y
LEFT JOIN counts c USING (year)
ORDER BY y.year ASC;

-- Step 2: Grant permissions
GRANT SELECT ON public.v_chart1_corpus_growth TO anon;
GRANT SELECT ON public.v_chart1_corpus_growth TO authenticated;

-- Step 3: Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
