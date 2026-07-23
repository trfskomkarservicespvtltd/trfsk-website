"use client";

import Link from "next/link";
import { ArrowLeft, Home, BookOpen, Briefcase } from "lucide-react";

import Reveal from "./components/ui/Reveal";
import Button from "./components/ui/Button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-white">

      {/* Background */}

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[160px]" />
        <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[160px]" />
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center">

        <Reveal>

          <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            Error 404
          </span>

          <h1 className="mt-8 text-7xl font-black text-blue-400 lg:text-8xl">
            404
          </h1>

          <h2 className="mt-6 text-4xl font-bold lg:text-5xl">
            Page Not Found
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-slate-400">
            The page you are looking for may have been moved,
            renamed or is temporarily unavailable.
            Please use one of the links below to continue exploring
            the TRFSK platform.
          </p>

        </Reveal>

        {/* Quick Links */}

        <Reveal delay={0.15}>

          <div className="mt-16 grid gap-5 sm:grid-cols-3">

            <Link href="/">

              <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40">

                <Home className="mx-auto h-8 w-8 text-blue-400" />

                <h3 className="mt-4 text-lg font-semibold">
                  Home
                </h3>

              </div>

            </Link>

            <Link href="/services">

              <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40">

                <Briefcase className="mx-auto h-8 w-8 text-blue-400" />

                <h3 className="mt-4 text-lg font-semibold">
                  Services
                </h3>

              </div>

            </Link>

            <Link href="/knowledge-center">

              <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40">

                <BookOpen className="mx-auto h-8 w-8 text-blue-400" />

                <h3 className="mt-4 text-lg font-semibold">
                  Knowledge Center
                </h3>

              </div>

            </Link>

          </div>

        </Reveal>

        {/* Buttons */}

        <Reveal delay={0.3}>

          <div className="mt-16 flex flex-col justify-center gap-5 sm:flex-row">

            <Link href="/">

              <Button>

                <Home className="mr-2 h-5 w-5" />

                Back to Home

              </Button>

            </Link>

            <Link href="/contact">

              <Button variant="secondary">

                <ArrowLeft className="mr-2 h-5 w-5" />

                Contact Us

              </Button>

            </Link>

          </div>

        </Reveal>

      </div>

    </main>
  );
}