import {
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import Reveal from "../components/ui/Reveal";
import ContactForm from "../components/forms/ContactForm";
import { siteConfig, absoluteUrl } from "@/app/lib/siteConfig";

export const metadata = {
  title: "Contact TRFSK - Financial Awareness & Business Education Pune",
  description: "Contact TRFSK for financial education, business partnerships, and investment guidance. Located in Katraj, Pune. Call +91 81693 02861 or email care@trfskomkar.com.",
  keywords: "contact TRFSK, financial education contact, business partnership inquiry, TRFSK Pune, financial advisor contact, investment guidance inquiry, Katraj Pune office",
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: absoluteUrl("/contact") },
  openGraph: {
    title: "Contact TRFSK - Financial Education & Business Partnerships",
    description: "Get in touch with TRFSK for financial education, business partnerships, and investment opportunities in Pune.",
    url: absoluteUrl("/contact"),
    siteName: "TRFSK",
    locale: "en_IN",
    type: "website",
    images: [{ url: absoluteUrl("/og-contact.png"), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact TRFSK - Financial Education & Business Partnerships",
    description: "Get in touch with TRFSK for financial education, business partnerships, and investment opportunities in Pune.",
    images: [absoluteUrl("/og-contact.png")],
  },
};

const phoneNumbers = [
  "+91 81693 02861",
  "+91 92263 93837",
  "+91 70663 93830",
  "+91 70663 93831",
];

export default function ContactPage() {
  const contactCards = [
    {
      icon: Mail,
      title: "Email",
      info: "care@trfskomkar.com",
    },
    {
      icon: Phone,
      title: "Phone",
      info: phoneNumbers,
    },
    {
      icon: MapPin,
      title: "Office",
      info:
        "DNK Business Bay, 101, Katraj-Kondhwa Rd, Rajas Society, Katraj, Pune, Maharashtra 411046",
    },
    {
      icon: Clock3,
      title: "Business Hours",
      info: "Mon – Sat | 09:00 AM – 06:00 PM",
    },
  ];

  return (
    <main className="relative overflow-hidden bg-slate-950 text-white">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center pt-24 pb-12">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">

          <Reveal>

            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">

              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Contact TRFSK
              </span>

              <h1 className="mt-8 text-4xl font-extrabold sm:text-5xl lg:text-6xl">
                Let's Start
                <span className="mt-3 block text-blue-500">
                  A Conversation
                </span>
              </h1>

              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300">
                Whether you have questions regarding our services,
                partnerships, collaborations or business opportunities,
                our team is always ready to assist you.
              </p>

            </div>

          </Reveal>

        </div>
      </section>

      {/* Contact Cards */}

      <section className="pb-20">

        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2 xl:grid-cols-4 lg:px-8">

          {contactCards.map((item, index) => (

            <Reveal key={item.title} delay={index * 0.1}>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40">

                <div className="mb-6 inline-flex rounded-2xl bg-blue-500/10 p-4">
                  <item.icon className="h-8 w-8 text-blue-400" />
                </div>

                <h3 className="text-2xl font-bold">
                  {item.title}
                </h3>

                {Array.isArray(item.info) ? (

                  <div className="mt-4 space-y-2">

                    {item.info.map((line) => (

                      <p
                        key={line}
                        className="text-base text-slate-400"
                      >
                        {line}
                      </p>

                    ))}

                  </div>

                ) : (

                  <p className="mt-4 text-lg leading-8 text-slate-400">
                    {item.info}
                  </p>

                )}

              </div>

            </Reveal>

          ))}

        </div>

      </section>

      {/* Contact Form */}

      <section className="bg-slate-900/30 py-20">

        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">

          <Reveal>

            <div>

              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Send Us A Message
              </span>

              <h2 className="mt-8 text-3xl font-bold">
                Get In Touch
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                Complete the form and our team will contact you as soon as possible.
              </p>

              <div className="mt-10 space-y-6">

                <div className="flex gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                    <Mail className="h-6 w-6 text-blue-400" />
                  </div>

                  <div>

                    <h4 className="font-semibold">
                      Email Support
                    </h4>

                    <p className="text-slate-400">
                      Response within 24 hours.
                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                    <Phone className="h-6 w-6 text-blue-400" />
                  </div>

                  <div>

                    <h4 className="font-semibold">
                      Phone Support
                    </h4>

                    <p className="text-slate-400">
                      Available during business hours.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </Reveal>

          <Reveal delay={0.2}>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-xl">

              <ContactForm />

            </div>

          </Reveal>

        </div>

      </section>

    </main>
  );
}