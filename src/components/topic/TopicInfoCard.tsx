import { Skeleton } from "@/components/ui/skeleton";

interface TopicInfoCardProps {
  topicId?: number;
  topicName?: string;
  definition?: string | null;
  isLoading: boolean;
}

export function TopicInfoCard({ topicId, topicName, definition, isLoading }: TopicInfoCardProps) {
  if (isLoading) {
    return (
      <div className="topic-glass-card w-72 shrink-0 p-5 space-y-3">
        <Skeleton className="h-5 w-3/4 bg-white/10" />
        <Skeleton className="h-20 w-full bg-white/10" />
      </div>
    );
  }

  return (
    <div className="topic-glass-card w-72 shrink-0 p-5">
      <h3 className="text-sm font-semibold text-white uppercase tracking-wide mb-3">
        Topic {topicId}: {topicName}
      </h3>
      <p className="text-xs leading-relaxed text-[#a0a0a0]">
        {definition || "Description not available yet."}
      </p>
    </div>
  );
}
