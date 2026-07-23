import { Metadata } from 'next';
import SectionTitle from '../components/ui/SectionTitle';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Team - Meet the TRFSK Leadership | TRFSK',
  description: 'Meet the experienced team behind TRFSK driving financial awareness, entrepreneurship, and business education.',
  openGraph: {
    title: 'Our Team - Meet the TRFSK Leadership | TRFSK',
    description: 'Meet the experienced team behind TRFSK driving financial awareness, entrepreneurship, and business education.',
    url: 'https://trfsk.com/team',
    type: 'website',
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
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'contact@trfsk.com',
    },
  },
  {
    id: 2,
    name: 'Head of Education',
    role: 'Financial Educator',
    bio: 'Dedicated to making financial literacy accessible to everyone through practical, actionable insights.',
    expertise: ['Financial Education', 'Curriculum Development', 'Training'],
    image: '🎓',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'education@trfsk.com',
    },
  },
  {
    id: 3,
    name: 'Partnerships Manager',
    role: 'Business Connector',
    bio: 'Focused on building strategic partnerships that create value for entrepreneurs and organizations.',
    expertise: ['Partnership Development', 'Networking', 'Business Strategy'],
    image: '🤝',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'partnerships@trfsk.com',
    },
  },
  {
    id: 4,
    name: 'Investment Advisor',
    role: 'Market Specialist',
    bio: 'Provides data-driven investment guidance and market insights for informed financial decisions.',
    expertise: ['Investment Analysis', 'Market Research', 'Portfolio Management'],
    image: '📈',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'investments@trfsk.com',
    },
  },
];

export default function TeamPage() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Our Leadership Team"
          subtitle="Dedicated professionals committed to financial awareness and business excellence"
        />

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 mb-16 text-center">
          <p className="text-lg text-blue-50">
            Our team brings together expertise in financial education, business strategy, and
            entrepreneurship to empower individuals and organizations to make informed decisions and
            achieve sustainable growth.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-slate-900 rounded-lg overflow-hidden hover:shadow-xl transition duration-300 group"
            >
              {/* Avatar */}
              <div className="h-40 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center group-hover:from-blue-500 group-hover:to-blue-700 transition text-6xl">
                {member.image}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-blue-400 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-slate-400 text-sm mb-4">{member.bio}</p>

                {/* Expertise */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-slate-300 mb-2 uppercase">Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-3 pt-4 border-t border-slate-800">
                  <a
                    href={member.social.linkedin}
                    className="p-2 bg-slate-800 text-slate-400 rounded hover:bg-blue-600 hover:text-white transition"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    in
                  </a>
                  <a
                    href={member.social.twitter}
                    className="p-2 bg-slate-800 text-slate-400 rounded hover:bg-blue-600 hover:text-white transition"
                    aria-label="Twitter"
                    title="Twitter"
                  >
                    𝕏
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="p-2 bg-slate-800 text-slate-400 rounded hover:bg-blue-600 hover:text-white transition"
                    aria-label="Email"
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Company Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-t border-b border-slate-800">
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
            <p className="text-slate-400">
              Empower individuals and businesses through financial education, strategic guidance, and meaningful partnerships.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-bold text-white mb-2">Our Vision</h3>
            <p className="text-slate-400">
              A world where financial literacy and business acumen are accessible to all, enabling sustainable prosperity.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-white mb-2">Our Values</h3>
            <p className="text-slate-400">
              Integrity, innovation, education, and community-first approach in everything we do.
            </p>
          </div>
        </div>

        {/* Join Us CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Join Our Community?</h3>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Connect with our team and start your journey toward financial awareness and business success.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}
