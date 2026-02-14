import { HomeLayout } from "@/components/layout/HomeLayout";
import { useEffect, useRef, useState, useCallback } from "react";

const PANELS = [
  { id: "panel-1", num: "01", label: "Why it became a policy concern" },
  { id: "panel-2", num: "02", label: "Enterprise culture to policy" },
  { id: "panel-3", num: "03", label: "Expansion & fragmentation" },
  { id: "panel-4", num: "04", label: "One space, a larger gap" },
  { id: "panel-5", num: "05", label: "Same words, same meaning?" },
  { id: "panel-6", num: "06", label: "Orientation is hard" },
  { id: "panel-7", num: "07", label: "Topic modelling at scale" },
  { id: "panel-8", num: "08", label: "The artefact" },
  { id: "panel-9", num: "09", label: "About the author" },
];

export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const pageRef = useRef<HTMLDivElement>(null);

  const scrollToPanel = useCallback((idx: number) => {
    panelRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleSet = new Set<number>();

    panelRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            visibleSet.add(i);
          } else {
            visibleSet.delete(i);
          }
          if (visibleSet.size > 0) {
            setActiveIndex(Math.min(...visibleSet));
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const setPanelRef = (i: number) => (el: HTMLElement | null) => {
    panelRefs.current[i] = el;
  };

  return (
    <HomeLayout>
      {/* Mobile progress bar */}
      <div className="about-progress" style={{ width: `${progress}%` }} />

      <div className="about-scrolly-page" ref={pageRef}>
        {/* Desktop rail */}
        <nav className="about-rail" aria-label="Chapter navigation">
          <span className="about-rail-title">About the project</span>
          <div className="about-rail-list">
            {PANELS.map((p, i) => (
              <button
                key={p.id}
                className={`about-rail-item${i === activeIndex ? " is-active" : ""}`}
                onClick={() => scrollToPanel(i)}
                aria-label={`Go to ${p.label}`}
              >
                <span className="about-rail-num">{p.num}</span>
                <span className="about-rail-label">{p.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Content column */}
        <div className="about-column">
          <header className="about-header">
            <h1>About the project</h1>
            <p className="about-subtitle">
              A policy-facing map of entrepreneurship and enterprise policy research (1979–2024/25).
            </p>
          </header>

          {/* Panel 1 */}
          <section id="panel-1" className="about-panel" ref={setPanelRef(0)}>
            <span className="about-watermark">01</span>
            <h2>Why entrepreneurship became a policy concern</h2>
            <div className="about-body">
              <p className="about-lead">
                Entrepreneurship did not become a mainstream policy concern in a vacuum. It rose to prominence as governments searched for new engines of growth and employment after the economic turbulence of the 1970s.
              </p>
              <p>
                In that climate, enterprise and small firms gained renewed attention as a practical route to economic renewal. In the UK, the Bolton Report helped consolidate "small firms" as a legitimate object of policy thinking and institutional focus. Soon after, David Birch's work on job creation (1979) gave an influential empirical storyline linking small firms to employment growth. Together, these early anchors helped shape how entrepreneurship entered policy agendas and public debate.
              </p>
            </div>
          </section>

          {/* Panel 2 */}
          <section id="panel-2" className="about-panel" ref={setPanelRef(1)}>
            <span className="about-watermark">02</span>
            <h2>From enterprise culture to enterprise policy</h2>
            <div className="about-body">
              <p className="about-lead">
                During the 1980s, enterprise policy became closely associated with market-oriented reform and the idea that new firms, competition, and private initiative could revitalise economies.
              </p>
              <p>
                Under Thatcher in the UK and Reagan in the US, entrepreneurship was not only a business phenomenon but also part of a wider political project: reducing barriers, promoting enterprise culture, and reframing the state's role in economic development. Research on entrepreneurship and policy began to expand more visibly around this period, and the academic field started to form around recurring assumptions—especially the idea that entrepreneurship "delivers" growth, productivity, and jobs.
              </p>
            </div>
          </section>

          {/* Panel 3 */}
          <section id="panel-3" className="about-panel" ref={setPanelRef(2)}>
            <span className="about-watermark">03</span>
            <h2>A field that expanded and fragmented (1990s–2000s)</h2>
            <div className="about-body">
              <p className="about-lead">
                From the 1990s into the 2000s, the field broadened substantially. Entrepreneurship research moved beyond a narrow focus on the individual entrepreneur and venture creation, opening space for institutional, contextual, and systems-oriented explanations.
              </p>
              <p>
                At the same time, policy research diversified: alongside SME support and job creation, new streams developed around innovation, ecosystems, finance, education, inclusion, and later sustainability and digital transformation. The result is an evidence base that is now large, historically layered, and thematically fragmented—rich in insights, but difficult to navigate as a coherent field when designing or reforming policy.
              </p>
            </div>
          </section>

          {/* Panel 4 — Hero moment */}
          <section id="panel-4" className="about-panel about-panel--hero" ref={setPanelRef(3)}>
            <span className="about-watermark">04</span>
            <h2>Enterprise policy: one space, a much larger gap</h2>
            <div className="about-body">
              <p className="about-lead">
                "Enterprise policy" is written with just one space between two words. But the distance it is expected to bridge is much larger than we often assume.
              </p>
              <div className="about-gap-visual">
                <span className="about-gap-line" />
                <span className="about-gap-space" />
                <span className="about-gap-line" />
              </div>
              <p>
                In practice, that small linguistic gap hides a bigger operational gap: between what research has produced over decades and what policy teams can realistically locate, interpret, and use under real-world constraints of time, attention, and mandate.
              </p>
              <blockquote className="about-callout">
                'Enterprise policy' is written with just one space between two words — but the gap it is expected to bridge is much larger than it looks.
              </blockquote>
            </div>
          </section>

          {/* Panel 5 */}
          <section id="panel-5" className="about-panel" ref={setPanelRef(4)}>
            <span className="about-watermark">05</span>
            <h2>When we say "enterprise policy", do we mean the same thing?</h2>
            <div className="about-body">
              <p className="about-lead">
                As the field has advanced, it has increasingly mixed with policy studies. That creates a subtle but important ambiguity: when we speak about enterprise policy, are we speaking from entrepreneurship studies or from policy studies—and do those traditions mean the same thing when they use the same words?
              </p>
              <p>
                This matters because it shapes what is treated as evidence, what is treated as context, and what gets counted as "what we know" (or do not know) about enterprise policy as a field. Without clarity, conversations can sound aligned while operating with different assumptions, different units of analysis, and different standards of relevance.
              </p>
            </div>
          </section>

          {/* Panel 6 */}
          <section id="panel-6" className="about-panel" ref={setPanelRef(5)}>
            <span className="about-watermark">06</span>
            <h2>The practical problem: evidence exists, but orientation is hard</h2>
            <div className="about-body">
              <p className="about-lead">
                This project starts from a simple practical problem: it is no longer enough to say "use the evidence" if the evidence landscape itself is hard to see.
              </p>
              <p>
                Evidence-based policymaking aspires to inform better decisions, but in entrepreneurship and enterprise policy the limiting factor is often not evidence scarcity—it is interpretability. Thousands of studies exist, but they are dispersed across themes and disciplines, with uneven growth over time. That creates a structural gap between the scale of research and the capacity of decision-makers (and even scholars) to orient themselves within it. We describe this interpretive capacity as enterprise policy literacy: the ability to locate, relate, and judge an expanding body of research as a field, rather than as isolated papers or familiar narratives.
              </p>
            </div>
          </section>

          {/* Panel 7 */}
          <section id="panel-7" className="about-panel" ref={setPanelRef(6)}>
            <span className="about-watermark">07</span>
            <h2>What we did: topic modelling as a way to read the field at scale</h2>
            <div className="about-body">
              <p className="about-lead">
                To address this, the project used topic modelling to analyse a corpus of 5,800+ academic papers published between 1979 and 2024/25.
              </p>
              <p>
                Topic modelling is a family of machine-learning methods that detects latent themes in large text collections by analysing word co-occurrence patterns. In this study, titles and abstracts were processed and modelled using LDA, with bigrams (two-word terms) used to preserve meaningful policy-relevant phrases. The model identified 25 topics, each represented by its most distinctive bigrams, and the results were examined to understand how the research field is distributed and how key themes evolve over time.
              </p>
            </div>
          </section>

          {/* Panel 8 — Hero moment */}
          <section id="panel-8" className="about-panel about-panel--hero about-panel-8-bg" ref={setPanelRef(7)}>
            <span className="about-watermark">08</span>
            <svg className="about-node-map" viewBox="0 0 680 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <circle cx="80" cy="60" r="3" /><circle cx="200" cy="120" r="2.5" />
              <circle cx="340" cy="80" r="3.5" /><circle cx="480" cy="140" r="2" />
              <circle cx="600" cy="70" r="3" /><circle cx="150" cy="220" r="2" />
              <circle cx="300" cy="280" r="3" /><circle cx="450" cy="250" r="2.5" />
              <circle cx="560" cy="320" r="3" /><circle cx="100" cy="340" r="2.5" />
              <circle cx="250" cy="180" r="2" /><circle cx="420" cy="60" r="2" />
              <circle cx="530" cy="200" r="3" /><circle cx="180" cy="310" r="2.5" />
              <circle cx="380" cy="350" r="2" /><circle cx="620" cy="240" r="3" />
              <line x1="80" y1="60" x2="200" y2="120" /><line x1="200" y1="120" x2="340" y2="80" />
              <line x1="340" y1="80" x2="480" y2="140" /><line x1="480" y1="140" x2="600" y2="70" />
              <line x1="150" y1="220" x2="300" y2="280" /><line x1="300" y1="280" x2="450" y2="250" />
              <line x1="450" y1="250" x2="560" y2="320" /><line x1="100" y1="340" x2="180" y2="310" />
              <line x1="250" y1="180" x2="420" y2="60" /><line x1="420" y1="60" x2="530" y2="200" />
              <line x1="530" y1="200" x2="620" y2="240" /><line x1="180" y1="310" x2="380" y2="350" />
              <line x1="200" y1="120" x2="250" y2="180" /><line x1="340" y1="80" x2="300" y2="280" />
              <line x1="480" y1="140" x2="530" y2="200" /><line x1="150" y1="220" x2="100" y2="340" />
            </svg>
            <h2>The artefact and how to use it (and what it is not)</h2>
            <div className="about-body">
              <p className="about-lead">
                Those modelling outputs became the input for the artefact you are using here. Instead of publishing another static review, we translate the topic model into an interactive, policy-oriented map of the field.
              </p>
              <p>
                The interface links three levels of detail—topics, their representative terms, and the papers that support them—so users can move from an overview to traceable sources without needing to run code or read thousands of articles.
              </p>
              <p>
                This artefact is not a ranking of "what works", and it is not an automated policy recommender. It does not evaluate study quality, and it does not prescribe interventions. Its purpose is earlier in the reasoning process: to provide orientation under bounded rationality by making the research landscape visible and navigable. You can use it to identify what the field has focused on, which themes dominate, which remain peripheral, when debates rise or decline, and how specific topics connect to identifiable papers—supporting more informed reading, better scoping of briefs and reviews, and more reflective policy conversations.
              </p>
              <blockquote className="about-callout">
                The map is not the territory.
              </blockquote>
              <p>
                And one final caution: this tool helps you see the shape of a research field; it does not replace judgement, contextual knowledge, or evaluation. It is an entry point designed to make those next steps more feasible.
              </p>
            </div>
            <div className="about-closing-beat" />
          </section>

          {/* Panel 9 — About the author */}
          <section id="panel-9" className="about-panel" ref={setPanelRef(8)}>
            <span className="about-watermark">09</span>
            <h2>About the author</h2>
            <div className="about-body">
              <p className="about-lead">
                Rodrigo Frías is a PhD Researcher at Durham University Business School working at the intersection of entrepreneurship policy, evidence use, and decision-making under bounded rationality.
              </p>
              <p>
                He previously served as Chief Executive of Start-Up Chile and as Director of Early Investment at CORFO (Chile's Economic Development Agency), where he led national programmes supporting early-stage ventures and policy innovation initiatives. This project brings together those practical policy experiences with computational methods and design science to improve enterprise policy literacy.
              </p>
            </div>
          </section>

          {/* Data sources (preserved anchor) */}
          <section id="data-sources" className="about-panel">
            <h2>Data sources</h2>
            <div className="about-body">
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
