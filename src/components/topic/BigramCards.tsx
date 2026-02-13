import { Skeleton } from "@/components/ui/skeleton";

interface Bigram {
  bigram: string | null;
  frequency_sum: number | null;
  normalized_frequency: number | null;
  rank: number | null;
  topic_id: number | null;
  topic_name: string | null;
}

interface BigramCardsProps {
  bigrams: Bigram[] | undefined;
  isLoading: boolean;
}

export function BigramCards({ bigrams, isLoading }: BigramCardsProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-5 w-64 bg-white/10 rounded" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-28 bg-white/10 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const top5 = (bigrams ?? []).slice(0, 5);

  if (top5.length === 0) {
    return <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)' }}>No bigrams available.</p>;
  }

  return (
    <div className="space-y-3">
      <div>
        <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
          Top terms shaping this topic (top 5 bigrams)
        </h4>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>
          Bigrams are frequent two-word terms used by the model to characterise this topic (not causal claims).
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {top5.map((b) => (
          <div
            key={b.bigram}
            className="rounded-xl"
            style={{
              background: 'rgba(20,20,20,0.5)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '14px',
            }}
          >
            <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
              {(b.bigram ?? "").replace(/_/g, " ")}
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
              Total occurrences: {b.frequency_sum?.toLocaleString() ?? "–"}
            </p>
            {b.normalized_frequency != null && (
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                Share within topic: {(b.normalized_frequency * 100).toFixed(1)}%
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
