import SectionTitle from "../ui/SectionTitle";

export default function About() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        {/* Left Content */}
        <div>
          <SectionTitle
            subtitle="About TRFSK"
            title="Empowering Businesses Through Financial Knowledge"
          />

          <p className="mt-6 text-lg leading-8 text-slate-300">
            TRFSK is dedicated to improving financial awareness,
            building trusted business relationships, and connecting
            entrepreneurs with the right opportunities through
            education, collaboration, and strategic partnerships.
          </p>

          <p className="mt-6 leading-8 text-slate-400">
            We believe sustainable success comes from informed decisions,
            ethical business practices, and meaningful connections.
            Our platform helps individuals and organizations build
            long-term value through financial education and business
            networking.
          </p>

          {/* Highlights */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm transition duration-300 hover:border-blue-500/40">
              <h3 className="mb-2 text-lg font-semibold text-blue-400">
                Financial Awareness
              </h3>

              <p className="text-sm leading-6 text-slate-400">
                Helping individuals and businesses make informed
                financial decisions through practical education.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm transition duration-300 hover:border-blue-500/40">
              <h3 className="mb-2 text-lg font-semibold text-blue-400">
                Business Networking
              </h3>

              <p className="text-sm leading-6 text-slate-400">
                Connecting entrepreneurs, professionals, and
                organizations to create valuable partnerships.
              </p>
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-blue-600/10 blur-2xl" />

          <div className="relative rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-md md:p-10">
            <div className="mb-10">
              <h3 className="mb-4 text-2xl font-bold text-blue-400">
                Our Vision
              </h3>

              <p className="leading-8 text-slate-300">
                Creating financially aware communities connected through
                trust, innovation, collaboration, and sustainable
                business growth.
              </p>
            </div>

            <div className="border-t border-slate-800 pt-8">
              <h3 className="mb-4 text-2xl font-bold text-blue-400">
                Our Mission
              </h3>

              <p className="leading-8 text-slate-300">
                To provide financial education, encourage responsible
                entrepreneurship, and build business partnerships that
                create long-term opportunities for individuals and
                organizations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}