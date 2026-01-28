import { useParams, Link } from "react-router-dom";
import { usePapers, usePaper } from "@/hooks/usePapers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PaperListing() {
  const { paperId } = useParams<{ paperId: string }>();
  const numericPaperId = paperId ? parseInt(paperId, 10) : undefined;

  // If viewing a specific paper
  if (numericPaperId) {
    return <PaperDetail paperId={numericPaperId} />;
  }

  // Otherwise show paper list
  return <PaperList />;
}

function PaperList() {
  const { data: papers, isLoading } = usePapers(200);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-2xl font-normal text-foreground">Papers</h2>
        <p className="text-muted-foreground max-w-2xl">
          The scholarly corpus underlying this research artefact.
          Papers are ordered by publication year.
        </p>
      </header>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      ) : papers && papers.length > 0 ? (
        <div className="space-y-2">
          {papers.map((paper) => (
            <Link
              key={paper.paper_id}
              to={`/papers/${paper.paper_id}`}
              className="block p-4 border border-border rounded hover:bg-secondary/50 transition-colors"
            >
              <p className="text-sm font-medium text-foreground">{paper.title}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {paper.authors && `${paper.authors} · `}
                {paper.year && `${paper.year} · `}
                {paper.journal}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No papers found.</p>
      )}
    </div>
  );
}

function PaperDetail({ paperId }: { paperId: number }) {
  const { data: paper, isLoading } = usePaper(paperId);

  return (
    <div className="space-y-8">
      {/* Back link */}
      <Link
        to="/papers"
        className="inline-block text-sm text-muted-foreground hover:text-foreground"
      >
        ← All papers
      </Link>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-32" />
        </div>
      ) : paper ? (
        <article className="space-y-6">
          <header className="space-y-2">
            <h2 className="text-2xl font-normal text-foreground leading-tight">
              {paper.title}
            </h2>
            <p className="text-muted-foreground">
              {paper.authors}
            </p>
            <p className="text-sm text-muted-foreground">
              {paper.journal && `${paper.journal} · `}
              {paper.year}
            </p>
          </header>

          {paper.abstract && (
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base font-normal">Abstract</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground leading-relaxed">
                  {paper.abstract}
                </p>
              </CardContent>
            </Card>
          )}
        </article>
      ) : (
        <p className="text-muted-foreground">Paper not found.</p>
      )}
    </div>
  );
}
