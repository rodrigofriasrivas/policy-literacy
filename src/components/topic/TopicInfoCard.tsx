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
      <div className="topic-info-card w-80 shrink-0 rounded-2xl p-5 space-y-3"
        style={{
          background: 'var(--topic-surface)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid var(--topic-border)',
          boxShadow: 'var(--topic-shadow)',
        }}
      >
        <Skeleton className="h-6 w-3/4 bg-muted" />
        <Skeleton className="h-24 w-full bg-muted" />
      </div>
    );
  }

  return (
    <div className="topic-info-card w-80 shrink-0 rounded-2xl"
      style={{
        background: 'var(--topic-surface)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid var(--topic-border)',
        boxShadow: 'var(--topic-shadow)',
        padding: '20px',
      }}
    >
      <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--topic-ink)', marginBottom: '12px', lineHeight: 1.3 }}>
        Topic {topicId}: {topicName}
      </h3>
      <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--topic-description)' }}>
        {definition || "Description not available yet."}
      </p>
    </div>
  );
}
