import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatTopicName } from "@/lib/utils";

interface TopicHeaderProps {
  topicId: number | undefined;
  topicName: string | undefined;
  definition: string | undefined | null;
  isLoading: boolean;
}

export function TopicHeader({ topicId, topicName, definition, isLoading }: TopicHeaderProps) {
  if (isLoading) {
    return (
      <section className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-16 w-full max-w-2xl" />
        <div className="flex gap-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </section>
    );
  }

  if (!topicName) {
    return (
      <section>
        <p className="text-muted-foreground">Topic not found.</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-normal text-foreground">
        {formatTopicName(topicId, topicName)}
      </h2>
      {definition && (
        <p className="text-muted-foreground max-w-2xl">{definition}</p>
      )}
      <div className="flex gap-3">
        <Button variant="outline" size="sm">
          View Research
        </Button>
        <Button variant="outline" size="sm">
          Learn More
        </Button>
      </div>
    </section>
  );
}
