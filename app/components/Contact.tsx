import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

const phoneNumbers = [
  "+91 81693 02861",
  "+91 92263 93837",
  "+91 70663 93830",
  "+91 70663 93831",
];

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "info@trfskomkar.com",
      description: "Send us your enquiry anytime.",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: phoneNumbers,
      description: "Monday to Saturday",
    },
    {
      icon: MapPin,
      title: "Office",
      value: "Pune, Maharashtra",
      description: "DNK Business Bay, Katraj - Kondhwa Rd, Katraj, 411046",
    },
    {
      icon: Clock,
      title: "Working Hours",
      value: "09:00 AM - 06:00 PM",
      description: "Sunday Closed",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      {/* Background Glow */}

      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        <Reveal>

          <div className="mx-auto max-w-3xl text-center">

            <p className="font-semibold uppercase tracking-[0.3em] text-blue-400">
              Contact Us
            </p>

            <h2 className="mt-5 text-4xl font-bold sm:text-5xl">
              Let's Build Something Great Together
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-400">
              Whether you're interested in business partnerships,
              financial awareness initiatives, or collaboration
              opportunities, we'd love to hear from you.
            </p>

          </div>

        </Reveal>

        {/* Contact Cards */}

        <Reveal delay={0.2}>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            {contactInfo.map((item, index) => {

              const Icon = item.icon;

              return (

                <div
                  key={index}
                  className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7 backdrop-blur-lg transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20"
                >

                  <div className="mb-6 inline-flex rounded-2xl bg-blue-500/10 p-4">
                    <Icon className="h-7 w-7 text-blue-400" />
                  </div>

                  <h3 className="text-xl font-semibold">
                    {item.title}
                  </h3>

                  {Array.isArray(item.value) ? (
                    <div className="mt-3 space-y-1">
                      {item.value.map((v) => (
                        <p key={v} className="font-medium text-blue-400">
                          {v}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-3 font-medium text-blue-400">
                      {item.value}
                    </p>
                  )}

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>

                </div>

              );
            })}

          </div>

        </Reveal>

        {/* Reassurance + CTA (form lives on /contact) */}

        <Reveal delay={0.3}>

          <div className="mt-20 rounded-3xl border border-slate-800 bg-slate-900/80 p-10 text-center backdrop-blur-xl shadow-2xl sm:p-14">

            <h3 className="text-3xl font-bold">
              We'd Love to Connect
            </h3>

            <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-400">
              Every successful partnership begins with a conversation.
              Whether you're an entrepreneur, business owner,
              professional, or organization, let's explore how we can
              create long-term value together.
            </p>

            <div className="mx-auto mt-10 flex max-w-xl flex-col justify-center gap-5 sm:flex-row">

              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
                <p className="text-sm text-slate-300">Usually responds within 24 hours</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
                <p className="text-sm text-slate-300">Professional & Secure Communication</p>
              </div>

            </div>

            <Link href="/contact" className="mt-10 inline-block">
              <Button>
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

          </div>

        </Reveal>

      </div>

    </section>
  );
}