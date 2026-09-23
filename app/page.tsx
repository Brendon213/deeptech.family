import CookieNotice from "@/components/CookieNotice";
import Footer from "@/components/Footer";
import GraphNetwork from "@/components/GraphNetwork";
import Header from "@/components/Header";
import { LanguageProvider } from "@/components/LanguageProvider";
import Challenges from "@/components/sections/Challenges";
import ContactSection from "@/components/sections/ContactSection";
import Contacts from "@/components/sections/Contacts";
import Ecosystem from "@/components/sections/Ecosystem";
import Hero from "@/components/sections/Hero";
import Infrastructure from "@/components/sections/Infrastructure";
import Routes from "@/components/sections/Routes";

export default function Home() {
  return (
    <LanguageProvider>
      <GraphNetwork />
      <Header />
      <main>
        <Hero />
        <Challenges />
        <ContactSection />
        <Ecosystem />
        <Routes />
        <Infrastructure />
        <Contacts />
      </main>
      <Footer />
      <CookieNotice />
    </LanguageProvider>
  );
}
