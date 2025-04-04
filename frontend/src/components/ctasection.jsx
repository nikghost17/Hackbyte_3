import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>Ready to decode your prescription?</h2>
          <p>
            Our AI-powered tool helps you understand your medication details.
          </p>
          <button
            className="cta-button"
            onClick={() =>
              document
                .getElementById("app-section")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Try AushadhiAI Now
          </button>
        </div>
      </div>
    </section>
  );
};
export default CTASection;
