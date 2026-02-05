import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { usePapers, usePaper } from "@/hooks/usePapers";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { formatTopicName } from "@/lib/utils";

export default function PaperListing() {
  const { paperId } = useParams<{ paperId: string }>();
  const numericPaperId = paperId ? parseInt(paperId, 10) : undefined;

  // If viewing a specific paper
  if (numericPaperId) {
    return <PaperDetail paperId={numericPaperId} />;
  }

  // Otherwise show paper list
  return <PaperList />;
}

function PaperList() {
  const { data: papers, isLoading: papersLoading } = usePapers(200);

  // Fetch topic-paper associations
  const { data: topicLinks } = useQuery({
    queryKey: ["paper-topic-associations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("topic_paper_links")
        .select("paper_id, topic_id, topics!inner(topic_id, topic_name)");
      if (error) throw error;
      return data;
    },
  });

  // Deduplicate and group topics by paper_id
  const topicsByPaper = useMemo(() => {
    if (!topicLinks) return new Map<number, Array<{ topic_id: number; topic_name: string }>>();
    const map = new Map<number, Array<{ topic_id: number; topic_name: string }>>();

    topicLinks.forEach((link) => {
      const paperId = link.paper_id;
      const topic = { topic_id: link.topics.topic_id, topic_name: link.topics.topic_name };

      if (!map.has(paperId)) {
        map.set(paperId, []);
      }
      // Deduplicate by checking if topic_id already exists
      const existing = map.get(paperId)!;
      if (!existing.some((t) => t.topic_id === topic.topic_id)) {
        existing.push(topic);
      }
    });

    // Sort topics by topic_id within each paper
    map.forEach((topics) => topics.sort((a, b) => a.topic_id - b.topic_id));

    return map;
  }, [topicLinks]);

  // Sort papers: year (desc), then title (A-Z)
  const sortedPapers = useMemo(() => {
    if (!papers) return [];
    return [...papers]
      .filter((p) => p.id !== null)
      .sort((a, b) => {
        // Primary: year descending
        const yearDiff = (b.year ?? 0) - (a.year ?? 0);
        if (yearDiff !== 0) return yearDiff;
        // Secondary: title ascending
        return (a.title ?? "").localeCompare(b.title ?? "");
      });
  }, [papers]);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-2xl font-normal text-foreground">Papers</h2>
        <p className="text-muted-foreground max-w-2xl">
          The scholarly corpus underlying this research artefact.
          Papers are ordered by year (most recent first), then by title.
        </p>
      </header>

      {papersLoading ? (
        <div className="space-y-2">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      ) : sortedPapers && sortedPapers.length > 0 ? (
        <div className="space-y-2">
          {sortedPapers.map((paper) => {
            const paperId = paper.id!;
            const paperTopics = topicsByPaper.get(paperId);
            return (
              <Link
                key={paperId}
                to={`/papers/${paperId}`}
                className="block p-4 border border-border rounded hover:bg-secondary/50 transition-colors"
              >
                <p className="text-sm font-medium text-foreground">{paper.title}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {paper.authors && `${paper.authors} · `}
                  {paper.year && `${paper.year} · `}
                  {paper.journal}
                </p>
                {paperTopics && paperTopics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {paperTopics.map((topic) => (
                      <Badge key={topic.topic_id} variant="outline" className="text-xs">
                        {formatTopicName(topic.topic_id, topic.topic_name)}
                      </Badge>
                    ))}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No papers found.</p>
      )}
    </div>
  );
}

function PaperDetail({ paperId }: { paperId: number }) {
  const { data: paper, isLoading } = usePaper(paperId);

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        to="/papers"
        className="inline-block text-sm text-muted-foreground hover:text-foreground"
      >
        ← All papers
      </Link>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-32" />
        </div>
      ) : paper ? (
        <article className="space-y-6">
          <header className="space-y-2">
            <h2 className="text-2xl font-normal text-foreground leading-tight">
              {paper.title}
            </h2>
            <p className="text-muted-foreground">
              {paper.authors}
            </p>
            <p className="text-sm text-muted-foreground">
              {paper.journal && `${paper.journal} · `}
              {paper.year}
            </p>
          </header>

          {paper.abstract && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base font-normal">Abstract</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground leading-relaxed">
                  {paper.abstract}
                </p>
              </CardContent>
            </Card>
          )}
        </article>
      ) : (
        <p className="text-muted-foreground">Paper not found.</p>
      )}
    </div>
  );
}
