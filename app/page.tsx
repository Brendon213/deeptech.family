import CookieNotice from "@/components/CookieNotice";
import Footer from "@/components/Footer";
import GraphNetwork from "@/components/GraphNetwork";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import { COOKIE_CHOICE_COOKIE, parseCookieChoice } from "@/lib/site-preferences";
import Challenges from "@/components/sections/Challenges";
import ContactSection from "@/components/sections/ContactSection";
import Contacts from "@/components/sections/Contacts";
import Ecosystem from "@/components/sections/Ecosystem";
import Hero from "@/components/sections/Hero";
import Infrastructure from "@/components/sections/Infrastructure";
import Routes from "@/components/sections/Routes";

export default async function Home() {
  const cookieStore = await cookies();
  const initialCookieChoice = parseCookieChoice(cookieStore.get(COOKIE_CHOICE_COOKIE)?.value);

  return (
    <>
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
      <CookieNotice initialChoice={initialCookieChoice} />
    </>
  );
}
