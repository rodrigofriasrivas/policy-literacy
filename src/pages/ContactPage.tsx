import { HomeLayout } from "@/components/layout/HomeLayout";

export default function ContactPage() {
  return (
    <HomeLayout>
      <div className="placeholder-page">
        <div className="placeholder-content">
          <h1>Contact</h1>
          <p>
            For questions about the Enterprise Policy Literacy Tool, research collaborations,
            or discussions about entrepreneurship and enterprise policy, please get in touch.
          </p>

          <div className="contact-person">
            <p className="contact-name">Rodrigo Frías, PhD (c)</p>
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
            <p className="contact-line">
              <span className="contact-label">Languages:</span> English and Spanish
            </p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
