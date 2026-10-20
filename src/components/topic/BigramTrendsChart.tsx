import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { useBigramTrends } from "@/hooks/useBigramTrends";

const COLORS = ["var(--trend-1)", "var(--trend-2)", "var(--trend-3)", "var(--trend-4)", "var(--trend-5)"];

interface BigramTrendsChartProps {
  topicId?: number;
  topicName?: string;
}

export function BigramTrendsChart({ topicId, topicName }: BigramTrendsChartProps) {
  const { data: raw, isLoading } = useBigramTrends(topicId);

  if (isLoading) {
    return (
      <div className="topic-glass-card p-5">
        <Skeleton className="h-5 w-64 bg-muted mb-4" />
        <Skeleton className="h-64 w-full bg-muted" />
      </div>
    );
  }

  if (!raw || raw.length === 0) {
    return (
      <div className="topic-glass-card p-5">
        <h4 className="text-sm font-semibold text-foreground mb-2">
          Bigram trends over time
        </h4>
        <p className="text-xs text-muted-foreground">No trend data available for this topic.</p>
      </div>
    );
  }

  // Get unique bigrams (ranked)
  const bigramSet = new Map<string, number>();
  raw.forEach((r) => {
    if (r.bigram && !bigramSet.has(r.bigram)) {
      bigramSet.set(r.bigram, bigramSet.size);
    }
  });
  const bigrams = [...bigramSet.keys()].slice(0, 5);

  // Pivot data: { year, bigram1: count, bigram2: count, ... }
  const byYear = new Map<number, Record<string, number>>();
  raw.forEach((r) => {
    if (r.year == null || !r.bigram) return;
    if (!byYear.has(r.year)) byYear.set(r.year, { year: r.year });
    const row = byYear.get(r.year);
    if (!row) return;
    row[r.bigram] = r.papers_count ?? 0;
  });

  // Forward-fill: ensure every year 1980-2025 exists
  const chartData: Record<string, number>[] = [];
  const lastValues: Record<string, number> = {};
  bigrams.forEach((b) => (lastValues[b] = 0));

  for (let y = 1980; y <= 2025; y++) {
    const existing = byYear.get(y);
    const row: Record<string, number> = { year: y };
    bigrams.forEach((b) => {
      if (existing && existing[b] != null) {
        lastValues[b] = existing[b];
      }
      row[b] = lastValues[b];
    });
    chartData.push(row);
  }

  return (
    <div className="topic-glass-card p-5">
      <h4 className="text-sm font-semibold text-foreground mb-4">
        Bigram trends over time {topicName ? `(Topic: ${topicName})` : ""}
      </h4>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="var(--topic-grid)" />
          <XAxis
            dataKey="year"
            type="number"
            domain={[1980, 2025]}
            ticks={[1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025]}
            tick={{ fill: "var(--topic-muted)", fontSize: 10 }}
            stroke="var(--topic-axis)"
          />
          <YAxis
            tick={{ fill: "var(--topic-muted)", fontSize: 10 }}
            stroke="var(--topic-axis)"
            label={{
              value: "Papers per year",
              angle: -90,
              position: "insideLeft",
              style: { fill: "var(--topic-muted)", fontSize: 10 },
            }}
          />
          <Tooltip
            contentStyle={{
              background: "var(--topic-tooltip)",
              border: "1px solid var(--topic-axis)",
              borderRadius: 8,
              fontSize: 11,
              color: "var(--topic-ink)",
            }}
            formatter={(value: number, name: string) => [
              value,
              name.replace(/_/g, " "),
            ]}
          />
          <Legend
            formatter={(value: string) => (
              <span style={{ color: "var(--topic-muted)", fontSize: 11 }}>
                {value.replace(/_/g, " ")}
              </span>
            )}
          />
          {bigrams.map((b, i) => (
            <Line
              key={b}
              dataKey={b}
              stroke={COLORS[i % COLORS.length]}
              strokeWidth={1.5}
              dot={false}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
