import {
  Clock3,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import EnhancedContactForm from '../components/ui/EnhancedContactForm';

export const metadata = {
  title: 'Contact Us - Get in Touch with TRFSK | TRFSK',
  description: 'Have questions or interested in partnerships? Contact TRFSK today. We are here to help you succeed.',
  keywords: 'contact, inquiry, partnership, support',
  openGraph: {
    title: 'Contact Us - Get in Touch with TRFSK | TRFSK',
    description: 'Have questions or interested in partnerships? Contact TRFSK today.',
    url: 'https://trfsk.com/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] w-full items-center justify-center pt-24 pb-12">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Contact TRFSK
              </span>
              <h1 className="mt-8 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Let's Start
                <span className="mt-3 block text-blue-500">
                  A Conversation
                </span>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-300">
                Whether you have questions about TRFSK, business collaborations,
                educational initiatives, partnerships, or general enquiries,
                we'd be delighted to hear from you.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="pb-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2 xl:grid-cols-4 lg:px-8">
          {[
            { icon: Mail, title: "Email", info: "contact@trfsk.com" },
            { icon: Phone, title: "Phone", info: "+91 XXXXX XXXXX" },
            { icon: MapPin, title: "Office", info: "Maharashtra, India" },
            { icon: Clock3, title: "Business Hours", info: "Mon – Sat | 10 AM – 6 PM" },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 0.1}>
              <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="mb-6 inline-flex rounded-2xl bg-blue-500/10 p-4">
                  <item.icon className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="mt-4 text-lg leading-8 text-slate-400">{item.info}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-slate-900/30">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div>
              <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                Send Us A Message
              </span>
              <h2 className="mt-8 text-3xl font-bold">Get In Touch</h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                We value your inquiry and will respond promptly. Share your thoughts, 
                questions, or partnership ideas with us.
              </p>
              <div className="mt-10 space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                    <Mail className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email Response</h4>
                    <p className="text-slate-400">We typically respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                    <Phone className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Call Us</h4>
                    <p className="text-slate-400">Available during business hours</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-xl">
              <EnhancedContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
