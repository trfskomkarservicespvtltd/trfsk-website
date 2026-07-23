"use client";

import CountUp from "react-countup";
import Reveal from "../ui/Reveal";
import { Building2, Users, Handshake, Award } from "lucide-react";

const stats = [
  {
    number: 500,
    suffix: "+",
    title: "Businesses",
    icon: Building2,
  },
  {
    number: 1000,
    suffix: "+",
    title: "Community Members",
    icon: Users,
  },
  {
    number: 50,
    suffix: "+",
    title: "Business Partners",
    icon: Handshake,
  },
  {
    number: 10,
    suffix: "+",
    title: "Years of Experience",
    icon: Award,
  },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-24 text-white">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        <Reveal>
          <div className="text-center">

            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-blue-400">
              Our Impact
            </span>

            <h2 className="mt-6 text-4xl font-extrabold md:text-5xl">
              Numbers That Reflect Our Growth
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
              Our journey is built on financial awareness, business
              collaboration, trusted partnerships, and long-term value
              creation.
            </p>

          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <Reveal key={index} delay={index * 0.15}>
                <div className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-center backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20">

                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-400 transition duration-300 group-hover:scale-110 group-hover:bg-blue-600/20">
                    <Icon size={30} />
                  </div>

                  <h3 className="text-5xl font-extrabold text-white">
                    <CountUp
                      end={stat.number}
                      duration={2.5}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    {stat.suffix}
                  </h3>

                  <p className="mt-4 text-lg font-medium text-slate-400">
                    {stat.title}
                  </p>

                </div>
              </Reveal>
            );
          })}

        </div>

      </div>
    </section>
  );
}