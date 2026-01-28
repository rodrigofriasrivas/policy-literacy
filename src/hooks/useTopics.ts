import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useTopicsRanked() {
  return useQuery({
    queryKey: ["topics-ranked"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("v_topics_ranked")
        .select("*")
        .order("topic_weight", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function usePapersByTopic() {
  return useQuery({
    queryKey: ["papers-by-topic"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("v_papers_by_topic")
        .select("*")
        .order("paper_count", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useTopBigramsByTopic(topicId?: number) {
  return useQuery({
    queryKey: ["top-bigrams", topicId],
    queryFn: async () => {
      let query = supabase
        .from("v_top_bigrams_by_topic")
        .select("*")
        .order("rank", { ascending: true });

      if (topicId) {
        query = query.eq("topic_id", topicId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: topicId !== undefined,
  });
}

export function useTopic(topicId?: number) {
  return useQuery({
    queryKey: ["topic", topicId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("topics")
        .select("*")
        .eq("topic_id", topicId!)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: topicId !== undefined,
  });
}
