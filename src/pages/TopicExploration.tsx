import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTopic, useTopBigramsByTopic, useTopicsRanked } from "@/hooks/useTopics";
import {
  TopicSidebar,
  NetworkEmbed,
  TopicInfoCard,
  BigramCards,
  BigramTrendsChart,
  PapersTable,
  TopicNavigation,
} from "@/components/topic";

/**
 * Topic UI is React; network is embedded artefact.
 * This page lives at /evidence/topic/:topicId — do NOT edit /artefact/index.html for UI changes.
 * The D3 network visualization is loaded via <iframe> in embed mode (see NetworkEmbed component).
 */
export default function TopicExploration() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const numericTopicId = topicId ? parseInt(topicId, 10) : undefined;

  const { data: allTopics, isLoading: allTopicsLoading } = useTopicsRanked();
  const { data: topic, isLoading: topicLoading } = useTopic(numericTopicId);
  const { data: bigrams, isLoading: bigramsLoading } = useTopBigramsByTopic(numericTopicId);

  // Auto-select first topic when none is selected
  useEffect(() => {
    if (!topicId && allTopics && allTopics.length > 0) {
      const sortedTopics = [...allTopics].sort((a, b) => (a.topic_id ?? 0) - (b.topic_id ?? 0));
      const firstTopic = sortedTopics[0];
      if (firstTopic?.topic_id) {
        navigate(`/evidence/topic/${firstTopic.topic_id}`, { replace: true });
      }
    }
  }, [topicId, allTopics, navigate]);

  return (
    <div className="topic-dark-wrapper flex min-h-[600px] -mx-6 -my-8">
      {/* Left Sidebar */}
      <TopicSidebar
        topics={allTopics}
        isLoading={allTopicsLoading}
        selectedTopicId={numericTopicId}
      />

      {/* Main Panel */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto" style={{ background: '#050505' }}>
        {/* Network + Info Card row */}
        <div className="flex gap-4">
          <div className="flex-1 min-w-0">
            <NetworkEmbed topicId={numericTopicId} />
          </div>
          <TopicInfoCard
            topicId={numericTopicId}
            topicName={topic?.topic_name}
            definition={topic?.definition}
            isLoading={topicLoading}
          />
        </div>

        {/* Top 5 Bigram Cards */}
        <BigramCards bigrams={bigrams} isLoading={bigramsLoading} />

        {/* Bigram Trends Chart */}
        <BigramTrendsChart topicId={numericTopicId} topicName={topic?.topic_name} />

        {/* Papers Table */}
        <PapersTable topicId={numericTopicId} />

        {/* Navigation */}
        <TopicNavigation topicId={numericTopicId} />
      </main>
    </div>
  );
}
