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
      <div className="grid grid-cols-5 gap-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-20 bg-white/10 rounded-xl" />
        ))}
      </div>
    );
  }

  const top5 = (bigrams ?? []).slice(0, 5);

  if (top5.length === 0) {
    return <p className="text-sm text-[#a0a0a0]">No bigrams available.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {top5.map((b) => (
        <div key={b.bigram} className="topic-glass-card p-4 text-center">
          <p className="text-xs font-semibold text-white mb-1">
            {(b.bigram ?? "").replace(/_/g, " ")}
          </p>
          <p className="text-[10px] text-[#a0a0a0]">
            {b.frequency_sum?.toLocaleString() ?? "–"} &middot;{" "}
            {b.normalized_frequency != null
              ? `${(b.normalized_frequency * 100).toFixed(1)}%`
              : "–"}
          </p>
        </div>
      ))}
    </div>
  );
}
