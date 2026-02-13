import { useState } from "react";
import { usePaginatedPapersByTopic } from "@/hooks/usePaginatedPapers";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";

interface PapersTableProps {
  topicId?: number;
}

export function PapersTable({ topicId }: PapersTableProps) {
  const [page, setPage] = useState(0);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const { data, isLoading } = usePaginatedPapersByTopic(topicId, page);

  // Reset page when topic changes
  const [prevTopicId, setPrevTopicId] = useState(topicId);
  if (topicId !== prevTopicId) {
    setPrevTopicId(topicId);
    setPage(0);
    setExpandedId(null);
  }

  if (isLoading) {
    return (
      <div className="topic-glass-card p-5 space-y-2">
        <Skeleton className="h-5 w-48 bg-white/10" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full bg-white/10" />
        ))}
      </div>
    );
  }

  if (!data || data.papers.length === 0) {
    return (
      <div className="topic-glass-card p-5">
        <h4 className="text-sm font-semibold text-white mb-2">Papers informing this topic</h4>
        <p className="text-xs text-[#a0a0a0]">No papers found for this topic.</p>
      </div>
    );
  }

  return (
    <div className="topic-glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-white">
          Papers informing this topic
          <span className="text-[#a0a0a0] font-normal ml-2 text-xs">
            ({data.totalCount} papers)
          </span>
        </h4>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/10 text-[#a0a0a0] uppercase tracking-wider">
              <th className="text-left py-2 pr-2 w-6"></th>
              <th className="text-left py-2 pr-4">Title</th>
              <th className="text-left py-2 pr-4 whitespace-nowrap">Author(s)</th>
              <th className="text-left py-2 pr-4">Year</th>
              <th className="text-left py-2">Journal</th>
            </tr>
          </thead>
          <tbody>
            {data.papers.map((p) => (
              <>
                <tr
                  key={p.paper_id}
                  className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                  onClick={() =>
                    setExpandedId(expandedId === p.paper_id ? null : p.paper_id)
                  }
                >
                  <td className="py-2 pr-2 text-[#a0a0a0]">
                    {expandedId === p.paper_id ? (
                      <ChevronUp className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                  </td>
                  <td className="py-2 pr-4 text-white max-w-xs truncate">{p.title}</td>
                  <td className="py-2 pr-4 text-[#a0a0a0] max-w-[180px] truncate">
                    {p.authors ?? "–"}
                  </td>
                  <td className="py-2 pr-4 text-[#a0a0a0]">{p.year ?? "–"}</td>
                  <td className="py-2 text-[#a0a0a0] max-w-[140px] truncate">
                    {p.journal ?? "–"}
                  </td>
                </tr>
                {expandedId === p.paper_id && (
                  <tr key={`${p.paper_id}-abstract`}>
                    <td colSpan={5} className="py-3 px-4">
                      <div className="text-[11px] leading-relaxed text-[#a0a0a0] bg-white/5 rounded-lg p-3">
                        {p.abstract || "Abstract not available."}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-xs text-[#a0a0a0]">
          <span>
            Page {page + 1} of {data.totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="topic-glass-btn px-3 py-1.5 disabled:opacity-30"
            >
              <ChevronLeft className="w-3 h-3 inline mr-1" /> Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(data.totalPages - 1, p + 1))}
              disabled={page >= data.totalPages - 1}
              className="topic-glass-btn px-3 py-1.5 disabled:opacity-30"
            >
              Next <ChevronRight className="w-3 h-3 inline ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
