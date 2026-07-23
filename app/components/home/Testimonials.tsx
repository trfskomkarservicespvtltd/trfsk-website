import Reveal from "../ui/Reveal";
import SectionTitle from "../ui/SectionTitle";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Business Owner",
    quote:
      "TRFSK helped us understand financial planning and connected us with valuable business opportunities.",
  },
  {
    name: "Priya Patel",
    role: "Entrepreneur",
    quote:
      "The guidance and networking opportunities have been invaluable for growing my business.",
  },
  {
    name: "Amit Verma",
    role: "Startup Founder",
    quote:
      "Working with TRFSK gave us confidence to make better financial decisions and expand our network.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <Reveal>
          <SectionTitle
            subtitle="Testimonials"
            title="What Our Clients Say"
            center
          />
        </Reveal>

        <Reveal delay={0.2}>
          <div className="grid gap-8 mt-16 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-lg p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="mb-5 text-yellow-400 text-xl">
                  ★★★★★
                </div>

                <p className="italic leading-8 text-slate-300">
                  "{item.quote}"
                </p>

                <div className="mt-8 border-t border-slate-800 pt-6">
                  <h4 className="text-lg font-bold text-white">
                    {item.name}
                  </h4>

                  <p className="text-blue-400">
                    {item.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}