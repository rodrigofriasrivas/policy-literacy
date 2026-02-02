import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Topic {
  topic_id: number | null;
  topic_name: string | null;
  topic_label: string | null;
}

interface TopicSidebarProps {
  topics: Topic[] | undefined;
  isLoading: boolean;
  selectedTopicId: number | undefined;
}

export function TopicSidebar({ topics, isLoading, selectedTopicId }: TopicSidebarProps) {
  const sortedTopics = topics 
    ? [...topics].sort((a, b) => (a.topic_id ?? 0) - (b.topic_id ?? 0))
    : [];

  return (
    <aside className="w-60 shrink-0 border-r border-border">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium text-foreground">Topics</h3>
        <p className="text-xs text-muted-foreground mt-1">Select a topic to explore</p>
      </div>
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="p-2">
          {isLoading ? (
            <div className="space-y-1">
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          ) : sortedTopics.length > 0 ? (
            <div className="space-y-1">
              {sortedTopics.map((t) => (
                <Link
                  key={t.topic_id}
                  to={`/topic/${t.topic_id}`}
                  className={cn(
                    "block px-3 py-2 text-sm rounded transition-colors",
                    selectedTopicId === t.topic_id
                      ? "bg-secondary text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  Topic {t.topic_id}: {t.topic_name}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground px-3 py-2">No topics available.</p>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
