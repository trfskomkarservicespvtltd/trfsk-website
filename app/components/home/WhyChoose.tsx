import { ShieldCheck, Users, TrendingUp, Handshake } from "lucide-react";

const features = [
  {
    title: "Trusted Financial Education",
    description:
      "We provide practical financial knowledge to help individuals and businesses make informed decisions with confidence.",
    icon: ShieldCheck,
  },
  {
    title: "Strong Business Network",
    description:
      "Connect with entrepreneurs, investors, and professionals to build valuable long-term relationships.",
    icon: Users,
  },
  {
    title: "Professional Guidance",
    description:
      "Receive strategic insights and expert support to achieve sustainable business growth.",
    icon: TrendingUp,
  },
  {
    title: "Long-Term Partnerships",
    description:
      "We focus on creating trusted partnerships that continue delivering value well into the future.",
    icon: Handshake,
  },
];

export default function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            Why Choose TRFSK
          </p>

          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Why Businesses Trust TRFSK
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            We combine financial education, business collaboration, and
            strategic partnerships to help organizations grow with confidence.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-8 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-slate-800 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/60 hover:bg-white/10 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600">
                  <Icon size={28} />
                </div>

                <h3 className="mb-4 text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="leading-8 text-slate-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}