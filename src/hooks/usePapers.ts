import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function usePapers(limit = 100) {
  return useQuery({
    queryKey: ["papers", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("papers")
        .select("*")
        .order("year", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    },
  });
}

export function usePapersByTopicId(topicId?: number) {
  return useQuery({
    queryKey: ["papers-by-topic-id", topicId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("topic_paper_links")
        .select(`
          paper_id,
          frequency,
          pmi,
          bigram,
          papers!inner (
            paper_id,
            title,
            authors,
            year,
            journal,
            abstract
          )
        `)
        .eq("topic_id", topicId!)
        .order("frequency", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: topicId !== undefined,
  });
}

export function usePaper(paperId?: number) {
  return useQuery({
    queryKey: ["paper", paperId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("papers")
        .select("*")
        .eq("paper_id", paperId!)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: paperId !== undefined,
  });
}
