import { HomeLayout } from "@/components/layout/HomeLayout";

export default function ContactPage() {
  return (
    <HomeLayout>
      <div className="placeholder-page">
        <div className="placeholder-content">
          <h1>Contact</h1>
          <p>
            For questions about the Enterprise Policy Literacy Tool, research collaborations,
            or feedback on the artefact, please feel free to get in touch.
          </p>
          <p className="text-muted">You are welcome to contact me in English or Spanish.</p>

          <div className="contact-person">
            <p className="contact-name">Rodrigo Frías, PhD</p>
            <p className="contact-role">Researcher &amp; Developer</p>
            <p className="contact-line">
              <span className="contact-label">Email:</span>
              <a href="mailto:rodrigo.frias@durham.ac.uk">rodrigo.frias@durham.ac.uk</a>
            </p>
            <p className="contact-line">
              <span className="contact-label">LinkedIn:</span>
              <a
                href="https://www.linkedin.com/in/rodrigofrias/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rodrigo Frías on LinkedIn (opens in a new tab)"
              >
                linkedin.com/in/rodrigofrias
              </a>
            </p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
