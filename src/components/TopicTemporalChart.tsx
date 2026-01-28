import { LineChart, Line, XAxis, ResponsiveContainer, Legend } from "recharts";

const COLORS = [
  "hsl(0 0% 20%)",
  "hsl(0 0% 35%)",
  "hsl(0 0% 50%)",
  "hsl(0 0% 65%)",
  "hsl(0 0% 80%)",
];

interface TopicTemporalChartProps {
  data: Array<Record<string, number | null>>;
  bigrams: string[];
}

export function TopicTemporalChart({ data, bigrams }: TopicTemporalChartProps) {
  if (!data || data.length === 0 || !bigrams || bigrams.length === 0) {
    return null;
  }

  return (
    <div className="h-[180px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            domain={[1980, 2025]}
            ticks={[1980, 1990, 2000, 2010, 2020]}
          />
          {bigrams.map((bigram, index) => (
            <Line
              key={bigram}
              type="monotone"
              dataKey={bigram}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={1.5}
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
