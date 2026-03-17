import { useEffect, useState } from "react";
import { ModuleShell } from "@/components/intro/ModuleShell";

interface Topic {
  topic_id: number;
  topic_name: string;
  definition: string;
}

// 6 macro-themes as orientation aids — drawn from the paper's appendix (Table 3).
// These are labels, not structural hierarchy. The 25 topics are the navigational unit.
const MACRO_THEMES: { id: number; label: string; topicIds: number[] }[] = [
  {
    id: 1,
    label: "Entrepreneurial Intentions & Firm Creation",
    topicIds: [1, 12, 14, 21],
  },
  {
    id: 2,
    label: "Ecosystems & Startup Support",
    topicIds: [5, 8, 10, 16],
  },
  {
    id: 3,
    label: "Policy Design & Evaluation",
    topicIds: [6, 7, 11, 13, 15, 17],
  },
  {
    id: 4,
    label: "Inclusion, Gender & Marginalised Contexts",
    topicIds: [3, 9, 18, 22, 25],
  },
  {
    id: 5,
    label: "Digital & Technological Transformation",
    topicIds: [2, 20, 24],
  },
  {
    id: 6,
    label: "Sustainability & Green Transition",
    topicIds: [4, 19, 23],
  },
];

// Per-topic colours: match the artefact's topicColors array exactly (index = topic_id - 1)
// Source: topicColors array in /public/artefact/index.html — read-only, not modified.
const TOPIC_COLORS: Record<number, string> = {
  1:  '#FF6B6B', 2:  '#4ECDC4', 3:  '#45B7D1', 4:  '#FFA07A', 5:  '#98D8C8',
  6:  '#F7DC6F', 7:  '#BB8FCE', 8:  '#85C1E2', 9:  '#F8B739', 10: '#52B788',
  11: '#E76F51', 12: '#2A9D8F', 13: '#E9C46A', 14: '#F4A261', 15: '#264653',
  16: '#D62828', 17: '#003049', 18: '#F77F00', 19: '#06FFA5', 20: '#7209B7',
  21: '#560BAD', 22: '#3A0CA3', 23: '#4361EE', 24: '#4CC9F0', 25: '#FF006E',
};

// Macro-theme colours derived from a representative topic in each group
const THEME_COLORS: Record<number, string> = {
  1: '#FF6B6B',  // Topic 1
  2: '#98D8C8',  // Topic 5
  3: '#F7DC6F',  // Topic 6
  4: '#45B7D1',  // Topic 3
  5: '#4ECDC4',  // Topic 2
  6: '#FFA07A',  // Topic 4
};

function getTopicColor(topicId: number): string {
  return TOPIC_COLORS[topicId] ?? 'rgba(255,255,255,0.25)';
}

function getTopicTheme(topicId: number) {
  return MACRO_THEMES.find((t) => t.topicIds.includes(topicId));
}

export default function IntroModule3() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTheme, setActiveTheme] = useState<number | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    fetch("/artefact/data/topics.json")
      .then((r) => r.json())
      .then((d: Topic[]) => {
        setTopics(d.sort((a, b) => a.topic_id - b.topic_id));
        setLoading(false);
        // Stagger-in animation
        setTimeout(() => setRevealed(true), 100);
      });
  }, []);

  const filteredTopics =
    activeTheme === null
      ? topics
      : topics.filter((t) => {
          const theme = MACRO_THEMES.find((m) => m.id === activeTheme);
          return theme?.topicIds.includes(t.topic_id);
        });

  return (
    <ModuleShell
      step={3}
      prevPath="/intro/2"
      nextPath="/artefact/index.html"
      nextLabel="Explore the full field"
      nextIsExternal={true}
    >
      <div className="m3-page">
        {/* Opening narrative — Fix 4 */}
        <div className="m3-header">
          <p className="m3-eyebrow">Step 3 of 3 — The structure</p>
          <h1 className="m3-title">
            How do we make sense of 40 years of research?
          </h1>
          <p className="m3-lead">
            When a field accumulates across four decades, no single reader can hold it all.
            The question is whether it can be read as a structure.
          </p>
          <div className="m3-body">
            <p>
              To map the field, this study used a computational technique called topic modelling.
              It reads thousands of paper titles and abstracts as data, detecting patterns of terms
              that appear together across documents. Each pattern signals a recurring research
              conversation — a cluster of papers that share vocabulary, questions, and concerns.
            </p>
            <p>
              The method used is called LDA — Latent Dirichlet Allocation. It detects statistical
              regularities in language across the corpus. The interpretation of what each pattern
              represents and how it relates to others remains a human judgement.
            </p>
            <p>
              Applied to 5,800 papers, the model identified 25 patterns. Each one is a research
              conversation, not a ranking. Some appear frequently across the entire 40-year period;
              others are concentrated in particular decades. None sits above another.
            </p>
            <p className="m3-epistemic-note">
              <em>This is a representation of how the field has developed — not a definitive picture of it.</em>
            </p>
          </div>
          <p className="m3-note">
            These groupings are orientation aids drawn from the paper’s appendix.
            They are not the structure of the field — use them to locate yourself,
            then explore the topics directly.
          </p>
        </div>

        {/* Macro-theme filter pills */}
        <div className="m3-theme-pills">
          <button
            id="m3-filter-all"
            className={`m3-theme-pill ${activeTheme === null ? "is-active" : ""}`}
            onClick={() => setActiveTheme(null)}
          >
            All 25 topics
          </button>
          {MACRO_THEMES.map((theme) => (
            <button
              key={theme.id}
              id={`m3-filter-theme-${theme.id}`}
              className={`m3-theme-pill ${activeTheme === theme.id ? "is-active" : ""}`}
              style={
                activeTheme === theme.id
                  ? { borderColor: THEME_COLORS[theme.id], color: THEME_COLORS[theme.id] }
                  : {}
              }
              onClick={() =>
                setActiveTheme(activeTheme === theme.id ? null : theme.id)
              }
            >
              {theme.label}
              <span className="m3-theme-pill-count">
                {theme.topicIds.length}
              </span>
            </button>
          ))}
        </div>

        {/* Topic grid */}
        {loading ? (
          <div className="m3-loading">Loading topics…</div>
        ) : (
          <div className={`m3-grid ${revealed ? "is-revealed" : ""}`}>
            {filteredTopics.map((topic, idx) => {
              const theme = getTopicTheme(topic.topic_id);
              const topicColor = getTopicColor(topic.topic_id);
              const themeColor = theme ? THEME_COLORS[theme.id] : undefined;
              const isExpanded = expandedTopic === topic.topic_id;
              return (
                <button
                  key={topic.topic_id}
                  id={`m3-topic-${topic.topic_id}`}
                  className={`m3-topic-card ${isExpanded ? "is-expanded" : ""}`}
                  style={{
                    animationDelay: `${idx * 25}ms`,
                    borderTopColor: topicColor,
                  }}
                  onClick={() =>
                    setExpandedTopic(isExpanded ? null : topic.topic_id)
                  }
                  aria-expanded={isExpanded}
                >
                  <div className="m3-topic-top">
                    <span
                      className="m3-topic-num"
                      style={{ color: topicColor }}
                    >
                      {String(topic.topic_id).padStart(2, "0")}
                    </span>
                    <span className="m3-topic-name">{topic.topic_name}</span>
                    {theme && (
                      <span
                        className="m3-topic-theme-dot"
                        style={{ background: themeColor }}
                        title={theme.label}
                      />
                    )}
                  </div>
                  {isExpanded && (
                    <p className="m3-topic-definition">
                      {/* Trim the academic citation cruft for readability */}
                      {topic.definition
                        .replace(/\s*\((?:extending|building on)[^)]+\)/g, "")
                        .replace(/\s*\[[^\]]+\]/g, "")
                        .split(".")[0] + "."}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Interpretive note */}
        <div className="m3-interpretive-note">
          <p>
            These 25 topics are the product of a computational text analysis of
            {" "}5,800+ paper titles and abstracts. Each topic represents a pattern
            of word co-occurrence — not an editorial judgement about importance.
            Frequency reflects how often a pattern appears across the corpus.
            It is a measure of <em>presence</em>, not importance.
          </p>
          <p>
            The full interactive map lets you explore each topic’s papers, its
            representative terms, and how its presence in the literature varies
            over time. No topic is ranked above another.
          </p>
        </div>

        {/* CTA block — Fix 5 */}
        <div className="m3-cta-block">
          <h2 className="m3-cta-title">The map is ready.</h2>
          <div className="m3-cta-body">
            <p>
              The network connects 25 research conversations, 125 key terms, and the papers
              behind them across four decades — now visible as a single structure.
              Explore by topic, by term, or by time period.
            </p>
            <p>
              The view is dense. That density reflects the field — a body of research that
              has expanded in parallel across time, contexts, and conversations that rarely
              converge. Enterprise policy has never been a single conversation.
              This map makes that visible.
            </p>
            <p>
              Understanding the shape and evolution of this field is a starting point —
              whether you are designing an enterprise policy, building a programme,
              or simply trying to understand what the research actually covers.
            </p>
          </div>
          <button
            onClick={() => { window.location.href = '/artefact/index.html'; }}
            className="m3-cta-button"
            id="m3-cta-explore-network"
          >
            Explore the full field →
          </button>
          <p className="m3-cta-note">
            Epistemic caution: this map is a computational representation of
            patterns in a sample. It is not a definitive picture of the field.
            Use it to orient — not to validate.
          </p>
        </div>
      </div>
    </ModuleShell>
  );
}
