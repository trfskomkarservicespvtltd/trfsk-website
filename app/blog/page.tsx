import { Metadata } from 'next';
import Reveal from '../components/ui/Reveal';
import SectionTitle from '../components/ui/SectionTitle';
import BlogSearchFilter from '../components/ui/BlogSearchFilter';
import { siteConfig } from '@/app/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Blog - Financial & Business Insights | TRFSK',
  description: 'Read the latest articles on financial education, entrepreneurship, investment guidance, and business strategy.',
  keywords: 'blog, financial insights, business articles, investment tips, entrepreneurship',
  openGraph: {
    title: 'Blog - Financial & Business Insights | TRFSK',
    description: 'Read the latest articles on financial education, entrepreneurship, investment guidance, and business strategy.',
    url: `${siteConfig.url}/blog`,
    type: 'website',
  },
};

export default function BlogPage() {
  return (
    <main className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <SectionTitle
                subtitle="Blog"
                title="Latest Insights"
                center
              />
              <p className="mt-6 text-lg leading-8 text-slate-400">
                Financial education, entrepreneurship tips, and investment
                guidance to help you succeed.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-16">
              <BlogSearchFilter />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}