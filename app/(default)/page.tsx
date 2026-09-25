import { cookies } from "next/headers";
import HomePageContent from "@/components/HomePageContent";
import { COOKIE_CHOICE_COOKIE, parseCookieChoice } from "@/lib/site-preferences";

export default async function Home() {
  const cookieStore = await cookies();
  const initialCookieChoice = parseCookieChoice(cookieStore.get(COOKIE_CHOICE_COOKIE)?.value);

  return <HomePageContent initialCookieChoice={initialCookieChoice} />;
}
