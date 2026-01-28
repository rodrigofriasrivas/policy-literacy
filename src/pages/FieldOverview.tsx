import { Link } from "react-router-dom";
import { useTopicsRanked, usePapersByTopic } from "@/hooks/useTopics";
import { useCoverageSummary } from "@/hooks/useCoverageSummary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatTopicName } from "@/lib/utils";

export default function FieldOverview() {
  const { data: topics, isLoading: topicsLoading } = useTopicsRanked();
  const { data: papersByTopic, isLoading: papersLoading } = usePapersByTopic();
  const { data: coverage, isLoading: coverageLoading } = useCoverageSummary();

  const isLoading = topicsLoading || papersLoading || coverageLoading;

  return (
    <div className="space-y-8">
      {/* Page header */}
      <header className="space-y-2">
        <h2 className="text-2xl font-normal text-foreground">Field Overview</h2>
        <p className="text-muted-foreground max-w-2xl">
          An orientation to the structure of entrepreneurship policy research. 
          Topics are derived from textual analysis of the scholarly corpus.
        </p>
      </header>

      {/* Coverage statistics */}
      <section className="space-y-4">
        <h3 className="text-lg font-normal text-foreground">Corpus Coverage</h3>
        {coverageLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        ) : coverage ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CoverageCard label="Topics" value={coverage.topics_count} />
            <CoverageCard label="Papers" value={coverage.papers_total} />
            <CoverageCard label="Papers Linked" value={coverage.unique_papers_connected} />
            <CoverageCard label="Bigrams" value={coverage.bigrams_unique} />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No coverage data available.</p>
        )}
      </section>

      {/* Topic distribution */}
      <section className="space-y-4">
        <h3 className="text-lg font-normal text-foreground">Topic Distribution</h3>
        <p className="text-sm text-muted-foreground">
          Topics ordered by cumulative weight across the corpus. Select a topic to explore its structure.
        </p>

        {isLoading ? (
          <div className="space-y-2">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="h-12" />
            ))}
          </div>
        ) : topics && topics.length > 0 ? (
          <div className="space-y-1">
            {[...topics].sort((a, b) => (a.topic_id ?? 0) - (b.topic_id ?? 0)).map((topic) => {
              const paperCount = papersByTopic?.find(
                (p) => p.topic_id === topic.topic_id
              )?.paper_count;

              return (
                <Link
                  key={topic.topic_id}
                  to={`/topic/${topic.topic_id}`}
                  className="block group"
                >
                  <div className="flex items-center gap-4 p-3 rounded border border-transparent hover:border-border hover:bg-secondary/50 transition-colors">
                    {/* Weight bar */}
                    <div className="w-24 flex-shrink-0">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-foreground/40 rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              (Number(topic.topic_weight) || 0) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Topic info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:underline">
                        {formatTopicName(topic.topic_id, topic.topic_name)}
                      </p>
                      {topic.topic_label && (
                        <p className="text-xs text-muted-foreground truncate">
                          {topic.topic_label}
                        </p>
                      )}
                    </div>

                    {/* Paper count */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-muted-foreground">
                        {paperCount ?? "—"} papers
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No topics found.</p>
        )}
      </section>
    </div>
  );
}

function CoverageCard({ label, value }: { label: string; value?: number | null }) {
  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-normal text-muted-foreground uppercase tracking-wide">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-light text-foreground">
          {value?.toLocaleString() ?? "—"}
        </p>
      </CardContent>
    </Card>
  );
}
