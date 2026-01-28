import { AreaChart, Area, XAxis, ResponsiveContainer } from "recharts";

interface TopicTemporalChartProps {
  data: Array<{ year: number; count: number }>;
}

export function TopicTemporalChart({ data }: TopicTemporalChartProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="h-[120px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
            interval="preserveStartEnd"
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="hsl(0 0% 50%)"
            fill="hsl(0 0% 50% / 0.2)"
            strokeWidth={1.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
