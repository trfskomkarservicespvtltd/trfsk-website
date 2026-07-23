import { Metadata } from 'next';
import Link from 'next/link';
import { getPostBySlug, blogPosts } from '../../lib/blogPosts';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export const generateMetadata = ({
  params,
}: {
  params: { slug: string };
}): Metadata => {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  return {
    title: `${post.title} | TRFSK Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
};

export const generateStaticParams = () => {
  return blogPosts.map((post) => ({
    slug: post.id,
  }));
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <article className="py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 font-medium transition"
        >
          <ArrowLeft size={18} /> Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-4">
            <span className="inline-block px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag size={16} />
              <span>{post.tags.length} tags</span>
            </div>
          </div>
        </div>

        {/* Featured Image Placeholder */}
        <div className="h-96 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg mb-12 flex items-center justify-center">
          <p className="text-white text-center">
            <span className="text-3xl mb-2 block">📷</span>
            Featured Image
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-12">
          <div className="text-slate-300 leading-8 whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-12 pb-12 border-b border-slate-700">
          <h3 className="text-sm font-bold text-white mb-4 uppercase">Tags</h3>
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition text-sm"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Author Box */}
        <div className="bg-slate-900 rounded-lg p-8 mb-12">
          <h3 className="text-lg font-bold text-white mb-2">About the Author</h3>
          <p className="text-slate-400">
            {post.author} is a member of the TRFSK team, dedicated to sharing
            valuable insights on financial literacy, entrepreneurship, and
            business strategy. Connect with us on our social channels for more
            updates.
          </p>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  className="group"
                >
                  <div className="bg-slate-900 rounded-lg overflow-hidden hover:shadow-lg transition">
                    <div className="h-40 bg-gradient-to-br from-blue-600 to-blue-800"></div>
                    <div className="p-4">
                      <p className="text-xs text-blue-400 mb-2">{relatedPost.category}</p>
                      <h4 className="font-bold text-white group-hover:text-blue-400 transition line-clamp-2">
                        {relatedPost.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
