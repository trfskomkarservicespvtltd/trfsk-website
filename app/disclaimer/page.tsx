"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  ShieldAlert,
  Scale,
} from "lucide-react";

import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";

export default function DisclaimerPage() {
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
      {/* HERO SECTION */}
      {/* ================================================= */}
      <section className="relative flex min-h-[60vh] w-full items-center justify-center pt-24 pb-12">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <span className="inline-flex rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-400">
                Website Disclaimer
              </span>
              <h1 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Important
                <span className="mt-3 block text-amber-500">
                  Legal Disclaimer
                </span>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300">
                Please read this Disclaimer carefully before using the
                TRFSK website. By accessing this website, you
                acknowledge that you understand and agree to the
                limitations described below.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/terms">
                  <Button>
                    Terms & Conditions
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/privacy-policy">
                  <Button variant="secondary">
                    Privacy Policy
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================= */}
      {/* GENERAL DISCLAIMER */}
      {/* ================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[40px] border border-amber-500/20 bg-amber-500/5 p-10 lg:p-16 backdrop-blur-xl">
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                <div className="rounded-2xl bg-amber-500/10 p-4 shrink-0">
                  <AlertTriangle className="h-10 w-10 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold sm:text-4xl">
                    General Disclaimer
                  </h2>
                </div>
              </div>
              <p className="mt-8 text-lg leading-8 text-slate-300">
                All information, educational articles, resources,
                opinions, discussions and materials published on the
                TRFSK website are provided solely for general
                educational and informational purposes.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-400">
                The content should not be interpreted as professional
                financial advice, investment advice, legal advice,
                accounting advice, taxation advice, portfolio
                management, research recommendations or any regulated
                financial service.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================= */}
      {/* EDUCATIONAL PURPOSE */}
      {/* ================================================= */}
      <section className="py-20 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Educational Purpose
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                Why TRFSK Exists
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                TRFSK is built to promote financial awareness,
                entrepreneurship, business education and professional
                networking.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { icon: BookOpen, title: "Education", text: "We simplify financial concepts so individuals and businesses can better understand them." },
              { icon: Scale, title: "Awareness", text: "Our objective is to encourage informed thinking—not provide regulated financial advice." },
              { icon: ShieldAlert, title: "Responsibility", text: "Users remain fully responsible for their own financial, investment and business decisions." },
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
      {/* NO INVESTMENT ADVICE */}
      {/* ================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-400">
                No Investment Advice
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                Educational Information Only
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                Nothing available on TRFSK should be interpreted as
                personalized investment, financial or legal advice.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/40">
                <h3 className="text-2xl font-bold">TRFSK Does Not Provide</h3>
                <div className="mt-8 space-y-4">
                  {[
                    "Investment recommendations",
                    "Buy / Sell / Hold advice",
                    "Stock recommendations",
                    "Mutual fund recommendations",
                    "Portfolio management",
                    "Financial planning services",
                    "Research reports",
                    "Tax planning advice",
                    "Legal advice",
                    "Wealth management services",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-amber-400" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-amber-500/20 bg-amber-500/5 p-10 backdrop-blur-xl transition-all duration-300">
                <h3 className="text-2xl font-bold">Always Consult Professionals</h3>
                <p className="mt-6 leading-8 text-slate-300">
                  Before making any financial, investment, taxation,
                  legal or business decision, users should seek advice
                  from appropriately qualified and licensed
                  professionals.
                </p>
                <p className="mt-6 leading-8 text-slate-400">
                  Every financial decision carries risk, and decisions
                  should never be based solely upon information
                  available on this website.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* REGULATORY STATUS */}
      {/* ================================================= */}
      <section className="py-20 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[40px] border border-red-500/20 bg-red-500/5 p-10 lg:p-16 backdrop-blur-xl">
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Regulatory Status
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                TRFSK is an educational and business networking platform.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                TRFSK is <strong>not registered</strong> with the
                Securities and Exchange Board of India (SEBI), the
                Reserve Bank of India (RBI), Insurance Regulatory and
                Development Authority of India (IRDAI), Pension Fund
                Regulatory and Development Authority (PFRDA), or any
                other financial regulatory authority as:
              </p>
              <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  "Investment Adviser",
                  "Research Analyst",
                  "Portfolio Manager",
                  "Stock Broker",
                  "Mutual Fund Distributor",
                  "NBFC",
                  "Banking Institution",
                  "Insurance Intermediary",
                  "Wealth Manager",
                  "Financial Planner",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition-all hover:border-red-500/40"
                  >
                    <ShieldAlert className="h-5 w-5 shrink-0 text-red-400" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================= */}
      {/* ACCURACY & INDEPENDENT DECISION MAKING */}
      {/* ================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40">
                <h3 className="text-2xl font-bold">Accuracy of Information</h3>
                <p className="mt-6 leading-8 text-slate-400">
                  While TRFSK makes reasonable efforts to provide
                  reliable educational information, we do not warrant
                  or guarantee the completeness, accuracy,
                  timeliness or reliability of any content published on
                  this website. Information may change without prior notice.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40">
                <h3 className="text-2xl font-bold">Independent Decision Making</h3>
                <p className="mt-6 leading-8 text-slate-400">
                  Users are solely responsible for independently
                  evaluating any information obtained through TRFSK
                  before acting upon it. Any reliance placed upon website 
                  content is entirely at the user's own discretion and risk.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* WARRANTIES & THIRD-PARTY CONTENT */}
      {/* ================================================= */}
      <section className="py-20 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40">
                <h3 className="text-2xl font-bold">No Guarantees or Warranties</h3>
                <p className="mt-6 leading-8 text-slate-400">
                  TRFSK makes no representations or warranties regarding
                  future outcomes, financial performance, investment
                  returns, business success, profitability or any
                  expected results arising from information presented on
                  this website.
                </p>
                <p className="mt-4 leading-8 text-slate-400">
                  Educational examples, discussions and illustrations are
                  provided solely for learning purposes and should never
                  be interpreted as assurances or promises of future
                  performance.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40">
                <h3 className="text-2xl font-bold">External Websites & Resources</h3>
                <p className="mt-6 leading-8 text-slate-400">
                  Our website may reference or provide links to external
                  websites, publicly available resources or third-party
                  platforms for educational convenience. 
                </p>
                <p className="mt-4 leading-8 text-slate-400">
                  Links to third-party websites do not constitute an
                  endorsement. TRFSK is not responsible for the availability,
                  security, accuracy, reliability or completeness of
                  information published by third-party websites.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* MISCELLANEOUS LEGAL SECTIONS */}
      {/* ================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl">
                <h3 className="text-2xl font-bold">Business Relationships</h3>
                <p className="mt-4 leading-8 text-slate-400">
                  References to businesses, professionals, organizations, products or services appearing on TRFSK are provided for informational or networking purposes only. Unless explicitly stated, such references should not be interpreted as endorsements, guarantees, certifications or recommendations.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl">
                <h3 className="text-2xl font-bold">Testimonials & Examples</h3>
                <p className="mt-4 leading-8 text-slate-400">
                  Testimonials, reviews or user experiences displayed represent personal opinions. Individual experiences may differ and do not represent typical results. Any numerical examples, illustrations, or case studies are solely for educational purposes.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl">
                <h3 className="text-2xl font-bold">Forward-Looking Statements</h3>
                <p className="mt-4 leading-8 text-slate-400">
                  Certain content published by TRFSK may include discussions regarding future plans, expectations, objectives or possibilities. Such statements are inherently uncertain and should not be relied upon as assurances or predictions of future events or performance.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl">
                <h3 className="text-2xl font-bold">Limitation of Liability</h3>
                <p className="mt-4 leading-8 text-slate-400">
                  To the maximum extent permitted by applicable law, TRFSK shall not be liable for any direct, indirect, incidental, consequential, punitive or special losses arising from the use of this website or reliance on its content.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* FINAL COMPLIANCE NOTICE & CTA */}
      {/* ================================================= */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mb-12 rounded-[40px] border border-amber-500/20 bg-amber-500/5 p-10 lg:p-16 backdrop-blur-xl">
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                <div className="rounded-2xl bg-amber-500/10 p-4 shrink-0">
                  <AlertTriangle className="h-10 w-10 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold sm:text-4xl">
                    Final Compliance Notice
                  </h2>
                </div>
              </div>
              <p className="mt-8 text-lg leading-8 text-slate-300">
                TRFSK is committed to promoting financial literacy,
                entrepreneurship, business education and
                professional networking in a responsible and ethical
                manner.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-400">
                No information published on this website should ever
                be considered a substitute for advice provided by
                licensed financial advisers, legal professionals,
                chartered accountants, tax consultants or any other
                regulated professionals.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-400">
                Users are strongly encouraged to perform
                independent research and seek professional advice
                before making any financial, investment or business
                decisions.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="relative overflow-hidden rounded-[40px] border border-blue-500/20 bg-slate-900/50 p-12 lg:p-20">
              <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
              <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative text-center">
                <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                  Education • Responsibility • Transparency
                </span>
                <h2 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                  Learn Responsibly.
                  <span className="mt-3 block text-blue-500">
                    Grow Confidently.
                  </span>
                </h2>
                <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                  TRFSK believes that informed individuals build
                  stronger businesses and stronger communities. Our
                  mission is to promote awareness, responsible
                  entrepreneurship and ethical business practices
                  through accessible educational content.
                </p>
                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link href="/knowledge-center">
                    <Button>
                      Explore Knowledge Center
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="secondary">Contact Our Team</Button>
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