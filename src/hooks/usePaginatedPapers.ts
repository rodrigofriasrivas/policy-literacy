import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const PAGE_SIZE = 50;

interface PaginatedResult {
  papers: {
    paper_id: number;
    title: string;
    authors: string | null;
    year: number | null;
    journal: string | null;
    abstract: string | null;
  }[];
  totalCount: number;
  totalPages: number;
}

export function usePaginatedPapersByTopic(topicId?: number, page = 0) {
  return useQuery({
    queryKey: ["paginated-papers", topicId, page],
    queryFn: async (): Promise<PaginatedResult> => {
      // First get distinct paper_ids for this topic
      const { data: links, error: linksError } = await supabase
        .from("topic_paper_links")
        .select("paper_id")
        .eq("topic_id", topicId!);

      if (linksError) throw linksError;

      // Deduplicate paper_ids
      const uniqueIds = [...new Set(links.map((l) => l.paper_id))];
      const totalCount = uniqueIds.length;
      const totalPages = Math.ceil(totalCount / PAGE_SIZE);

      // Sort and paginate the IDs
      uniqueIds.sort((a, b) => a - b);
      const pageIds = uniqueIds.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

      if (pageIds.length === 0) {
        return { papers: [], totalCount, totalPages };
      }

      const { data: papers, error: papersError } = await supabase
        .from("papers")
        .select("paper_id, title, authors, year, journal, abstract")
        .in("paper_id", pageIds)
        .order("year", { ascending: false });

      if (papersError) throw papersError;

      return { papers: papers ?? [], totalCount, totalPages };
    },
    enabled: topicId !== undefined,
  });
}
