import Header from "../components/header";
import Navigation from "../components/navigation";
import Features from "../components/features";
import HowItWorks from "../components/howitworks";
import TryAushadhiAI from "../components/tryaushidhiai";
import CTASection from "../components/ctasection";
import Footer from "../components/footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles.css";
const Home = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <Features />
      <HowItWorks />
      <TryAushadhiAI />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
