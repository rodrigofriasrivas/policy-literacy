import { useEffect, useState, useRef, useMemo } from "react";
import { ModuleShell } from "@/components/intro/ModuleShell";

interface PaperByYear {
  year: number;
  count: number;
}

// Derive papers-by-year directly from the static papers.json
async function fetchPapersByYear(): Promise<PaperByYear[]> {
  const res = await fetch("/artefact/data/papers.json");
  const papers: { year: number }[] = await res.json();
  const counts: Record<number, number> = {};
  for (const p of papers) {
    if (p.year) counts[p.year] = (counts[p.year] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([year, count]) => ({ year: Number(year), count }))
    .sort((a, b) => a.year - b.year);
}

// Period annotations with key terms and reference anchors — Fix 3b, 3c
const PERIOD_ANNOTATIONS = [
  {
    startYear: 1979,
    endYear: 1991,
    label: "Early anchors",
    note: "Bolton Report, Birch's job-creation thesis, enterprise culture. Research is sparse but formative.",
    terms: ["small firms", "job creation", "enterprise culture", "self-employment"],
    ref: "Birch (1979), Gartner (1988)",
  },
  {
    startYear: 1992,
    endYear: 2004,
    label: "Field formation",
    note: "Entrepreneurship research moves beyond the individual entrepreneur. Institutions, context, and systems enter the frame. Policy research diversifies.",
    terms: ["opportunity discovery", "institutional context", "SME policy", "innovation systems"],
    ref: "Shane & Venkataraman (2000), Davidsson (1991)",
  },
  {
    startYear: 2005,
    endYear: 2015,
    label: "Rapid expansion",
    note: "Innovation, ecosystems, finance, education, and inclusion open distinct research strands. Volume accelerates.",
    terms: ["entrepreneurial ecosystems", "venture capital", "gender", "social entrepreneurship"],
    ref: "Welter (2011), Carlsson et al. (2013)",
  },
  {
    startYear: 2016,
    endYear: 2025,
    label: "Thematic fragmentation",   // Fix 3b
    note: "Digital transformation, sustainability, and inclusive entrepreneurship emerge as major conversations. The field now spans more strands than any single review can cover.",
    terms: ["digital platforms", "green transition", "inclusive entrepreneurship", "policy evaluation"],
    ref: "Terjesen, Hessels & Li (2016)",
  },
];

export default function IntroModule2() {
  const [data, setData] = useState<PaperByYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePeriod, setActivePeriod] = useState<number | null>(null);
  const [animatedBars, setAnimatedBars] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<{ year: number; count: number } | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPapersByYear().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!loading && data.length > 0) {
      const t = setTimeout(() => setAnimatedBars(true), 150);
      return () => clearTimeout(t);
    }
  }, [loading, data]);

  const maxCount = data.length ? Math.max(...data.map((d) => d.count)) : 1;
  const firstYear = data[0]?.year ?? 1979;
  const lastYear = data[data.length - 1]?.year ?? 2025;

  function getPeriodForYear(year: number) {
    return PERIOD_ANNOTATIONS.findIndex(
      (p) => year >= p.startYear && year <= p.endYear
    );
  }

  return (
    <ModuleShell
      step={2}
      prevPath="/"
      nextPath="/intro/3"
      nextLabel="See the structure of the field"
    >
      <div className="m2-page">
        {/* Headline — Fix 3a */}
        <div className="m2-header">
          <p className="m2-eyebrow">Step 2 of 3 — The field in time</p>
          <h1 className="m2-title">
            A field built over four decades
          </h1>
          <p className="m2-subtitle">
            A sample of 5,800 academic papers, drawn from journals spanning entrepreneurship,
            public policy, innovation, and business finance, published between {firstYear} and {lastYear}.
            Each added to a landscape that grew faster than any single review could track.
          </p>
        </div>

        {/* Chart area */}
        <div className="m2-chart-outer" ref={chartRef}>
          {loading ? (
            <div className="m2-loading">Loading corpus data…</div>
          ) : (
            <>
              {/* Period bands (background) */}
              <div className="m2-period-bands">
                {PERIOD_ANNOTATIONS.map((period, i) => {
                  const totalYears = lastYear - firstYear + 1;
                  const left =
                    ((period.startYear - firstYear) / totalYears) * 100;
                  const width =
                    ((period.endYear - period.startYear + 1) / totalYears) * 100;
                  return (
                    <div
                      key={i}
                      className={`m2-period-band ${i % 2 === 0 ? "m2-period-band--even" : ""} ${activePeriod === i ? "is-active" : ""}`}
                      style={{ left: `${left}%`, width: `${width}%` }}
                      onMouseEnter={() => setActivePeriod(i)}
                      onMouseLeave={() => setActivePeriod(null)}
                    >
                      <span className="m2-period-label">{period.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Bars — Fix 3e: tooltip on hover */}
              <div className="m2-bars">
                {data.map((d) => {
                  const periodIdx = getPeriodForYear(d.year);
                  const heightPct = (d.count / maxCount) * 100;
                  const isHovered = hoveredBar?.year === d.year;
                  return (
                    <div
                      key={d.year}
                      className={`m2-bar-wrap ${activePeriod !== null && activePeriod !== periodIdx ? "m2-bar-wrap--muted" : ""}`}
                      onMouseEnter={() => {
                        setActivePeriod(periodIdx);
                        setHoveredBar({ year: d.year, count: d.count });
                      }}
                      onMouseLeave={() => {
                        setActivePeriod(null);
                        setHoveredBar(null);
                      }}
                    >
                      <div
                        className={`m2-bar m2-bar--p${periodIdx}`}
                        style={{
                          height: animatedBars ? `${heightPct}%` : "0%",
                        }}
                      />
                      {/* Tooltip — Fix 3e */}
                      {isHovered && (
                        <div className="m2-bar-tooltip">
                          {d.year} — {d.count} papers
                        </div>
                      )}
                      {/* Year label — every 5 years */}
                      {d.year % 5 === 0 && (
                        <span className="m2-year-tick">{d.year}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Y-axis label — Fix 3d */}
              <div className="m2-yaxis-label">Papers published per year</div>
            </>
          )}
        </div>

        {/* Period annotation cards — Fix 3c: key terms + ref anchors */}
        <div className="m2-periods-grid">
          {PERIOD_ANNOTATIONS.map((period, i) => (
            <div
              key={i}
              className={`m2-period-card m2-period-card--p${i} ${activePeriod === i ? "is-active" : ""}`}
              onMouseEnter={() => setActivePeriod(i)}
              onMouseLeave={() => setActivePeriod(null)}
            >
              <span className="m2-period-card-years">
                {period.startYear}–{period.endYear}
              </span>
              <h3 className="m2-period-card-title">{period.label}</h3>
              <p className="m2-period-card-note">{period.note}</p>
              <div className="m2-period-card-terms">
                {period.terms.map((term) => (
                  <span key={term} className="m2-period-card-term">{term}</span>
                ))}
              </div>
              <span className="m2-period-card-ref">{period.ref}</span>
            </div>
          ))}
        </div>

        {/* Interpretive note */}
        <div className="m2-interpretive-note">
          <p>
            This timeline shows publication volume in the sample across time.
            Frequency reflects the corpus, not the significance of any period or conversation.
          </p>
          <p>
            The scale of the field is the context for what comes next:
            25 distinct research conversations that have developed in parallel across these decades.
          </p>
        </div>
      </div>
    </ModuleShell>
  );
}
