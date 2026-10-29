import About from "@/components/About";
import Events from "@/components/Events";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HodsDesk from "@/components/HodsDesk";
import Marquee from "@/components/Marquee";
import Pillars from "@/components/Pillars";
import Register from "@/components/Register";
import ScrollFx from "@/components/ScrollFx";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-foreground focus:px-5 focus:py-3 focus:text-sm focus:text-chalk"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <HodsDesk />
        <Pillars />
        <Events />
        <Gallery />
        <Register />
      </main>
      <Footer />
      <div aria-hidden="true" className="grain-overlay"></div>
      <ScrollFx />
    </div>
  );
}
