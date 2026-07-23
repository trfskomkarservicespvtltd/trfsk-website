"use client";

// All home components are inside app/components/home/
import Hero from "./components/home/Hero";
import About from "./components/home/About";
import Services from "./components/home/Services";
import WhyChoose from "./components/home/WhyChoose";
import Stats from "./components/home/Stats";
import Testimonials from "./components/home/Testimonials";
import FAQ from "./components/home/FAQ";

// Contact is directly inside app/components/
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyChoose />
      <Stats />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}