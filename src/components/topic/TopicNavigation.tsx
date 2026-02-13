import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TopicNavigationProps {
  topicId?: number;
}

export function TopicNavigation({ topicId }: TopicNavigationProps) {
  const navigate = useNavigate();
  const id = topicId ?? 1;

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={() => navigate(`/evidence/topic/${id - 1}`)}
        disabled={id <= 1}
        className="topic-glass-btn px-5 py-2.5 disabled:opacity-30"
      >
        <ChevronLeft className="w-4 h-4 inline mr-1" />
        Previous Topic
      </button>
      <button
        onClick={() => navigate(`/evidence/topic/${id + 1}`)}
        disabled={id >= 25}
        className="topic-glass-btn px-5 py-2.5 disabled:opacity-30"
      >
        Next Topic
        <ChevronRight className="w-4 h-4 inline ml-1" />
      </button>
    </div>
  );
}
