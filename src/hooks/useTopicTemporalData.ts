import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useTopicTemporalData(topicId?: number) {
  return useQuery({
    queryKey: ["topic-temporal-data", topicId],
    queryFn: async () => {
      // Fetch bigram-paper-year associations
      const { data, error } = await supabase
        .from("topic_paper_links")
        .select("paper_id, bigram, papers!inner(year)")
        .eq("topic_id", topicId!)
        .not("bigram", "is", null);

      if (error) throw error;

      // 1. Count papers per bigram per year
      const bigramYearCounts = new Map<string, Map<number, Set<number>>>();

      data.forEach((link) => {
        const bigram = link.bigram;
        const year = link.papers?.year;
        if (!bigram || !year) return;

        if (!bigramYearCounts.has(bigram)) {
          bigramYearCounts.set(bigram, new Map());
        }
        const yearMap = bigramYearCounts.get(bigram)!;
        if (!yearMap.has(year)) {
          yearMap.set(year, new Set());
        }
        yearMap.get(year)!.add(link.paper_id);
      });

      // 2. Get all unique bigrams
      const bigrams = Array.from(bigramYearCounts.keys()).sort();

      // 3. Build chart data with fixed x-axis 1980-2025
      const years = Array.from({ length: 46 }, (_, i) => 1980 + i);

      const chartData = years.map((year) => {
        const row: Record<string, number | null> = { year };

        bigrams.forEach((bigram) => {
          const yearMap = bigramYearCounts.get(bigram);
          const count = yearMap?.get(year)?.size ?? null;
          row[bigram] = count;
        });

        return row;
      });

      // 4. Forward-fill: carry last value forward for each bigram
      bigrams.forEach((bigram) => {
        let lastValue: number | null = null;
        let hasStarted = false;

        chartData.forEach((row) => {
          if (row[bigram] !== null) {
            lastValue = row[bigram] as number;
            hasStarted = true;
          } else if (hasStarted && lastValue !== null) {
            row[bigram] = lastValue;
          }
        });
      });

      return { chartData, bigrams };
    },
    enabled: topicId !== undefined,
  });
}
