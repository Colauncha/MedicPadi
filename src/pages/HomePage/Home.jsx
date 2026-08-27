import Navbar from "../../components/LandingPage/Navbar";
import Hero from "../../components/LandingPage/Hero";
import TrustedLogos from "../../components/LandingPage/TrustedLogos";
import RoleTabs from "../../components/LandingPage/RoleTabs";
import ProcessSteps from "../../components/LandingPage/ProcessSteps";
import FeatureGrid from "../../components/LandingPage/FeatureGrid";
import PortalCards from "../../components/LandingPage/PortalCards";
import Testimonials from "../../components/LandingPage/Testimonials";
import CtaBanner from "../../components/LandingPage/CtaBanner";
import Footer from "../../components/LandingPage/Footer";

export default function Home() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <TrustedLogos />
      <RoleTabs />
      <ProcessSteps />
      <FeatureGrid />
      <PortalCards />
      <Testimonials />
      <CtaBanner />
      <Footer />
    </div>
  );
}