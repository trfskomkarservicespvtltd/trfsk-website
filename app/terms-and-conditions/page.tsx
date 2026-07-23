"use client";

import Link from "next/link";
import {
  ArrowRight,
  FileCheck,
  Scale,
  Shield,
  BookOpen,
} from "lucide-react";

import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";

export default function TermsPage() {
  return (
    <main className="relative overflow-hidden bg-slate-950 text-white">
      {/* ================================================= */}
      {/* BACKGROUND EFFECTS */}
      {/* ================================================= */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}
      <section className="relative flex min-h-[60vh] w-full items-center justify-center pt-24 pb-12">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Terms & Conditions
              </span>
              <h1 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Website
                <span className="mt-3 block text-blue-500">
                  Terms of Use
                </span>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300">
                These Terms & Conditions govern your access to and use
                of the TRFSK website. By accessing this website, you
                agree to comply with these terms and all applicable
                laws and regulations.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/privacy-policy">
                  <Button>
                    Privacy Policy
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="secondary">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================= */}
      {/* INTRODUCTION */}
      {/* ================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[40px] border border-slate-800 bg-slate-900/70 p-10 lg:p-16 backdrop-blur-xl">
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                <div className="rounded-2xl bg-blue-500/10 p-4 shrink-0">
                  <FileCheck className="h-10 w-10 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold sm:text-4xl">
                    Agreement
                  </h2>
                </div>
              </div>
              <p className="mt-8 text-lg leading-8 text-slate-300">
                These Terms & Conditions constitute a legally binding
                agreement between you and TRFSK governing your access
                to and use of this website.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-400">
                If you do not agree with these Terms, you should
                discontinue use of the website immediately.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { icon: Scale, title: "Fair Usage", text: "The website must be used responsibly, ethically and in accordance with applicable laws." },
              { icon: Shield, title: "Compliance", text: "Users agree to respect all website policies and avoid activities that may interfere with website security." },
              { icon: BookOpen, title: "Educational Purpose", text: "TRFSK provides educational and informational content intended to improve financial awareness and business understanding." },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1}>
                <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">
                  <div className="mb-6 inline-flex rounded-2xl bg-blue-500/10 p-4">
                    <item.icon className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="mt-4 leading-8 text-slate-400">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* ACCEPTANCE */}
      {/* ================================================= */}
      <section className="py-20 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[40px] border border-slate-800 bg-slate-900/70 p-10 lg:p-16 backdrop-blur-xl text-center">
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Acceptance of Terms
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                By visiting, browsing or using this website, you
                acknowledge that you have read, understood and agreed
                to be bound by these Terms & Conditions together with
                our Privacy Policy and Disclaimer.
              </p>
              <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-400">
                Continued use of this website constitutes acceptance of
                any future updates made to these Terms.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================= */}
      {/* WEBSITE USAGE */}
      {/* ================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Website Usage
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                Appropriate Use of TRFSK
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                Users are expected to use this website responsibly and
                in accordance with applicable laws, ethical standards
                and these Terms & Conditions.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40">
                <h3 className="text-2xl font-bold">You May</h3>
                <div className="mt-8 space-y-4">
                  {[
                    "Access educational resources published by TRFSK.",
                    "Browse publicly available website content.",
                    "Contact our team for genuine enquiries.",
                    "Share website content using proper attribution where permitted.",
                    "Use the website for lawful educational and informational purposes.",
                    "Participate respectfully in communication with TRFSK.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Shield className="mt-1 h-5 w-5 shrink-0 text-blue-400" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40">
                <h3 className="text-2xl font-bold">You Must Not</h3>
                <div className="mt-8 space-y-4">
                  {[
                    "Attempt unauthorized access to our systems.",
                    "Disrupt website functionality.",
                    "Transmit malicious software or harmful code.",
                    "Copy website content without permission where restricted.",
                    "Use the website for unlawful activities.",
                    "Misrepresent your identity while communicating with TRFSK.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Shield className="mt-1 h-5 w-5 shrink-0 text-red-400" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* USER RESPONSIBILITIES */}
      {/* ================================================= */}
      <section className="py-20 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[40px] border border-slate-800 bg-slate-900/70 p-10 lg:p-16 backdrop-blur-xl">
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                User Responsibilities
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Every visitor is responsible for ensuring that their
                use of the website complies with these Terms and all
                applicable laws.
              </p>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {[
                  "Provide accurate information when contacting us.",
                  "Maintain respectful communication.",
                  "Avoid misuse of educational content.",
                  "Respect intellectual property rights.",
                  "Keep your own devices secure while accessing the website.",
                  "Review updates to these Terms periodically.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-3xl border border-slate-800 bg-slate-950/50 p-6 transition-all hover:border-blue-500/40"
                  >
                    <FileCheck className="mt-1 h-6 w-6 shrink-0 text-blue-400" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================= */}
      {/* PROHIBITED ACTIVITIES */}
      {/* ================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Prohibited Activities
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                Activities Not Permitted
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[
              { title: "Cyber Abuse", description: "Attempting to compromise website security, servers or networks." },
              { title: "Fraud", description: "Providing false information or impersonating another individual or organisation." },
              { title: "Spam", description: "Sending unsolicited promotional or harmful communications through our contact channels." },
              { title: "Copyright Violations", description: "Using protected content without authorization where required." },
              { title: "Illegal Activities", description: "Using the website to facilitate unlawful conduct or prohibited transactions." },
              { title: "Interference", description: "Attempting to interrupt or degrade website availability for other users." },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-4 leading-8 text-slate-400">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* INTELLECTUAL PROPERTY */}
      {/* ================================================= */}
      <section className="py-20 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Intellectual Property
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                Ownership of Website Content
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                Unless otherwise stated, the content available on the
                TRFSK website is owned by TRFSK or used with
                appropriate permission and is protected by applicable
                intellectual property laws.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40">
                <h3 className="text-2xl font-bold">Protected Content</h3>
                <div className="mt-8 space-y-4">
                  {[
                    "Website design and layout",
                    "Educational articles",
                    "Business resources",
                    "Graphics and visual assets",
                    "Logos and branding",
                    "Original written content",
                    "Website source code where applicable",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Shield className="mt-1 h-5 w-5 shrink-0 text-blue-400" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40">
                <h3 className="text-2xl font-bold">Restrictions</h3>
                <p className="mt-6 text-lg leading-8 text-slate-400">
                  You may not reproduce, distribute, modify,
                  republish, commercially exploit or create derivative
                  works from TRFSK content without prior written
                  permission, except where permitted by law.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* LEGAL / MISC SECTIONS */}
      {/* ================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl">
                <h3 className="text-2xl font-bold">Third-Party Websites</h3>
                <p className="mt-4 leading-8 text-slate-400">
                  TRFSK may provide links to third-party websites, resources or platforms solely for informational or educational convenience. We do not control or endorse third-party content and are not responsible for the availability, accuracy, privacy practices or services offered by external websites.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl">
                <h3 className="text-2xl font-bold">No Professional Advice</h3>
                <p className="mt-4 leading-8 text-slate-400">
                  All information available on TRFSK is intended solely for educational and informational purposes. Nothing published constitutes investment, financial, legal, tax, or accounting advice. Users should seek guidance from appropriately licensed professionals before making decisions.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl">
                <h3 className="text-2xl font-bold">Limitation of Liability</h3>
                <p className="mt-4 leading-8 text-slate-400">
                  To the fullest extent permitted by applicable law, TRFSK shall not be liable for any direct, indirect, incidental, consequential or special damages arising from the use of or inability to use this website.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl">
                <h3 className="text-2xl font-bold">Indemnification</h3>
                <p className="mt-4 leading-8 text-slate-400">
                  You agree to indemnify and hold harmless TRFSK, its owners, affiliates, partners and representatives from any claims, liabilities, losses, damages, expenses or legal costs arising from your misuse of this website, violation of these Terms or infringement of applicable laws or third-party rights.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl">
                <h3 className="text-2xl font-bold">Governing Law</h3>
                <p className="mt-4 leading-8 text-slate-400">
                  These Terms & Conditions shall be governed and interpreted in accordance with the laws of the Republic of India. Any disputes arising out of or relating to the use of this website shall be subject to the jurisdiction of the competent courts having authority under applicable Indian law.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl">
                <h3 className="text-2xl font-bold">Changes To These Terms</h3>
                <p className="mt-4 leading-8 text-slate-400">
                  TRFSK reserves the right to modify, update or replace these Terms & Conditions at any time to reflect legal, operational or business changes. Updated versions become effective immediately upon publication unless otherwise specified.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* FINAL CTA */}
      {/* ================================================= */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[40px] border border-blue-500/20 bg-slate-900/50 p-12 lg:p-20">
              {/* Background Glow */}
              <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
              <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative text-center">
                <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                  Responsible Use • Transparency • Compliance
                </span>
                <h2 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                  Building Trust
                  <span className="mt-3 block text-blue-500">
                    Through Responsible Use
                  </span>
                </h2>
                <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                  TRFSK is committed to maintaining a secure,
                  transparent and educational platform where
                  entrepreneurs, professionals and learners can access
                  reliable information while respecting applicable laws,
                  ethical standards and responsible digital practices.
                </p>

                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link href="/contact">
                    <Button>
                      Contact Our Team
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/privacy-policy">
                    <Button variant="secondary">Privacy Policy</Button>
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