import { Metadata } from 'next';
import { Mail } from 'lucide-react';
import Reveal from '../components/ui/Reveal';
import SectionTitle from '../components/ui/SectionTitle';
import { siteConfig, absoluteUrl } from '@/app/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Our Team - Meet the TRFSK Leadership | TRFSK',
  description: 'Meet the experienced leadership team at TRFSK driving financial awareness, entrepreneurship education, and business growth in Pune.',
  keywords: 'TRFSK team, leadership team, financial education team, business educators, TRFSK founders, Pune business leaders, entrepreneurship mentors',
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: absoluteUrl("/team") },
  openGraph: {
    title: 'Our Team - Meet the TRFSK Leadership',
    description: 'Meet the experienced team behind TRFSK driving financial awareness, entrepreneurship, and business education.',
    url: absoluteUrl("/team"),
    siteName: "TRFSK",
    locale: "en_IN",
    type: "website",
    images: [{ url: absoluteUrl("/og-team.png"), width: 1200, height: 630 }],
  },
};

const teamMembers = [
  {
    id: 1,
    name: 'Founder & CEO',
    role: 'Visionary Leader',
    bio: 'Passionate about financial education and creating meaningful opportunities for entrepreneurs and professionals worldwide.',
    expertise: ['Strategic Planning', 'Financial Advisory', 'Business Development'],
    image: '👔',
    email: 'admin@trfskomkar.com',
  },
  {
    id: 2,
    name: 'Head of Education',
    role: 'Financial Educator',
    bio: 'Dedicated to making financial literacy accessible to everyone through practical, actionable insights.',
    expertise: ['Financial Education', 'Curriculum Development', 'Training'],
    image: '🎓',
    email: 'care@trfskomkar.com',
  },
  {
    id: 3,
    name: 'Partnerships Manager',
    role: 'Business Connector',
    bio: 'Focused on building strategic partnerships that create value for entrepreneurs and organizations.',
    expertise: ['Partnership Development', 'Networking', 'Business Strategy'],
    image: '🤝',
    email: 'partners@trfskomkar.com',
  },
  {
    id: 4,
    name: 'Investment Advisor',
    role: 'Market Specialist',
    bio: 'Provides data-driven investment guidance and market insights for informed financial decisions.',
    expertise: ['Investment Analysis', 'Market Research', 'Portfolio Management'],
    image: '📈',
    email: 'care@trfskomkar.com',
  },
];

export default function TeamPage() {
  return (
    <main className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <SectionTitle
                subtitle="Our Team"
                title="Our Leadership Team"
                center
              />
              <p className="mt-6 text-lg leading-8 text-slate-400">
                Dedicated professionals committed to financial awareness and
                business excellence.
              </p>
            </div>
          </Reveal>

          {/* Mission Statement */}
          <Reveal delay={0.1}>
            <div className="mt-16 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-600/20 to-blue-800/20 p-10 text-center backdrop-blur-xl">
              <p className="text-lg leading-8 text-slate-200">
                Our team brings together expertise in financial education, business
                strategy, and entrepreneurship to empower individuals and
                organizations to make informed decisions and achieve sustainable
                growth.
              </p>
            </div>
          </Reveal>

          {/* Team Grid */}
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <Reveal key={member.id} delay={index * 0.1}>
                <div className="group h-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10">
                  <div className="flex h-32 items-center justify-center bg-blue-500/10 text-5xl">
                    {member.image}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="mb-3 text-sm font-medium text-blue-400">{member.role}</p>
                    <p className="mb-4 text-sm leading-6 text-slate-400">{member.bio}</p>

                    <div className="mb-4">
                      <p className="mb-2 text-xs font-bold uppercase text-slate-300">
                        Expertise
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-slate-800 pt-4">
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-300 transition hover:bg-blue-600 hover:text-white"
                        aria-label={`Email ${member.role}`}
                      >
                        <Mail size={16} />
                        Contact
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Company Values */}
          <Reveal delay={0.2}>
            <div className="mt-20 grid grid-cols-1 gap-8 border-t border-b border-slate-800 py-16 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-4 text-4xl">🎯</div>
                <h3 className="mb-2 text-xl font-bold text-white">Our Mission</h3>
                <p className="text-slate-400">
                  Empower individuals and businesses through financial education,
                  strategic guidance, and meaningful partnerships.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 text-4xl">💡</div>
                <h3 className="mb-2 text-xl font-bold text-white">Our Vision</h3>
                <p className="text-slate-400">
                  A world where financial literacy and business acumen are
                  accessible to all, enabling sustainable prosperity.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-4 text-4xl">🤝</div>
                <h3 className="mb-2 text-xl font-bold text-white">Our Values</h3>
                <p className="text-slate-400">
                  Integrity, innovation, education, and community-first approach
                  in everything we do.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Join Us CTA */}
          <Reveal delay={0.3}>
            <div className="mt-16 text-center">
              <h3 className="mb-4 text-2xl font-bold text-white">
                Ready to Join Our Community?
              </h3>
              <p className="mx-auto mb-8 max-w-2xl text-slate-400">
                Connect with our team and start your journey toward financial
                awareness and business success.
              </p>
              <a
                href="/contact"
                className="inline-block rounded-xl bg-blue-600 px-8 py-3 font-bold text-white transition hover:bg-blue-700"
              >
                Get In Touch
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}