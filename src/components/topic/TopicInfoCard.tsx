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
      <div className="w-80 shrink-0 rounded-2xl p-5 space-y-3"
        style={{
          background: 'rgba(20,20,20,0.55)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        }}
      >
        <Skeleton className="h-6 w-3/4 bg-white/10" />
        <Skeleton className="h-24 w-full bg-white/10" />
      </div>
    );
  }

  return (
    <div className="w-80 shrink-0 rounded-2xl"
      style={{
        background: 'rgba(20,20,20,0.55)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        padding: '20px',
      }}
    >
      <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', marginBottom: '12px', lineHeight: 1.3 }}>
        Topic {topicId}: {topicName}
      </h3>
      <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'rgba(255,255,255,0.75)' }}>
        {definition || "Description not available yet."}
      </p>
    </div>
  );
}
