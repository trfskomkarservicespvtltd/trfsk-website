"use client";

import { Metadata } from "next";
import { siteConfig, absoluteUrl } from "@/app/lib/siteConfig";

export const metadata: Metadata = {
  title: "Knowledge Center - Financial Education Resources | TRFSK",
  description: "Access TRFSK's knowledge center with articles, guides, and resources on financial literacy, business strategy, and investment education.",
  keywords: "knowledge center, financial education resources, business guides, investment education, financial literacy articles, entrepreneurship resources, TRFSK learning",
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: absoluteUrl("/knowledge-center") },
  openGraph: {
    title: "Knowledge Center - Financial Education Resources",
    description: "Access TRFSK's knowledge center with articles, guides, and resources on financial literacy and business strategy.",
    url: absoluteUrl("/knowledge-center"),
    siteName: "TRFSK",
    locale: "en_IN",
    type: "website",
    images: [{ url: absoluteUrl("/api/og?title=Knowledge%20Center%20-%20Financial%20Education%20Resources&description=Access%20TRFSK%20knowledge%20center%20with%20articles%2C%20guides%2C%20and%20resources%20on%20financial%20literacy%20and%20business%20strategy."), width: 1200, height: 630 }],
  },
};

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Download,
  GraduationCap,
  Lightbulb,
  Mail,
  Newspaper,
  PlayCircle,
  Users,
} from "lucide-react";

import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";

export default function KnowledgeCenterPage() {
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
                Knowledge Center
              </span>
              <h1 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Learn.
                <span className="mt-3 block text-blue-500">
                  Improve.
                </span>
                Grow.
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300">
                Discover educational articles, financial awareness resources,
                entrepreneurship insights and business knowledge designed to help
                individuals and organizations make informed decisions.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/contact">
                  <Button>Join Community</Button>
                </Link>
                <Link href="/services">
                  <Button variant="secondary">Explore Services</Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Learning Categories
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                Everything You Need
                <span className="mt-2 block text-blue-500">In One Place</span>
              </h2>
            </div>
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: BookOpen, title: "Financial Awareness" },
              { icon: GraduationCap, title: "Business Education" },
              { icon: Lightbulb, title: "Entrepreneurship" },
              { icon: Users, title: "Professional Growth" },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1}>
                <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10">
                    <item.icon className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-4 text-lg leading-8 text-slate-400">
                    Premium educational resources designed to encourage continuous
                    learning and responsible business growth.
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Featured Resources
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                Learn From
                <span className="mt-2 block text-blue-500">
                  Trusted Educational Content
                </span>
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                Our knowledge resources are created to improve financial
                awareness, strengthen business understanding and encourage
                responsible entrepreneurship.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {[
              { icon: BookOpen, title: "Financial Awareness Guide", desc: "Understand budgeting, financial discipline, money management and responsible financial planning through practical educational articles." },
              { icon: GraduationCap, title: "Business Education", desc: "Learn business fundamentals, operational thinking, strategic planning and professional development for sustainable growth." },
              { icon: Lightbulb, title: "Entrepreneurship", desc: "Explore entrepreneurial mindset, leadership principles, innovation and long-term business building practices." },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1}>
                <div className="group h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10">
                  <div className="mb-6 inline-flex rounded-2xl bg-blue-500/10 p-4 transition group-hover:bg-blue-500/20">
                    <item.icon className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="mt-4 text-lg leading-8 text-slate-400">{item.desc}</p>
                  <div className="mt-10">
                    <button className="inline-flex items-center text-blue-400 transition hover:text-blue-300 font-medium">
                      Read More
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
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
                  Continue Learning
                </span>
                <h2 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                  Knowledge Creates
                  <span className="mt-3 block text-blue-500">
                    Better Decisions
                  </span>
                </h2>
                <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                  Every article, guide and educational resource at TRFSK is
                  designed to encourage financial awareness, ethical
                  entrepreneurship and meaningful business growth through
                  responsible knowledge sharing.
                </p>
                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link href="/contact">
                    <Button>
                      Contact Our Team
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button variant="secondary">Explore Services</Button>
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