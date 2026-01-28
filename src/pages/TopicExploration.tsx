import { useParams, Link } from "react-router-dom";
import { useTopic, useTopBigramsByTopic, useTopicsRanked } from "@/hooks/useTopics";
import { usePapersByTopicId } from "@/hooks/usePapers";
import { useTopicWeightsById } from "@/hooks/useTopicWeights";
import { useTopicTemporalData } from "@/hooks/useTopicTemporalData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { formatTopicName } from "@/lib/utils";
import { TopicTemporalChart } from "@/components/TopicTemporalChart";
export default function TopicExploration() {
  const { topicId } = useParams<{ topicId: string }>();
  const numericTopicId = topicId ? parseInt(topicId, 10) : undefined;

  const { data: allTopics, isLoading: allTopicsLoading } = useTopicsRanked();
  const { data: topic, isLoading: topicLoading } = useTopic(numericTopicId);
  const { data: bigrams, isLoading: bigramsLoading } = useTopBigramsByTopic(numericTopicId);
  const { data: papers, isLoading: papersLoading } = usePapersByTopicId(numericTopicId);
  const { data: weights, isLoading: weightsLoading } = useTopicWeightsById(numericTopicId);
  const { data: temporalData, isLoading: temporalLoading } = useTopicTemporalData(numericTopicId);

  // If no topic selected, show topic selector
  if (!topicId) {
    return (
      <div className="space-y-8">
        <header className="space-y-2">
          <h2 className="text-2xl font-normal text-foreground">Topic Exploration</h2>
          <p className="text-muted-foreground max-w-2xl">
            Select a topic to examine its key bigrams, linked papers, and temporal trajectory.
          </p>
        </header>

        {allTopicsLoading ? (
          <div className="space-y-2">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="h-12" />
            ))}
          </div>
        ) : allTopics && allTopics.length > 0 ? (
          <div className="grid gap-2">
            {[...allTopics].sort((a, b) => (a.topic_id ?? 0) - (b.topic_id ?? 0)).map((t) => (
              <Link
                key={t.topic_id}
                to={`/topic/${t.topic_id}`}
                className="block p-3 border border-border rounded hover:bg-secondary/50 transition-colors"
              >
                <p className="font-medium text-foreground">{formatTopicName(t.topic_id, t.topic_name)}</p>
                {t.topic_label && (
                  <p className="text-sm text-muted-foreground">{t.topic_label}</p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No topics available.</p>
        )}
      </div>
    );
  }

  const isLoading = topicLoading || bigramsLoading || papersLoading || weightsLoading;

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        to="/topic"
        className="inline-block text-sm text-muted-foreground hover:text-foreground"
      >
        ← All topics
      </Link>

      {/* Topic header */}
      <header className="space-y-2">
        {topicLoading ? (
          <Skeleton className="h-8 w-64" />
        ) : topic ? (
          <>
            <h2 className="text-2xl font-normal text-foreground">{formatTopicName(numericTopicId, topic.topic_name)}</h2>
            {topic.definition && (
              <p className="text-muted-foreground max-w-2xl">{topic.definition}</p>
            )}
          </>
        ) : (
          <p className="text-muted-foreground">Topic not found.</p>
        )}
      </header>

      {/* Temporal evolution chart */}
      <section className="space-y-2">
        {temporalLoading ? (
          <Skeleton className="h-[120px]" />
        ) : temporalData && temporalData.length > 0 ? (
          <>
            <TopicTemporalChart data={temporalData} />
            <p className="text-xs text-muted-foreground">
              This timeline shows how this topic has evolved within the research corpus over time.
            </p>
          </>
        ) : null}
      </section>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Key bigrams */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base font-normal">Key Bigrams</CardTitle>
            </CardHeader>
            <CardContent>
              {bigrams && bigrams.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {bigrams.slice(0, 20).map((b, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="font-normal text-xs"
                    >
                      {b.bigram}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No bigrams available.</p>
              )}
            </CardContent>
          </Card>

          {/* Temporal trajectory */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base font-normal">Temporal Trajectory</CardTitle>
            </CardHeader>
            <CardContent>
              {weights && weights.length > 0 ? (
                <div className="space-y-2">
                  {weights.map((w) => (
                    <div key={w.id} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-16">
                        {w.label}
                      </span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-foreground/40 rounded-full"
                          style={{
                            width: `${Math.min(100, (Number(w.topic_weight) || 0) * 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-12 text-right">
                        {Number(w.topic_weight)?.toFixed(3) ?? "—"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No temporal data available.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Linked papers */}
      <section className="space-y-4">
        <h3 className="text-lg font-normal text-foreground">Linked Papers</h3>
        <p className="text-sm text-muted-foreground">
          Papers associated with this topic through textual linkage.
        </p>

        {papersLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        ) : papers && papers.length > 0 ? (
          <div className="space-y-2">
            {papers.slice(0, 20).map((link) => {
              const paper = link.papers;
              return (
                <Link
                  key={link.paper_id}
                  to={`/papers/${link.paper_id}`}
                  className="block p-3 border border-border rounded hover:bg-secondary/50 transition-colors"
                >
                  <p className="text-sm font-medium text-foreground">{paper.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {paper.authors && `${paper.authors} · `}
                    {paper.year && `${paper.year} · `}
                    {paper.journal}
                  </p>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No linked papers found.</p>
        )}

        {papers && papers.length > 20 && (
          <p className="text-xs text-muted-foreground">
            Showing 20 of {papers.length} linked papers.
          </p>
        )}
      </section>
    </div>
  );
}
