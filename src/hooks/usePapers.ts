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

interface PaperLink {
  paper_id: number;
  topic_id: number;
  frequency: number | null;
  pmi: number | null;
  papers: {
    paper_id: number;
    title: string;
    authors: string | null;
    year: number | null;
    journal: string | null;
  };
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
        .from("topic_paper_links")
        .select(`
          paper_id,
          topic_id,
          frequency,
          pmi,
          papers!inner(
            paper_id,
            title,
            authors,
            year,
            journal
          )
        `)
        .eq("topic_id", topicId!)
        .order("frequency", { ascending: false });

      if (error) throw error;
      
      // Deduplicate by paper_id (a paper may appear multiple times via different bigrams)
      const uniqueLinks = new Map<number, PaperLink>();
      (data as unknown as PaperLink[]).forEach((link) => {
        if (!uniqueLinks.has(link.paper_id)) {
          uniqueLinks.set(link.paper_id, link);
        }
      });
      
      return Array.from(uniqueLinks.values());
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
