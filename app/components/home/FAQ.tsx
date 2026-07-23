"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Reveal from "../ui/Reveal";

const faqs = [
  {
    question: "What is TRFSK?",
    answer:
      "TRFSK is a platform focused on financial awareness, business education, professional networking, and strategic partnerships. Our mission is to empower individuals and organizations through knowledge sharing and meaningful collaboration.",
  },
  {
    question: "Who can become a part of TRFSK?",
    answer:
      "Entrepreneurs, startup founders, professionals, business owners, students, investors, consultants, and organizations looking to grow through education and collaboration are welcome.",
  },
  {
    question: "Does TRFSK provide financial or investment advice?",
    answer:
      "No. TRFSK provides educational content and business awareness only. Nothing on this website should be interpreted as investment, legal, tax, or financial advice.",
  },
  {
    question: "How can I collaborate with TRFSK?",
    answer:
      "You can contact us through our Contact page to discuss partnerships, collaborations, educational initiatives, or business opportunities with our team.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">

        <Reveal>
          <div className="text-center">

            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-blue-400">
              Frequently Asked Questions
            </span>

            <h2 className="mt-6 text-4xl font-extrabold md:text-5xl">
              Have Questions?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Find answers to the most common questions about TRFSK,
              our mission, services, and partnership opportunities.
            </p>

          </div>
        </Reveal>

        <div className="mt-16 space-y-6">

          {faqs.map((faq, index) => {

            const isOpen = openIndex === index;

            return (
              <Reveal key={index} delay={index * 0.08}>

                <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl transition-all duration-300 hover:border-blue-500">

                  <button
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between p-6 text-left"
                  >
                    <span className="text-lg font-semibold">
                      {faq.question}
                    </span>

                    <div className="rounded-xl bg-blue-600/10 p-2 text-blue-400">
                      {isOpen ? (
                        <Minus size={20} />
                      ) : (
                        <Plus size={20} />
                      )}
                    </div>

                  </button>

                  <div
                    className={`grid transition-all duration-500 ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-slate-800 px-6 pb-6 pt-5 leading-8 text-slate-400">
                        {faq.answer}
                      </div>
                    </div>
                  </div>

                </div>

              </Reveal>
            );

          })}

        </div>

      </div>

    </section>
  );
}