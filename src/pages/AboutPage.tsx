import { HomeLayout } from "@/components/layout/HomeLayout";

export default function AboutPage() {
  return (
    <HomeLayout>
      <div className="placeholder-page">
        <div className="placeholder-content" style={{ maxWidth: '720px', textAlign: 'left' }}>
          <h1>About the project</h1>
          <p className="text-muted" style={{ fontSize: '15px', fontStyle: 'italic', marginBottom: '2rem' }}>
            A policy-facing map of entrepreneurship and enterprise policy research (1979–2024/25).
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', lineHeight: '1.75' }}>
            <p className="text-muted">
              Entrepreneurship did not become a mainstream policy concern in a vacuum. It rose to prominence as governments searched for new engines of growth and employment after the economic turbulence of the 1970s. In that climate, enterprise and small firms gained renewed attention as a practical route to economic renewal. In the UK, a key reference point was the Bolton Report, which helped consolidate "small firms" as a legitimate object of policy thinking and institutional focus. Soon after, David Birch's work on job creation (1979) gave an influential empirical storyline that linked small firms to employment growth. Together, these early anchors helped shape the way entrepreneurship entered policy agendas and public debate.
            </p>

            <p className="text-muted">
              During the 1980s, enterprise policy became closely associated with market-oriented reform and the idea that new firms, competition, and private initiative could revitalise economies. Under Thatcher in the UK and Reagan in the US, entrepreneurship was not only a business phenomenon but also part of a wider political project: reducing barriers, promoting enterprise culture, and reframing the state's role in economic development. Research on entrepreneurship and policy began to expand more visibly around this period, and the academic field started to form around a set of recurring assumptions—especially the idea that entrepreneurship "delivers" growth, productivity, and jobs.
            </p>

            <p className="text-muted">
              From the 1990s into the 2000s, the field broadened substantially. Entrepreneurship research moved beyond a narrow focus on the individual entrepreneur and venture creation, opening space for institutional, contextual, and systems-oriented explanations. At the same time, policy research diversified: alongside SME support and job creation, new streams developed around innovation, ecosystems, finance, education, inclusion, and later sustainability and digital transformation. The result is an evidence base that is now large, historically layered, and thematically fragmented—rich in insights, but difficult to navigate as a coherent field when designing or reforming policy.
            </p>

            <p className="text-muted">
              This project starts from a simple practical problem: it is no longer enough to say "use the evidence" if the evidence landscape itself is hard to see. Evidence-based policymaking aspires to inform better decisions, but in entrepreneurship and enterprise policy the limiting factor is often not evidence scarcity—it is interpretability. Thousands of studies exist, but they are dispersed across themes and disciplines, with uneven growth over time. That creates a structural gap between the scale of research and the capacity of decision-makers (and even scholars) to orient themselves within it. We describe this interpretive capacity as enterprise policy literacy: the ability to locate, relate, and judge an expanding body of research as a field, rather than as isolated papers or familiar narratives.
            </p>

            <p className="text-muted">
              To address this, the project used topic modelling to analyse a corpus of 5,800+ academic papers published between 1979 and 2024/25. Topic modelling is a family of machine-learning methods that detects latent themes in large text collections by analysing word co-occurrence patterns. In this study, titles and abstracts were processed and modelled using LDA, with bigrams (two-word terms) used to preserve meaningful policy-relevant phrases. The model identified 25 topics, each represented by its most distinctive bigrams, and the results were examined to understand how the research field is distributed and how key themes evolve over time.
            </p>

            <p className="text-muted">
              Those modelling outputs then became the input for the artefact you are using here. The core design choice is simple: instead of publishing another static review, we translate the topic model into an interactive, policy-oriented map of the field. The interface links three levels of detail—topics, their representative terms, and the papers that support them—so users can move from an overview to traceable sources without needing to run code or read thousands of articles. The artefact is designed as a boundary object: a shared space that allows policymakers, decision-makers, and scholars to engage with the same evidence base, even if they bring different questions, constraints, and levels of technical expertise.
            </p>

            <p className="text-muted">
              How should it be used? Not as a ranking of "what works", and not as an automated policy recommender. The artefact does not evaluate study quality, it does not prescribe interventions, and it is not the territory itself. Its purpose is earlier in the reasoning process: to provide orientation under bounded rationality by making the research landscape visible and navigable. Practically, you can use it to identify what the field has focused on, which themes dominate, which remain peripheral, when particular debates rose or declined, and how specific topics connect to identifiable papers. That enables more informed reading, better scoping of reviews and briefs, and more reflective policy conversations—especially when teams need to move beyond inherited assumptions and engage with the full diversity of what is known.
            </p>
          </div>

          <section id="data-sources" style={{ marginTop: '2.5rem' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '0.5rem' }}>Data sources</h2>
            <p className="text-muted">
              Details about the datasets, bibliometric sources, and analytical methods
              used in this research artefact will be documented here.
            </p>
          </section>
        </div>
      </div>
    </HomeLayout>
  );
}
