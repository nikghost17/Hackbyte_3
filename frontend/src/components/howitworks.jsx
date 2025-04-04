import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
const HowItWorks = () => {
  const steps = [
    {
      icon: "fa-upload",
      title: "Upload Your Prescription",
      text: "Take a photo or upload an image of your prescription.",
    },
    {
      icon: "fa-brain",
      title: "AI Analysis",
      text: "Our AI processes and decodes the handwriting using neural networks.",
    },
    {
      icon: "fa-check-circle",
      title: "Receive Clear Information",
      text: "Get detailed, easy-to-understand medication information.",
    },
  ];

  return (
    <section className="how-it-works">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step">
              <div className="step-number">{index + 1}</div>
              <div className="step-icon">
                <i className={`fas ${step.icon}`}></i>
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;
