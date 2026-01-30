import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Paper {
  id: number | null;
  title: string | null;
  authors: string | null;
  year: number | null;
  journal: string | null;
  abstract: string | null;
}

interface PaperByTopic extends Paper {
  topic_id: number;
  frequency: number | null;
  pmi: number | null;
}

export function usePapers(limit = 100) {
  return useQuery({
    queryKey: ["papers", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("v_papers_unique")
        .select("*")
        .order("year", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as Paper[];
    },
  });
}

export function usePapersByTopicId(topicId?: number) {
  return useQuery({
    queryKey: ["papers-by-topic-id", topicId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("v_papers_by_topic")
        .select(
          `
          id,
          title,
          authors,
          year,
          journal,
          abstract,
          topic_id,
          frequency,
          pmi
        `,
        )
        .eq("topic_id", topicId!)
        .order("frequency", { ascending: false });

      if (error) throw error;
      return data as PaperByTopic[];
    },
    enabled: topicId !== undefined,
  });
}

export function usePaper(paperId?: number) {
  return useQuery({
    queryKey: ["paper", paperId],
    queryFn: async () => {
      const { data, error } = await supabase.from("v_papers_unique").select("*").eq("id", paperId!).maybeSingle();

      if (error) throw error;
      return data as Paper;
    },
    enabled: paperId !== undefined,
  });
}
