import { useMemo } from "react";
import { useTopicWeights } from "@/hooks/useTopicWeights";
import { useTopicsRanked } from "@/hooks/useTopics";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { formatTopicName } from "@/lib/utils";

export default function TemporalEvolution() {
  const { data: weights, isLoading: weightsLoading } = useTopicWeights();
  const { data: topics, isLoading: topicsLoading } = useTopicsRanked();

  const isLoading = weightsLoading || topicsLoading;

  // Group weights by topic
  const topicWeightsByTopic = useMemo(() => {
    if (!weights || !topics) return [];

    const grouped = new Map<number, { topic: typeof topics[0]; weights: typeof weights }>();

    topics.forEach((topic) => {
      const topicWeights = weights.filter((w) => w.topic_id === topic.topic_id);
      if (topicWeights.length > 0) {
        grouped.set(topic.topic_id!, { topic, weights: topicWeights });
      }
    });

    return Array.from(grouped.values());
  }, [weights, topics]);

  // Get unique years/labels
  const uniqueLabels = useMemo(() => {
    if (!weights) return [];
    const labels = [...new Set(weights.map((w) => w.label).filter(Boolean))];
    return labels.sort();
  }, [weights]);

  // Find max weight for normalization
  const maxWeight = useMemo(() => {
    if (!weights) return 1;
    return Math.max(...weights.map((w) => Number(w.topic_weight) || 0), 0.001);
  }, [weights]);

  return (
    <div className="space-y-8">
      {/* Page header */}
      <header className="space-y-2">
        <h2 className="text-2xl font-normal text-foreground">Temporal Evolution</h2>
        <p className="text-muted-foreground max-w-2xl">
          How topics emerge, persist, or decline across the temporal span of the corpus.
          Each row represents a topic; columns represent time periods.
        </p>
      </header>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-10" />
          ))}
        </div>
      ) : topicWeightsByTopic.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-4 font-normal text-muted-foreground w-48">
                  Topic
                </th>
                {uniqueLabels.map((label) => (
                  <th
                    key={label}
                    className="text-center px-1 py-2 font-normal text-muted-foreground text-xs"
                    style={{ minWidth: "2.5rem" }}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topicWeightsByTopic.map(({ topic, weights: topicWeights }) => (
                <tr key={topic.topic_id} className="border-b border-border/50 hover:bg-secondary/30">
                  <td className="py-2 pr-4">
                    <Link
                      to={`/evidence/topic/${topic.topic_id}`}
                      className="text-foreground hover:underline"
                    >
                      {formatTopicName(topic.topic_id, topic.topic_name)}
                    </Link>
                  </td>
                  {uniqueLabels.map((label) => {
                    const weight = topicWeights.find((w) => w.label === label);
                    const normalizedWeight = weight
                      ? (Number(weight.topic_weight) || 0) / maxWeight
                      : 0;

                    return (
                      <td key={label} className="px-1 py-2">
                        <div
                          className="mx-auto rounded-sm bg-foreground/20"
                          style={{
                            width: "1.5rem",
                            height: "1.5rem",
                            opacity: Math.max(0.1, normalizedWeight),
                            backgroundColor: `hsl(0 0% ${20 + (1 - normalizedWeight) * 60}%)`,
                          }}
                          title={`${formatTopicName(topic.topic_id, topic.topic_name)}: ${weight?.topic_weight ?? 0}`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No temporal data available.</p>
      )}

      <footer className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Cell darkness indicates relative topic weight within the period.
          This visualization shows presence, not causality or impact.
        </p>
      </footer>
    </div>
  );
}
