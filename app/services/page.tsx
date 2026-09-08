"use client";

import { Metadata } from "next";
import { siteConfig, absoluteUrl } from "@/app/lib/siteConfig";

export const metadata: Metadata = {
  title: "Services | TRFSK - Financial Education & Business Growth",
  description: "Explore TRFSK services including financial education, business partnerships, investment guidance, and professional networking. Structured growth for entrepreneurs and investors.",
  keywords: "TRFSK services, financial education services, business partnership programs, investment guidance, professional networking services, Pune financial services, business growth programs",
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: absoluteUrl("/services") },
  openGraph: {
    title: "TRFSK Services - Financial Education & Growth",
    description: "Discover TRFSK services: financial education, business partnerships, investment guidance, and professional networking.",
    url: absoluteUrl("/services"),
    siteName: "TRFSK",
    locale: "en_IN",
    type: "website",
    images: [{ url: absoluteUrl("/api/og?title=TRFSK%20Services%20-%20Financial%20Education%20%26%20Business%20Growth&description=Discover%20TRFSK%20services%3A%20financial%20education%2C%20business%20partnerships%2C%20investment%20guidance%2C%20and%20professional%20networking."), width: 1200, height: 630 }],
  },
};

import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Globe,
  GraduationCap,
  Handshake,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";

export default function ServicesPage() {
  return (
    <main className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] w-full items-center justify-center pt-24 pb-12">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Our Services
              </span>
              <h1 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Helping Businesses
                <span className="mt-3 block text-blue-500">
                  Learn • Connect • Grow
                </span>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300">
                TRFSK offers financial awareness initiatives, business education,
                strategic networking and collaboration opportunities that empower
                entrepreneurs, professionals and organizations to build stronger
                businesses through knowledge, transparency and long-term relationships.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/contact">
                  <Button>Connect With Us</Button>
                </Link>
                <Link href="/partnerships">
                  <Button variant="secondary">Explore Partnerships</Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                What We Offer
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                Services Designed Around
                <span className="mt-2 block text-blue-500">
                  Education & Collaboration
                </span>
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                Every initiative at TRFSK is designed with one objective — helping
                individuals and businesses make informed decisions while encouraging
                responsible entrepreneurship and sustainable professional relationships.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: BookOpen, title: "Financial Awareness", desc: "Educational initiatives focused on improving financial literacy, planning and responsible decision-making." },
              { icon: Handshake, title: "Business Networking", desc: "Building valuable relationships between entrepreneurs, startups, professionals and organizations." },
              { icon: GraduationCap, title: "Business Education", desc: "Practical learning resources that encourage sustainable growth, innovation and entrepreneurial excellence." },
              { icon: Building2, title: "Strategic Partnerships", desc: "Connecting businesses and professionals through long-term collaboration opportunities." },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1}>
                <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">
                  <div className="mb-5 inline-flex rounded-2xl bg-blue-500/10 p-4">
                    <item.icon className="h-7 w-7 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="mt-4 text-lg leading-8 text-slate-400">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Awareness */}
      <section className="py-20 bg-slate-900/30">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div>
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Financial Awareness
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                Knowledge Creates
                <span className="mt-2 block text-blue-500">
                  Better Decisions
                </span>
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Financial awareness is one of the strongest foundations for personal
                and business success. TRFSK focuses on simplifying financial concepts
                through educational initiatives that encourage responsible and informed
                decision-making.
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                Rather than promoting financial products or investment recommendations,
                our objective is to improve financial understanding so individuals and
                organizations can make their own well-informed choices.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="space-y-6">
              {[
                "Financial Literacy Programs",
                "Business Finance Fundamentals",
                "Budgeting & Planning Awareness",
                "Risk Awareness Education",
                "Long-Term Financial Thinking",
              ].map((item) => (
                <div key={item} className="flex items-start gap-5 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl transition hover:border-blue-500/40">
                  <div className="rounded-xl bg-blue-500/10 p-3">
                    <ShieldCheck className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{item}</h3>
                    <p className="mt-2 text-lg leading-8 text-slate-400">
                      Educational initiatives designed to encourage informed financial
                      understanding and responsible business practices.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[40px] border border-blue-500/20 bg-slate-900/50 p-12 lg:p-20">
              <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
              <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
              <div className="relative text-center">
                <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                  Start Your Journey
                </span>
                <h2 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                  Let's Grow
                  <span className="mt-3 block text-blue-500">
                    Together
                  </span>
                </h2>
                <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                  Whether you're a student, entrepreneur, startup, consultant or
                  business owner, TRFSK welcomes you to become part of a growing
                  ecosystem built around education, collaboration and responsible
                  business development.
                </p>
                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link href="/contact">
                    <Button>
                      Connect With Us
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="secondary">Learn More</Button>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}