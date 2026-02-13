import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

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
    <aside className="w-80 shrink-0" style={{ background: 'rgba(10, 10, 10, 0.95)' }}>
      <div className="p-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <Link to="/evidence" className="flex items-center gap-1.5 text-[11px] text-[#a0a0a0] hover:text-white transition-colors mb-3">
          <ArrowLeft size={12} /> Back to dashboard
        </Link>
        <h3 className="text-xs font-bold text-white uppercase tracking-widest">Topics</h3>
        <p className="text-[10px] text-[#a0a0a0] mt-1">Select a topic to explore</p>
      </div>
      <ScrollArea className="h-[calc(100vh-110px)]">
        <div className="p-2">
          {isLoading ? (
            <div className="space-y-1">
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-full bg-white/10" />
              ))}
            </div>
          ) : sortedTopics.length > 0 ? (
            <div className="space-y-0.5">
              {sortedTopics.map((t) => (
                <Link
                  key={t.topic_id}
                  to={`/evidence/topic/${t.topic_id}`}
                  className={cn(
                    "block px-3 py-2 text-xs rounded-lg transition-colors",
                    selectedTopicId === t.topic_id
                      ? "bg-white/10 text-white font-medium"
                      : "text-[#a0a0a0] hover:text-white hover:bg-white/5"
                  )}
                >
                  Topic {t.topic_id}: {t.topic_name}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#a0a0a0] px-3 py-2">No topics available.</p>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}
