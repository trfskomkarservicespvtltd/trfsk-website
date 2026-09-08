"use client";

import { Metadata } from "next";
import { siteConfig, absoluteUrl } from "@/app/lib/siteConfig";

export const metadata: Metadata = {
  title: "About Us | TRFSK - Financial Awareness & Business Education",
  description: "Learn about TRFSK's mission to promote financial awareness, entrepreneurship, and business education in Pune. Discover our team, values, and commitment to empowering professionals.",
  keywords: "about TRFSK, TRFSK team, financial education Pune, business education company, TRFSK mission, entrepreneurship support, professional networking organization",
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: absoluteUrl("/about") },
  openGraph: {
    title: "About TRFSK - Our Mission & Team",
    description: "TRFSK is committed to building financial awareness and business education that empowers entrepreneurs and professionals.",
    url: absoluteUrl("/about"),
    siteName: "TRFSK",
    locale: "en_IN",
    type: "website",
  },
};

import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Building2,
  Globe,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";

export default function AboutPage() {
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
                About TRFSK
              </span>
              <h1 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Building
                <span className="mt-3 block text-blue-500">
                  Financial Awareness
                </span>
                for a Better Tomorrow
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300">
                TRFSK is committed to creating an ecosystem where
                entrepreneurs, professionals, businesses and learners
                connect through education, collaboration and meaningful
                partnerships that encourage sustainable long-term growth.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/contact">
                  <Button>Connect With Us</Button>
                </Link>
                <Link href="/services">
                  <Button variant="secondary">Explore Services</Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div>
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Who We Are
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                Empowering Businesses Through
                <span className="mt-2 block text-blue-500">
                  Knowledge & Collaboration
                </span>
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                TRFSK was established with a simple yet powerful vision —
                to make financial knowledge accessible, practical and useful
                for everyone while encouraging meaningful business
                relationships built on trust, transparency and long-term
                collaboration.
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                We believe that informed decisions create stronger
                entrepreneurs, healthier businesses and sustainable
                communities. By combining education with professional
                networking, TRFSK helps individuals and organizations
                discover opportunities that extend beyond traditional
                business relationships.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid gap-6">
              {[
                { icon: BookOpen, title: "Financial Awareness", desc: "Simplifying finance through educational resources, practical insights and responsible knowledge sharing." },
                { icon: Handshake, title: "Professional Networking", desc: "Creating valuable relationships between entrepreneurs, professionals, startups and organizations." },
                { icon: TrendingUp, title: "Business Growth", desc: "Encouraging sustainable business development through education, collaboration, innovation and strategic partnerships." }
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">
                  <div className="mb-5 inline-flex rounded-2xl bg-blue-500/10 p-4">
                    <item.icon className="h-7 w-7 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="mt-4 text-lg leading-8 text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Our Purpose
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                Guiding Every Decision
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                Everything we build at TRFSK is driven by a long-term vision
                of creating financially aware communities and stronger
                business ecosystems.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="mb-6 inline-flex rounded-2xl bg-blue-500/10 p-4">
                  <Target className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-3xl font-bold">Our Vision</h3>
                <p className="mt-6 text-lg leading-8 text-slate-300">
                  To become one of India's most trusted platforms for
                  financial awareness, entrepreneurship, business
                  education and professional networking, empowering
                  individuals and organizations to make informed,
                  ethical and sustainable business decisions.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="mb-6 inline-flex rounded-2xl bg-blue-500/10 p-4">
                  <Globe className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-3xl font-bold">Our Mission</h3>
                <p className="mt-6 text-lg leading-8 text-slate-300">
                  To simplify financial and business knowledge, encourage
                  responsible entrepreneurship, strengthen professional
                  relationships and create opportunities for sustainable
                  collaboration through education, transparency and
                  innovation.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Our Values
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                Principles That Define TRFSK
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: ShieldCheck, title: "Integrity", text: "Building trust through transparency, ethics and responsible business practices." },
              { icon: Lightbulb, title: "Innovation", text: "Encouraging creative thinking, continuous learning and modern business solutions." },
              { icon: Users, title: "Collaboration", text: "Strong businesses are built through meaningful partnerships and collective growth." },
              { icon: Award, title: "Excellence", text: "Delivering quality experiences while continuously improving every aspect of our platform." },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1}>
                <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10">
                    <item.icon className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-4 text-lg leading-8 text-slate-400">{item.text}</p>
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
                  Join Our Journey
                </span>
                <h2 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                  Let's Build the Future
                  <span className="mt-3 block text-blue-500">
                    Together
                  </span>
                </h2>
                <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                  Whether you're an entrepreneur, professional, startup,
                  business owner or learner, TRFSK welcomes you to become
                  part of a growing ecosystem focused on financial
                  awareness, responsible entrepreneurship and meaningful
                  business collaboration.
                </p>
                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link href="/contact">
                    <Button>
                      Connect With Us
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