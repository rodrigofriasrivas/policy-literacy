import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useTopicWeights() {
  return useQuery({
    queryKey: ["topic-weights"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("topic_weights")
        .select("*")
        .order("topic_id", { ascending: true });

      if (error) throw error;
      return data;
    },
  });
}

export function useTopicWeightsById(topicId?: number) {
  return useQuery({
    queryKey: ["topic-weights", topicId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("topic_weights")
        .select("*")
        .eq("topic_id", topicId!)
        .order("label", { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: topicId !== undefined,
  });
}
