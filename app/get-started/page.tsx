"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  Compass,
  GraduationCap,
  Handshake,
  Lightbulb,
  Rocket,
  Users,
} from "lucide-react";

import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";

export default function GetStartedPage() {
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
                Get Started
              </span>
              <h1 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Begin Your
                <span className="mt-3 block text-blue-500">
                  TRFSK Journey
                </span>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300">
                Every successful journey begins with a single step.
                Whether you're looking to expand your knowledge,
                connect with professionals, explore collaborations
                or become part of the TRFSK community,
                this is the perfect place to begin.
              </p>
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/contact">
                  <Button>
                    Connect With Our Team
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/knowledge-center">
                  <Button variant="secondary">
                    Start Learning
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================= */}
      {/* WHY START */}
      {/* ================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Why Start With TRFSK
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                Learn • Connect • Grow
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                TRFSK is built to encourage education, collaboration and responsible
                business growth through trusted knowledge sharing.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: BookOpen,
                title: "Financial Education",
                text: "Learn practical financial concepts through educational resources and insights.",
              },
              {
                icon: Users,
                title: "Professional Network",
                text: "Connect with entrepreneurs, professionals and organizations.",
              },
              {
                icon: Handshake,
                title: "Meaningful Collaboration",
                text: "Explore partnerships built on transparency and long-term value.",
              },
              {
                icon: Rocket,
                title: "Personal Growth",
                text: "Develop knowledge, confidence and stronger business understanding.",
              },
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

      {/* ================================================= */}
      {/* CHOOSE YOUR JOURNEY */}
      {/* ================================================= */}
      <section className="py-20 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Choose Your Journey
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                Find Your Place Within TRFSK
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                Every individual joins TRFSK with different goals. Select the path
                that best represents your interests and discover how our platform
                can support your professional and educational journey.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {[
              {
                icon: GraduationCap,
                title: "Students & Learners",
                description: "Build financial awareness, understand business fundamentals and develop practical knowledge for future success.",
                points: ["Financial education", "Business awareness", "Knowledge resources"],
              },
              {
                icon: Briefcase,
                title: "Professionals",
                description: "Expand your professional network while staying informed through educational content and collaborative opportunities.",
                points: ["Professional networking", "Industry insights", "Career development"],
              },
              {
                icon: Building2,
                title: "Businesses",
                description: "Explore responsible collaborations, strengthen professional relationships and engage with a growing business ecosystem.",
                points: ["Business collaboration", "Strategic partnerships", "Community engagement"],
              },
              {
                icon: Compass,
                title: "Entrepreneurs",
                description: "Gain valuable knowledge, connect with experienced professionals and discover opportunities for sustainable business growth.",
                points: ["Entrepreneurship", "Knowledge sharing", "Meaningful connections"],
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1}>
                <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10">
                  <div className="mb-6 inline-flex rounded-2xl bg-blue-500/10 p-4">
                    <item.icon className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-3xl font-bold">{item.title}</h3>
                  <p className="mt-4 text-lg leading-8 text-slate-400">{item.description}</p>
                  <div className="mt-8 space-y-4">
                    {item.points.map((point) => (
                      <div key={point} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0" />
                        <span className="text-slate-300">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* HOW IT WORKS */}
      {/* ================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Simple Process
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                Getting Started Is Easy
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 lg:grid-cols-4">
            {[
              { step: "01", title: "Connect", text: "Reach out through our contact channels and introduce yourself." },
              { step: "02", title: "Learn", text: "Explore our educational resources and understand the TRFSK ecosystem." },
              { step: "03", title: "Engage", text: "Participate in discussions, networking and collaborative opportunities." },
              { step: "04", title: "Grow", text: "Continue building knowledge, relationships and long-term professional value." },
            ].map((step, index) => (
              <Reveal key={step.step} delay={index * 0.1}>
                <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl font-black text-blue-400">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                  <p className="mt-4 text-lg leading-8 text-slate-400">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* BENEFITS */}
      {/* ================================================= */}
      <section className="py-20 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                What You Can Expect
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                Benefits of Joining TRFSK
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                TRFSK is designed to encourage continuous learning, professional
                networking and responsible business development through
                collaboration and knowledge sharing.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[
              { icon: BookOpen, title: "Educational Resources", text: "Access practical knowledge covering finance, entrepreneurship and business awareness." },
              { icon: Users, title: "Professional Community", text: "Connect with professionals, entrepreneurs and business leaders from diverse industries." },
              { icon: Handshake, title: "Meaningful Relationships", text: "Build trusted long-term professional connections through collaboration." },
              { icon: Building2, title: "Business Ecosystem", text: "Explore opportunities to engage with organizations that value ethical growth." },
              { icon: Lightbulb, title: "Continuous Learning", text: "Stay informed with educational insights, discussions and practical resources." },
              { icon: Rocket, title: "Long-Term Growth", text: "Develop stronger business understanding through knowledge and responsible networking." },
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

      {/* ================================================= */}
      {/* OUR PRINCIPLES */}
      {/* ================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[40px] border border-slate-800 bg-slate-900/70 p-12 lg:p-16 backdrop-blur-xl">
              <div className="text-center">
                <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                  Our Commitment
                </span>
                <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                  Principles That Guide Everything We Do
                </h2>
              </div>
              <div className="mt-16 grid gap-8 md:grid-cols-2">
                {[
                  "Promoting financial awareness through education.",
                  "Encouraging responsible entrepreneurship.",
                  "Supporting ethical professional networking.",
                  "Building trust through transparency.",
                  "Creating opportunities for collaboration.",
                  "Helping communities grow through shared knowledge.",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-blue-400" />
                    <p className="text-lg leading-8 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================= */}
      {/* FAQ */}
      {/* ================================================= */}
      <section className="py-20 bg-slate-900/30">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <div className="text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Questions
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 space-y-6">
            {[
              {
                q: "Who can join TRFSK?",
                a: "Students, professionals, entrepreneurs, business owners and anyone interested in financial awareness and responsible business development.",
              },
              {
                q: "Does joining TRFSK require financial commitments?",
                a: "No. TRFSK is primarily an educational and professional networking platform. Any future services or collaborations will always be communicated transparently.",
              },
              {
                q: "Is TRFSK an investment advisory platform?",
                a: "No. TRFSK does not provide investment advice or regulated financial services. All information is intended for educational purposes only.",
              },
              {
                q: "How do I begin?",
                a: "Simply contact us through the Contact page and our team will guide you based on your interests and objectives.",
              },
            ].map((faq, index) => (
              <Reveal key={faq.q} delay={index * 0.1}>
                <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40">
                  <h3 className="text-xl font-bold">{faq.q}</h3>
                  <p className="mt-4 text-lg leading-8 text-slate-400">{faq.a}</p>
                </div>
              </Reveal>
            ))}
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
                  Your Journey Starts Today
                </span>
                <h2 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                  Ready To Become Part Of
                  <span className="mt-3 block text-blue-500">
                    The TRFSK Community?
                  </span>
                </h2>
                <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
                  Every successful entrepreneur, professional and learner begins
                  with curiosity. At TRFSK, we believe education, collaboration and
                  responsible networking create stronger individuals and healthier
                  business ecosystems. We invite you to begin your journey with us
                  today.
                </p>

                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link href="/contact">
                    <Button>
                      Contact Our Team
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/knowledge-center">
                    <Button variant="secondary">Explore Knowledge Center</Button>
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