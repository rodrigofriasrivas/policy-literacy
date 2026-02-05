import { Skeleton } from "@/components/ui/skeleton";

interface Bigram {
  bigram: string | null;
  normalized_frequency: number | null;
}

interface TopTermsGridProps {
  bigrams: Bigram[] | undefined;
  isLoading: boolean;
}

export function TopTermsGrid({ bigrams, isLoading }: TopTermsGridProps) {
  if (isLoading) {
    return (
      <section className="space-y-3">
        <Skeleton className="h-6 w-32" />
        <div className="grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      </section>
    );
  }

  const topBigrams = bigrams?.slice(0, 5) || [];

  return (
    <section className="space-y-3">
      <div>
        <h3 className="text-lg font-normal text-foreground">Top 5 terms</h3>
        <p className="text-sm text-muted-foreground">
          Main bigrams (two-words combined)
        </p>
      </div>
      {topBigrams.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {topBigrams.map((b) => (
            <div
              key={b.bigram}
              className="text-center p-4 border border-border rounded bg-muted/30"
            >
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                {b.bigram}
              </p>
              <p className="text-lg font-medium text-foreground">
                {((b.normalized_frequency || 0) * 100).toFixed(1)}%
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No bigrams available.</p>
      )}
    </section>
  );
}
