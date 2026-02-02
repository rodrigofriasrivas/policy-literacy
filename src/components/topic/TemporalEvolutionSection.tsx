import { Skeleton } from "@/components/ui/skeleton";
import { TopicTemporalChart } from "@/components/TopicTemporalChart";

interface TemporalEvolutionSectionProps {
  chartData: Record<string, number | null>[] | undefined;
  bigrams: string[] | undefined;
  isLoading: boolean;
}

export function TemporalEvolutionSection({ chartData, bigrams, isLoading }: TemporalEvolutionSectionProps) {
  if (isLoading) {
    return (
      <section className="space-y-3">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-[220px]" />
      </section>
    );
  }

  if (!chartData || chartData.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3">
      <div>
        <h3 className="text-lg font-normal text-foreground">Temporal Evolution of the Topic</h3>
        <p className="text-sm text-muted-foreground">
          Number of papers published per year.
        </p>
      </div>
      
      <TopicTemporalChart data={chartData} bigrams={bigrams || []} />
      
      <div className="p-4 bg-muted/30 rounded border border-border">
        <p className="text-xs font-medium text-foreground mb-2">
          How to read this visual
        </p>
        <div className="space-y-2 text-xs text-muted-foreground">
          <p>
            Each line represents how often a key concept (bigram) appears in 
            the research corpus over time.
          </p>
          <p>
            The horizontal axis shows years (1980–2025).
          </p>
          <p>
            The vertical axis shows the number of papers in which the concept 
            appears in a given year.
          </p>
          <p className="pt-2 border-t border-border">
            This chart does not measure importance, quality, or impact of research. 
            It shows patterns of attention within the literature, helping compare 
            how concepts emerge, persist, or fade over time.
          </p>
        </div>
      </div>
    </section>
  );
}
