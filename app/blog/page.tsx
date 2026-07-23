import { Metadata } from 'next';
import SectionTitle from '../components/ui/SectionTitle';
import BlogSearchFilter from '../components/ui/BlogSearchFilter';

export const metadata: Metadata = {
  title: 'Blog - Financial & Business Insights | TRFSK',
  description: 'Read the latest articles on financial education, entrepreneurship, investment guidance, and business strategy.',
  keywords: 'blog, financial insights, business articles, investment tips, entrepreneurship',
  openGraph: {
    title: 'Blog - Financial & Business Insights | TRFSK',
    description: 'Read the latest articles on financial education, entrepreneurship, investment guidance, and business strategy.',
    url: 'https://trfsk.com/blog',
    type: 'website',
  },
};

export default function BlogPage() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
      <SectionTitle
        title="Latest Insights"
        subtitle="Financial education, entrepreneurship tips, and investment guidance to help you succeed"
      />

      {/* Search and Filter Component */}
      <BlogSearchFilter />
    </section>
  );
}
