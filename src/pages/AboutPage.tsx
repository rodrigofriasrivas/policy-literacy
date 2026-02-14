import { HomeLayout } from "@/components/layout/HomeLayout";

export default function AboutPage() {
  return (
    <HomeLayout>
      <div className="placeholder-page">
        <div className="placeholder-content">
          <h1>About the project</h1>
          <p>This page is under construction.</p>
          <p className="text-muted">
            Learn more about the research methodology, data sources, and academic context
            behind this entrepreneurship policy research artefact.
          </p>
          <p className="text-muted" style={{ marginTop: '1rem' }}>
            The interactive dashboard is a research artefact hosted separately at{" "}
            <a href="/artefact/index.html" className="underline">/artefact/index.html</a>.
          </p>
        </div>
      </div>
    </HomeLayout>
  );
}
