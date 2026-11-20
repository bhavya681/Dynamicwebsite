import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Career } from "@/components/sections/Career";
import { Moments } from "@/components/sections/Moments";
import { Lifestyle } from "@/components/sections/Lifestyle";
import { Gallery } from "@/components/sections/Gallery";
import { Partnerships } from "@/components/sections/Partnerships";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Career />
      <Moments />
      <Lifestyle />
      <Gallery />
      <Partnerships />
      <Contact />
      <Footer />
    </main>
  );
}
