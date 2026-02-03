import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTopic, useTopBigramsByTopic, useTopicsRanked } from "@/hooks/useTopics";
import { usePapersByTopicId } from "@/hooks/usePapers";
import { useTopicTemporalData } from "@/hooks/useTopicTemporalData";
import {
  TopicSidebar,
  TopicHeader,
  NetworkVisualizationPlaceholder,
  TopTermsGrid,
  TemporalEvolutionSection,
  ResearchPapersList,
} from "@/components/topic";

export default function TopicExploration() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const numericTopicId = topicId ? parseInt(topicId, 10) : undefined;

  const { data: allTopics, isLoading: allTopicsLoading } = useTopicsRanked();
  const { data: topic, isLoading: topicLoading } = useTopic(numericTopicId);
  const { data: bigrams, isLoading: bigramsLoading } = useTopBigramsByTopic(numericTopicId);
  const { data: papers, isLoading: papersLoading } = usePapersByTopicId(numericTopicId);
  const { data: temporalData, isLoading: temporalLoading } = useTopicTemporalData(numericTopicId);

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

  const isContentLoading = topicLoading || bigramsLoading || papersLoading || temporalLoading;

  return (
    <div className="flex gap-6 min-h-[600px]">
      {/* Left Sidebar */}
      <TopicSidebar
        topics={allTopics}
        isLoading={allTopicsLoading}
        selectedTopicId={numericTopicId}
      />

      {/* Main Panel */}
      <main className="flex-1 space-y-8 pb-8">
        {/* Topic Header */}
        <TopicHeader
          topicId={numericTopicId}
          topicName={topic?.topic_name}
          definition={topic?.definition}
          isLoading={topicLoading}
        />

        {/* Network Visualization Placeholder */}
        <NetworkVisualizationPlaceholder />

        {/* Top 5 Terms */}
        <TopTermsGrid
          bigrams={bigrams}
          isLoading={bigramsLoading}
        />

        {/* Temporal Evolution */}
        <TemporalEvolutionSection
          chartData={temporalData?.chartData}
          bigrams={temporalData?.bigrams}
          isLoading={temporalLoading}
        />

        {/* Research Papers */}
        <ResearchPapersList
          papers={papers}
          isLoading={papersLoading}
        />
      </main>
    </div>
  );
}
