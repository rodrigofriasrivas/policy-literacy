import { HomeLayout } from "@/components/layout/HomeLayout";

export default function AboutPage() {
  return (
    <HomeLayout>
      <div className="scrolly-page">
        <div className="scrolly-column">
          {/* Page header */}
          <header style={{ paddingBottom: '32px' }}>
            <h1>About the project</h1>
            <p className="text-muted" style={{ fontSize: '15px', fontStyle: 'italic', marginTop: '8px' }}>
              A policy-facing map of entrepreneurship and enterprise policy research (1979–2024/25).
            </p>
          </header>

          {/* Panel 1 */}
          <section className="scrolly-panel">
            <h2>Why entrepreneurship became a policy concern</h2>
            <div className="scrolly-body">
              <p className="scrolly-lead">
                Entrepreneurship did not become a mainstream policy concern in a vacuum. It rose to prominence as governments searched for new engines of growth and employment after the economic turbulence of the 1970s.
              </p>
              <p>
                In that climate, enterprise and small firms gained renewed attention as a practical route to economic renewal. In the UK, the Bolton Report helped consolidate "small firms" as a legitimate object of policy thinking and institutional focus. Soon after, David Birch's work on job creation (1979) gave an influential empirical storyline linking small firms to employment growth. Together, these early anchors helped shape how entrepreneurship entered policy agendas and public debate.
              </p>
            </div>
          </section>

          {/* Panel 2 */}
          <section className="scrolly-panel">
            <h2>From enterprise culture to enterprise policy</h2>
            <div className="scrolly-body">
              <p className="scrolly-lead">
                During the 1980s, enterprise policy became closely associated with market-oriented reform and the idea that new firms, competition, and private initiative could revitalise economies.
              </p>
              <p>
                Under Thatcher in the UK and Reagan in the US, entrepreneurship was not only a business phenomenon but also part of a wider political project: reducing barriers, promoting enterprise culture, and reframing the state's role in economic development. Research on entrepreneurship and policy began to expand more visibly around this period, and the academic field started to form around recurring assumptions—especially the idea that entrepreneurship "delivers" growth, productivity, and jobs.
              </p>
            </div>
          </section>

          {/* Panel 3 */}
          <section className="scrolly-panel">
            <h2>A field that expanded and fragmented (1990s–2000s)</h2>
            <div className="scrolly-body">
              <p className="scrolly-lead">
                From the 1990s into the 2000s, the field broadened substantially. Entrepreneurship research moved beyond a narrow focus on the individual entrepreneur and venture creation, opening space for institutional, contextual, and systems-oriented explanations.
              </p>
              <p>
                At the same time, policy research diversified: alongside SME support and job creation, new streams developed around innovation, ecosystems, finance, education, inclusion, and later sustainability and digital transformation. The result is an evidence base that is now large, historically layered, and thematically fragmented—rich in insights, but difficult to navigate as a coherent field when designing or reforming policy.
              </p>
            </div>
          </section>

          {/* Panel 4 */}
          <section className="scrolly-panel">
            <h2>Enterprise policy: one space, a much larger gap</h2>
            <div className="scrolly-body">
              <p className="scrolly-lead">
                "Enterprise policy" is written with just one space between two words. But the distance it is expected to bridge is much larger than we often assume.
              </p>
              <p>
                In practice, that small linguistic gap hides a bigger operational gap: between what research has produced over decades and what policy teams can realistically locate, interpret, and use under real-world constraints of time, attention, and mandate.
              </p>
              <blockquote className="scrolly-callout">
                'Enterprise policy' is written with just one space between two words — but the gap it is expected to bridge is much larger than it looks.
              </blockquote>
            </div>
          </section>

          {/* Panel 5 */}
          <section className="scrolly-panel">
            <h2>When we say "enterprise policy", do we mean the same thing?</h2>
            <div className="scrolly-body">
              <p className="scrolly-lead">
                As the field has advanced, it has increasingly mixed with policy studies. That creates a subtle but important ambiguity: when we speak about enterprise policy, are we speaking from entrepreneurship studies or from policy studies—and do those traditions mean the same thing when they use the same words?
              </p>
              <p>
                This matters because it shapes what is treated as evidence, what is treated as context, and what gets counted as "what we know" (or do not know) about enterprise policy as a field. Without clarity, conversations can sound aligned while operating with different assumptions, different units of analysis, and different standards of relevance.
              </p>
            </div>
          </section>

          {/* Panel 6 */}
          <section className="scrolly-panel">
            <h2>The practical problem: evidence exists, but orientation is hard</h2>
            <div className="scrolly-body">
              <p className="scrolly-lead">
                This project starts from a simple practical problem: it is no longer enough to say "use the evidence" if the evidence landscape itself is hard to see.
              </p>
              <p>
                Evidence-based policymaking aspires to inform better decisions, but in entrepreneurship and enterprise policy the limiting factor is often not evidence scarcity—it is interpretability. Thousands of studies exist, but they are dispersed across themes and disciplines, with uneven growth over time. That creates a structural gap between the scale of research and the capacity of decision-makers (and even scholars) to orient themselves within it. We describe this interpretive capacity as enterprise policy literacy: the ability to locate, relate, and judge an expanding body of research as a field, rather than as isolated papers or familiar narratives.
              </p>
            </div>
          </section>

          {/* Panel 7 */}
          <section className="scrolly-panel">
            <h2>What we did: topic modelling as a way to read the field at scale</h2>
            <div className="scrolly-body">
              <p className="scrolly-lead">
                To address this, the project used topic modelling to analyse a corpus of 5,800+ academic papers published between 1979 and 2024/25.
              </p>
              <p>
                Topic modelling is a family of machine-learning methods that detects latent themes in large text collections by analysing word co-occurrence patterns. In this study, titles and abstracts were processed and modelled using LDA, with bigrams (two-word terms) used to preserve meaningful policy-relevant phrases. The model identified 25 topics, each represented by its most distinctive bigrams, and the results were examined to understand how the research field is distributed and how key themes evolve over time.
              </p>
            </div>
          </section>

          {/* Panel 8 */}
          <section className="scrolly-panel">
            <h2>The artefact and how to use it (and what it is not)</h2>
            <div className="scrolly-body">
              <p className="scrolly-lead">
                Those modelling outputs became the input for the artefact you are using here. Instead of publishing another static review, we translate the topic model into an interactive, policy-oriented map of the field.
              </p>
              <p>
                The interface links three levels of detail—topics, their representative terms, and the papers that support them—so users can move from an overview to traceable sources without needing to run code or read thousands of articles.
              </p>
              <p>
                This artefact is not a ranking of "what works", and it is not an automated policy recommender. It does not evaluate study quality, and it does not prescribe interventions. Its purpose is earlier in the reasoning process: to provide orientation under bounded rationality by making the research landscape visible and navigable. You can use it to identify what the field has focused on, which themes dominate, which remain peripheral, when debates rise or decline, and how specific topics connect to identifiable papers—supporting more informed reading, better scoping of briefs and reviews, and more reflective policy conversations.
              </p>
              <blockquote className="scrolly-callout">
                The map is not the territory.
              </blockquote>
              <p>
                And one final caution: this tool helps you see the shape of a research field; it does not replace judgement, contextual knowledge, or evaluation. It is an entry point designed to make those next steps more feasible.
              </p>
            </div>
          </section>

          {/* Data sources (preserved anchor) */}
          <section id="data-sources" className="scrolly-panel">
            <h2>Data sources</h2>
            <div className="scrolly-body">
              <p>
                Details about the datasets, bibliometric sources, and analytical methods
                used in this research artefact will be documented here.
              </p>
            </div>
          </section>
        </div>
      </div>
    </HomeLayout>
  );
}
