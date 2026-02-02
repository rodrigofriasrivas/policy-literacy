import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Paper {
  paper_id: number;
  title: string;
  authors: string | null;
  year: number | null;
  journal: string | null;
}

interface PaperLink {
  paper_id: number;
  papers: Paper;
}

interface ResearchPapersListProps {
  papers: PaperLink[] | undefined;
  isLoading: boolean;
}

export function ResearchPapersList({ papers, isLoading }: ResearchPapersListProps) {
  if (isLoading) {
    return (
      <section className="space-y-3">
        <Skeleton className="h-6 w-40" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12" />
          ))}
        </div>
      </section>
    );
  }

  const displayedPapers = papers?.slice(0, 10) || [];

  return (
    <section className="space-y-3">
      <div>
        <h3 className="text-lg font-normal text-foreground">Research Papers</h3>
        <p className="text-sm text-muted-foreground">
          A traceable list of selected academic papers.
        </p>
      </div>
      {displayedPapers.length > 0 ? (
        <div className="space-y-2">
          {displayedPapers.map((link) => (
            <div
              key={link.paper_id}
              className="flex items-center justify-between p-3 border border-border rounded hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <FileText className="h-5 w-5 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {link.papers.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {link.papers.authors && `${link.papers.authors} · `}
                    {link.papers.year && `${link.papers.year}`}
                    {link.papers.journal && ` · ${link.papers.journal}`}
                  </p>
                </div>
              </div>
              <Link
                to={`/papers/${link.paper_id}`}
                className="text-sm text-muted-foreground hover:text-foreground hover:underline shrink-0 ml-4"
              >
                Link to Paper
              </Link>
            </div>
          ))}
          {papers && papers.length > 10 && (
            <p className="text-xs text-muted-foreground pt-2">
              Showing 10 of {papers.length} linked papers.
            </p>
          )}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No linked papers found.</p>
      )}
    </section>
  );
}
