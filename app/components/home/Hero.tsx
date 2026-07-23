import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center px-6 py-20 lg:px-8">
        <div className="grid w-full items-center gap-16 lg:grid-cols-2">

          {/* Left Content */}
          <Reveal>
            <div className="text-center lg:text-left">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Financial Awareness • Business Partnerships
              </span>

              <h1 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Building Financial Awareness
                <span className="mt-3 block text-blue-500">
                  Creating Business Partnerships
                </span>
              </h1>

              <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-slate-300 lg:mx-0">
                TRFSK empowers entrepreneurs, professionals and businesses
                through financial education, strategic insights and meaningful
                business networking that encourages long-term growth.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <Link href="/contact">
                  <Button>Get Started</Button>
                </Link>

                <Link href="/about">
                  <Button variant="secondary">
                    Learn More
                  </Button>
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-800 pt-8">
                <div>
                  <h3 className="text-2xl font-bold text-blue-400">
                    500+
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Businesses
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-blue-400">
                    1000+
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Community
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-blue-400">
                    10+
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Years
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Image */}
          <Reveal delay={0.2}>
            <div className="flex justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 rounded-3xl bg-blue-600/20 blur-2xl"></div>

                <Image
                  src="/images/hero.jpg"
                  alt="TRFSK Financial Awareness"
                  width={650}
                  height={650}
                  priority
                  className="relative h-auto w-full rounded-3xl border border-slate-800 object-cover shadow-2xl"
                />
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}