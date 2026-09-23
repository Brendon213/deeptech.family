import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Metrics from "@/components/sections/Metrics";
import Challenges from "@/components/sections/Challenges";
import ContactSection from "@/components/sections/ContactSection";
import Ecosystem from "@/components/sections/Ecosystem";
import Routes from "@/components/sections/Routes";
import Infrastructure from "@/components/sections/Infrastructure";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Metrics />
        <Challenges />
        <ContactSection />
        <Ecosystem />
        <Routes />
        <Infrastructure />
      </main>
      <Footer />
    </>
  );
}
