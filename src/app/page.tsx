import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Career } from "@/components/sections/Career";
import { Highlights } from "@/components/sections/Highlights";
import { Moments } from "@/components/sections/Moments";
import { Interests } from "@/components/sections/Interests";
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
      <Highlights />
      <Moments />
      <Interests />
      <Gallery />
      <Partnerships />
      <Contact />
      <Footer />
    </main>
  );
}
