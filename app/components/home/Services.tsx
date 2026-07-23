import SectionTitle from "../ui/SectionTitle";
import {
  GraduationCap,
  Handshake,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: GraduationCap,
      title: "Financial Education",
      description:
        "Helping individuals and businesses improve financial literacy through practical knowledge, strategic planning, and long-term wealth-building principles.",
    },
    {
      icon: Handshake,
      title: "Business Partnerships",
      description:
        "Connecting entrepreneurs, professionals, and organizations to create meaningful collaborations that drive sustainable growth.",
    },
    {
      icon: TrendingUp,
      title: "Investment Guidance",
      description:
        "Providing market insights, investment strategies, and growth opportunities that support informed financial decisions.",
    },
  ];

  return (
    <section className="relative bg-slate-900 py-20 md:py-28 overflow-hidden">

      {/* Background Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">

        <SectionTitle
          subtitle="Our Services"
          title="Solutions Designed For Your Growth"
          center={true}
        />

        <p className="max-w-3xl mx-auto text-center text-gray-400 mt-6 mb-16 leading-8">
          We empower entrepreneurs, professionals, and businesses with
          practical financial knowledge, strategic partnerships, and
          investment opportunities that create lasting success.
        </p>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="group flex flex-col rounded-3xl border border-slate-700/60 bg-white/5 backdrop-blur-md p-8 transition-all duration-500 hover:-translate-y-3 hover:border-blue-500/60 hover:shadow-[0_0_35px_rgba(59,130,246,0.25)]"
              >

                <div className="w-16 h-16 rounded-2xl bg-blue-600/15 flex items-center justify-center mb-8 group-hover:bg-blue-600 transition">

                  <Icon
                    className="w-8 h-8 text-blue-400 group-hover:text-white transition"
                  />

                </div>

                <h3 className="text-2xl font-bold text-white mb-5">
                  {service.title}
                </h3>

                <p className="text-gray-400 leading-8 flex-grow">
                  {service.description}
                </p>

                <button className="mt-8 inline-flex items-center gap-2 text-blue-400 font-semibold group-hover:text-white transition">

                  Learn More

                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-2"
                  />

                </button>

              </div>
            );
          })}
        </div>

        {/* CTA */}

        <div className="text-center mt-20">

          <button className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 transition font-semibold text-white shadow-lg hover:shadow-blue-600/40">

            Explore All Services

          </button>

        </div>

      </div>

    </section>
  );
}