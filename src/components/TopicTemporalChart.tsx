import { LineChart, Line, XAxis, ResponsiveContainer, Legend, Tooltip, CartesianGrid } from "recharts";

const COLORS = [
  "hsl(0 0% 15%)",   // darkest
  "hsl(0 0% 30%)",
  "hsl(0 0% 45%)",
  "hsl(0 0% 55%)",
  "hsl(0 0% 65%)",   // lightest (still readable)
];

interface TopicTemporalChartProps {
  data: Array<Record<string, number | null>>;
  bigrams: string[];
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-background border border-border rounded px-3 py-2 shadow-sm">
      <p className="text-xs font-medium text-foreground mb-1">{label}</p>
      {payload.map((entry: any, index: number) => (
        <p key={index} className="text-xs text-muted-foreground">
          <span style={{ color: entry.stroke }}>●</span>{" "}
          {entry.dataKey.replace(/_/g, " ")}: {entry.value ?? "—"}
        </p>
      ))}
    </div>
  );
};

export function TopicTemporalChart({ data, bigrams }: TopicTemporalChartProps) {
  if (!data || data.length === 0 || !bigrams || bigrams.length === 0) {
    return null;
  }

  return (
    <div className="h-[180px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 5 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(var(--border))" 
            strokeOpacity={0.5}
            vertical={false}
          />
          <XAxis
            type="number"
            dataKey="year"
            domain={[1980, 2025]}
            allowDataOverflow={true}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            ticks={[1980, 1990, 2000, 2010, 2020, 2025]}
          />
          <Tooltip content={<CustomTooltip />} />
          {bigrams.map((bigram, index) => (
            <Line
              key={bigram}
              type="monotone"
              dataKey={bigram}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={2.5}
              dot={false}
              connectNulls={false}
            />
          ))}
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="line"
            formatter={(value) => (
              <span style={{ fontSize: 10, color: "hsl(var(--muted-foreground))" }}>
                {value.replace(/_/g, " ")}
              </span>
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
