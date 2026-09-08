"use client";

import { Metadata } from "next";
import { siteConfig, absoluteUrl } from "@/app/lib/siteConfig";

export const metadata: Metadata = {
  title: "Partnerships | TRFSK - Business Partnership Programs",
  description: "Explore TRFSK partnership programs for entrepreneurs, investors, and businesses. Join our network for growth, collaboration, and financial opportunities.",
  keywords: "TRFSK partnerships, business partnership programs, partner with TRFSK, business collaboration, financial partnerships, entrepreneur network, investor partnerships",
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: absoluteUrl("/partnerships") },
  openGraph: {
    title: "Partnerships - Business Partnership Programs | TRFSK",
    description: "Explore TRFSK partnership programs for entrepreneurs, investors, and businesses. Join our network for growth, collaboration, and financial opportunities.",
    url: absoluteUrl("/partnerships"),
    siteName: "TRFSK",
    locale: "en_IN",
    type: "website",
    images: [{ url: absoluteUrl("/api/og?title=Partnerships%20-%20Business%20Partnership%20Programs&description=Explore%20TRFSK%20partnership%20programs%20for%20entrepreneurs%2C%20investors%2C%20and%20businesses."), width: 1200, height: 630 }],
  },
};

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Globe,
  GraduationCap,
  Handshake,
  Lightbulb,
  Network,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";

export default function PartnershipsPage() {
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
                Partnerships
              </span>
              <h1 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Build Stronger Businesses
                <span className="mt-3 block text-blue-500">
                  Through Strategic Collaboration
                </span>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300">
                TRFSK believes that long-term success is created through
                meaningful collaboration. We connect entrepreneurs,
                professionals, educators, organizations and businesses
                through knowledge sharing, financial awareness,
                responsible entrepreneurship and strategic partnerships.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/contact">
                  <Button>
                    Become a Partner
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="secondary">
                    Learn About TRFSK
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Why Partner With TRFSK
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                Partnerships Built On
                <span className="mt-2 block text-blue-500">
                  Trust, Education & Growth
                </span>
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                We focus on creating mutually beneficial relationships
                where organizations collaborate to educate,
                innovate and contribute toward a stronger business
                ecosystem.
              </p>
            </div>
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: Handshake, title: "Collaboration", text: "Long-term professional relationships built on transparency, ethics and mutual respect." },
              { icon: GraduationCap, title: "Education", text: "Sharing practical knowledge that promotes responsible financial awareness and business learning." },
              { icon: Network, title: "Networking", text: "Connecting entrepreneurs, professionals, businesses and communities." },
              { icon: Sparkles, title: "Innovation", text: "Encouraging new ideas, sustainable business models and collaborative opportunities." },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1}>
                <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">
                  <div className="mb-6 inline-flex rounded-2xl bg-blue-500/10 p-4">
                    <item.icon className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="mt-4 text-lg leading-8 text-slate-400">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="py-20 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Partnership Models
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                Collaboration Opportunities
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                Every organization has different goals.
                TRFSK supports multiple partnership models
                designed around education, professional networking and ecosystem development.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {[
              { icon: GraduationCap, title: "Educational Partner", text: "Universities, institutions, trainers, educators, financial literacy initiatives and knowledge partners who wish to create awareness through educational collaboration." },
              { icon: Building2, title: "Corporate Partner", text: "Businesses, startups, MSMEs and corporate organizations looking to collaborate through education, networking, innovation and ecosystem growth." },
              { icon: Users, title: "Community Partner", text: "Community builders, professional associations, business groups and networking communities that believe in knowledge sharing, collaboration and responsible business development." },
              { icon: BriefcaseBusiness, title: "Strategic Partner", text: "Organizations seeking long-term strategic collaboration through education, innovation, events, ecosystem building, professional networking and business growth." },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1}>
                <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10">
                  <div className="mb-6 inline-flex rounded-2xl bg-blue-500/10 p-4">
                    <item.icon className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-3xl font-bold">{item.title}</h3>
                  <p className="mt-6 text-lg leading-8 text-slate-400">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
                  Build The Future Together
                </span>
                <h2 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                  Let's Create Meaningful
                  <span className="mt-3 block text-blue-500">
                    Partnerships
                  </span>
                </h2>
                <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                  We believe meaningful collaborations create stronger
                  businesses, more informed entrepreneurs and healthier
                  professional ecosystems.
                  <br className="hidden md:block mt-2" />
                  Whether you represent an organization, institution,
                  startup, business community or educational initiative,
                  we'd love to explore opportunities to work together.
                </p>
                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link href="/contact">
                    <Button>
                      Become a Partner
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button variant="secondary">Explore Our Services</Button>
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