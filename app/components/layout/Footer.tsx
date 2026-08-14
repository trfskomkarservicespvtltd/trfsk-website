"use client";

import Link from "next/link";
import {
  FaLinkedin,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
  FaPinterest,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import NewsletterSignup from "../ui/NewsletterSignup";

const socialLinks = [
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/santosh-maruti-shendkar-501355345", label: "LinkedIn" },
  { icon: FaFacebook, href: "https://www.facebook.com/trfskomkar", label: "Facebook" },
  { icon: FaInstagram, href: "https://www.instagram.com/trfskomkar/", label: "Instagram" },
  { icon: FaYoutube, href: "https://youtube.com/@omkarservice-s", label: "YouTube" },
  { icon: FaXTwitter, href: "https://x.com/omkarenter66396", label: "X (Twitter)" },
  { icon: FaPinterest, href: "https://pin.it/2TC8lYiZ8", label: "Pinterest" },
  { icon: FaWhatsapp, href: "https://wa.me/917066393830", label: "WhatsApp" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">

      <div className="mx-auto max-w-7xl px-6 py-20">

        {/* Top */}

        <div className="grid gap-12 lg:grid-cols-5">

          {/* Company */}

          <div className="lg:col-span-2">

            <h2 className="text-3xl font-bold text-blue-500">
              TRFSK
            </h2>

            <p className="mt-6 leading-8 text-slate-400">

              TRFSK is committed to building financial awareness,
              business education and professional networking that
              empowers entrepreneurs, professionals and organizations
              to achieve sustainable long-term growth.

            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800 transition hover:bg-blue-600"
                  >
                    <Icon />
                  </a>
                );
              })}

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="mb-6 text-lg font-semibold">
              Company
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>
                <Link href="/">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/about">
                  About
                </Link>
              </li>

              <li>
                <Link href="/services">
                  Services
                </Link>
              </li>

              <li>
                <Link href="/contact">
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Knowledge */}

          <div>

            <h3 className="mb-6 text-lg font-semibold">
              Knowledge
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>
                <Link href="/knowledge-center">
                  Knowledge Center
                </Link>
              </li>

              <li>
                <Link href="/blog">
                  Insights
                </Link>
              </li>

              <li>
                <Link href="/team">
                  Leadership
                </Link>
              </li>

              <li>
                <Link href="/partnerships">
                  Partnerships
                </Link>
              </li>

            </ul>

          </div>

          {/* Legal */}

          <div>

            <h3 className="mb-6 text-lg font-semibold">
              Legal
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>
                <Link href="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms-and-conditions">
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link href="/disclaimer">
                  Disclaimer
                </Link>
              </li>

            </ul>

          </div>

        </div>

        {/* Contact strip */}

        <div className="mt-16 grid gap-6 border-t border-slate-800 pt-10 text-sm text-slate-400 sm:grid-cols-3">
          <div>
            <p className="font-semibold text-slate-300">Email</p>
            <a href="mailto:care@trfskomkar.com" className="mt-1 block hover:text-blue-400">
              care@trfskomkar.com
            </a>
          </div>
          <div>
            <p className="font-semibold text-slate-300">Phone</p>
            <a href="tel:+918169302861" className="mt-1 block hover:text-blue-400">
              +91 81693 02861
            </a>
          </div>
          <div>
            <p className="font-semibold text-slate-300">Office</p>
            <p className="mt-1">Katraj, Pune, Maharashtra 411046</p>
          </div>
        </div>

        {/* Newsletter */}

        <div className="mt-16 rounded-3xl border border-slate-800 bg-slate-900/60 p-10">

          <div className="grid gap-8 lg:grid-cols-2">

            <div>

              <h3 className="text-2xl font-bold">

                Stay Updated

              </h3>

              <p className="mt-4 text-slate-400 leading-8">

                Subscribe to receive financial awareness articles,
                business insights and educational resources directly
                in your inbox.

              </p>

            </div>

            <NewsletterSignup />

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 border-t border-slate-800 pt-10">

          <div className="flex flex-col gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">

            <div className="text-slate-400">

              © {year} TRFSK.

              All Rights Reserved.

            </div>

            <div className="max-w-3xl text-sm leading-7 text-slate-500">

              TRFSK provides educational content related to financial
              awareness, entrepreneurship and business knowledge.
              Information published on this website is intended solely
              for educational purposes and should not be interpreted as
              investment, legal, accounting or financial advice.

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}