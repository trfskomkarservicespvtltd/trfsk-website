"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import NavLink from "../NavLink";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const primaryLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/knowledge-center", label: "Knowledge Center" },
    { href: "/contact", label: "Contact" },
  ];

  const secondaryLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/team", label: "Team" },
    { href: "/partnerships", label: "Partnerships" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link href="/" className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-600/20">
            T
          </div>

          <div>
            <div className="text-xl font-bold text-white tracking-wide">
              TRFSK
            </div>

            <div className="text-xs text-slate-400">
              Financial Awareness Platform
            </div>
          </div>

        </Link>

        {/* Desktop */}

        <nav className="hidden lg:flex items-center gap-8">

          {primaryLinks.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
            />
          ))}

          <div className="relative group">

            <button className="flex items-center gap-1 text-gray-300 hover:text-blue-400 transition">
              More
              <ChevronDown size={16} />
            </button>

            <div className="absolute right-0 top-8 hidden min-w-[220px] rounded-2xl border border-slate-800 bg-slate-900 p-3 shadow-2xl group-hover:block">

              {secondaryLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-4 py-3 text-gray-300 transition hover:bg-slate-800 hover:text-blue-400"
                >
                  {item.label}
                </Link>
              ))}

            </div>

          </div>

        </nav>

        {/* CTA */}

        <div className="hidden lg:block">

          <Link
            href="/get-started"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>

        </div>

        {/* Mobile */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>

      {mobileOpen && (

        <div className="border-t border-slate-800 bg-slate-950 lg:hidden">

          <div className="space-y-1 p-6">

            {[...primaryLinks, ...secondaryLinks].map((item) => (

              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-4 py-3 text-gray-300 hover:bg-slate-900 hover:text-blue-400"
              >
                {item.label}
              </Link>

            ))}

            <Link
              href="/get-started"
              onClick={() => setMobileOpen(false)}
              className="mt-4 block rounded-xl bg-blue-600 py-3 text-center font-semibold text-white"
            >
              Get Started
            </Link>

          </div>

        </div>

      )}

    </header>
  );
}