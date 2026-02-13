import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useBigramTrends(topicId?: number) {
  return useQuery({
    queryKey: ["bigram-trends", topicId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("v_chart5_bigram_trends")
        .select("*")
        .eq("topic_id", topicId!)
        .order("year", { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: topicId !== undefined,
  });
}
