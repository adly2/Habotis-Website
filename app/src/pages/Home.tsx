import HeroSection from "@/sections/HeroSection";
import MessagesSection from "@/sections/MessagesSection";
import FooterSection from "@/sections/FooterSection";
import FloatingDonation from "@/components/FloatingDonation";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden">
      <HeroSection />
      <MessagesSection />
      <FooterSection />
      <FloatingDonation />
    </main>
  );
}
