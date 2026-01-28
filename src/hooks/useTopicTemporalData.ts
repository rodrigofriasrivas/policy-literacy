import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useTopicTemporalData(topicId?: number) {
  return useQuery({
    queryKey: ["topic-temporal-data", topicId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("topic_paper_links")
        .select("paper_id, papers!inner(year)")
        .eq("topic_id", topicId!);

      if (error) throw error;

      // Deduplicate and count papers per year
      const yearCounts = new Map<number, Set<number>>();
      data.forEach((link) => {
        const year = link.papers?.year;
        if (year) {
          if (!yearCounts.has(year)) yearCounts.set(year, new Set());
          yearCounts.get(year)!.add(link.paper_id);
        }
      });

      return Array.from(yearCounts.entries())
        .map(([year, papers]) => ({ year, count: papers.size }))
        .sort((a, b) => a.year - b.year);
    },
    enabled: topicId !== undefined,
  });
}
