"use client";

import Link from "next/link";
import {
  ArrowRight,
  Eye,
  FileText,
  Lock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";

export default function PrivacyPolicyPage() {
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
                Privacy Policy
              </span>
              <h1 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Your Privacy
                <span className="mt-3 block text-blue-500">
                  Matters To Us
                </span>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300">
                TRFSK respects your privacy and is committed to
                protecting your personal information. This Privacy
                Policy explains what information we collect, how it is
                used and how we safeguard it while you use our website
                and services.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/contact">
                  <Button>
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/terms">
                  <Button variant="secondary">
                    Terms & Conditions
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
                  <ShieldCheck className="h-10 w-10 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-extrabold sm:text-4xl">
                    Commitment To Privacy
                  </h2>
                </div>
              </div>
              <p className="mt-8 text-lg leading-8 text-slate-300">
                TRFSK is committed to maintaining the confidentiality,
                integrity and security of personal information shared by
                visitors, users, subscribers and business partners.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-400">
                By accessing this website, you acknowledge that you have
                read and understood this Privacy Policy and consent to
                the practices described herein.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { icon: Lock, title: "Secure", text: "We apply reasonable security measures to help protect personal information against unauthorized access." },
              { icon: Eye, title: "Transparent", text: "We clearly explain how information is collected, stored and used throughout this policy." },
              { icon: FileText, title: "Responsible", text: "Information collected through TRFSK is used only for legitimate educational, communication and operational purposes." },
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
      {/* INFORMATION WE COLLECT */}
      {/* ================================================= */}
      <section className="py-20 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Information Collection
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                What Information We Collect
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                Depending upon how you interact with TRFSK, we may
                collect certain information to improve our services,
                communicate with you and maintain website security.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40">
                <h3 className="text-2xl font-bold">Information You Provide</h3>
                <p className="mt-4 leading-8 text-slate-400">
                  You may voluntarily provide information when you:
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    "Submit the contact form",
                    "Send us an email",
                    "Request information",
                    "Subscribe to updates",
                    "Participate in educational activities",
                    "Communicate with our team",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-400" />
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40">
                <h3 className="text-2xl font-bold">Technical Information</h3>
                <p className="mt-4 leading-8 text-slate-400">
                  Like most modern websites, certain technical
                  information may be collected automatically, including:
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    "Browser type",
                    "Operating system",
                    "Device information",
                    "Pages visited",
                    "Time spent on pages",
                    "IP address (where applicable)",
                    "Referral sources",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-blue-400" />
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
      {/* HOW INFORMATION IS USED */}
      {/* ================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                How We Use Information
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                Purpose of Information Collection
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[
              { title: "Communication", description: "Responding to enquiries, requests and communication submitted through our website." },
              { title: "Educational Services", description: "Providing educational resources, updates and information related to TRFSK activities." },
              { title: "Website Improvement", description: "Understanding visitor behaviour to improve website usability and user experience." },
              { title: "Security", description: "Protecting our website against misuse, fraud, spam and malicious activities." },
              { title: "Legal Compliance", description: "Complying with applicable legal obligations where required." },
              { title: "Operational Purposes", description: "Managing internal administration and maintaining website functionality." },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">
                  <div className="mb-6 h-2 w-16 rounded-full bg-blue-500" />
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-4 leading-8 text-slate-400">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* DATA SHARING & COOKIES */}
      {/* ================================================= */}
      <section className="py-20 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Data Sharing
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                How We Share Information
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                TRFSK values your privacy. We do not sell, rent or
                commercially trade your personal information to third parties.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40">
                <h3 className="text-2xl font-bold">Information May Be Shared</h3>
                <p className="mt-4 leading-8 text-slate-400">
                  Personal information may be disclosed only where
                  reasonably necessary for legitimate operational or
                  legal purposes.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    "With trusted technology service providers supporting website operations.",
                    "Where required by applicable law or government authorities.",
                    "To protect legal rights, website security or user safety.",
                    "With your explicit consent where appropriate.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-blue-400" />
                      <p className="text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40">
                <h3 className="text-2xl font-bold">We Do Not</h3>
                <div className="mt-8 space-y-4">
                  {[
                    "Sell personal information.",
                    "Share personal data for advertising purposes.",
                    "Provide user databases to third parties.",
                    "Disclose confidential information without lawful justification.",
                    "Use information for unrelated commercial activities.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Lock className="mt-1 h-5 w-5 shrink-0 text-blue-400" />
                      <p className="text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 lg:p-12">
              <h3 className="text-2xl font-bold">Cookies & Similar Technologies</h3>
              <p className="mt-4 leading-8 text-slate-300">
                TRFSK may use cookies and similar technologies to improve website functionality, remember user preferences, analyse website traffic and enhance the overall browsing experience.
              </p>
              <p className="mt-4 leading-8 text-slate-400">
                Most web browsers allow users to control or disable cookies through browser settings. Please note that disabling cookies may affect certain website features.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================= */}
      {/* DATA RETENTION & SECURITY & THIRD-PARTY */}
      {/* ================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40">
                <h3 className="text-2xl font-bold">Data Retention</h3>
                <p className="mt-4 leading-8 text-slate-400">
                  Personal information is retained only for as long as necessary to fulfil legitimate operational, communication or legal purposes.
                </p>
                <p className="mt-4 leading-8 text-slate-400">
                  Once information is no longer required, reasonable efforts are made to securely delete or anonymize it.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40">
                <h3 className="text-2xl font-bold">Information Security</h3>
                <p className="mt-4 leading-8 text-slate-400">
                  TRFSK implements appropriate administrative, technical and organizational safeguards designed to protect personal information from unauthorized access, disclosure, alteration or destruction.
                </p>
                <p className="mt-4 leading-8 text-slate-400">
                  While we strive to protect information, no internet transmission or electronic storage method can be guaranteed to be completely secure.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40">
              <h3 className="text-2xl font-bold">Third-Party Services</h3>
              <p className="mt-4 leading-8 text-slate-400">
                Our website may integrate trusted third-party services such as website analytics, email delivery providers, hosting platforms or embedded content. These providers operate under their own privacy policies. We encourage users to review those policies before interacting with external services.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================= */}
      {/* RIGHTS, CHILDREN'S PRIVACY & UPDATES */}
      {/* ================================================= */}
      <section className="py-20 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[40px] border border-slate-800 bg-slate-900/70 p-10 lg:p-16 backdrop-blur-xl">
              <h2 className="text-3xl font-extrabold sm:text-4xl">Your Rights</h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Subject to applicable laws, you may have the right to:
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {[
                  "Request access to your information.",
                  "Correct inaccurate personal information.",
                  "Request deletion of information where appropriate.",
                  "Withdraw consent where processing is based on consent.",
                  "Contact us regarding privacy-related concerns.",
                  "Receive clarification regarding our data practices.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-blue-400" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl">
                <h3 className="text-2xl font-bold">Children's Privacy</h3>
                <p className="mt-4 leading-8 text-slate-400">
                  TRFSK does not knowingly collect personal information from children without appropriate parental or guardian consent where required by applicable laws. If you believe that a child has submitted personal information through this website, please contact us so appropriate action can be taken.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl">
                <h3 className="text-2xl font-bold">Updates To This Policy</h3>
                <p className="mt-4 leading-8 text-slate-400">
                  TRFSK may update this Privacy Policy periodically to reflect changes in our practices, operational requirements, legal obligations or improvements to our services. The revised version will become effective immediately upon publication on this page unless otherwise stated.
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
              <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
              <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative text-center">
                <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                  Trust • Transparency • Security
                </span>
                <h2 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                  Your Privacy
                  <span className="mt-3 block text-blue-500">
                    Is Our Responsibility
                  </span>
                </h2>
                <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                  TRFSK remains committed to protecting your
                  information while providing educational resources,
                  business networking opportunities and a secure
                  digital experience built upon transparency and trust.
                </p>
                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link href="/contact">
                    <Button>
                      Contact Our Team
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/terms">
                    <Button variant="secondary">Terms & Conditions</Button>
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