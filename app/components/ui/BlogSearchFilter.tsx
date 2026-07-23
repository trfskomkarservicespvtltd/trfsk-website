'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { blogPosts, getCategories } from '../../lib/blogPosts';
import { Search, Filter, X } from 'lucide-react';
import { ArrowRight, Calendar, User } from 'lucide-react';

export default function BlogSearchFilter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const categories = getCategories();

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedTag(null);
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedTag;

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition"
        />
      </div>

      {/* Filter Section */}
      <div className="space-y-4">
        {/* Category Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-slate-300">
            <Filter size={16} />
            Categories
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                !selectedCategory
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tag Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-slate-300">
            <Filter size={16} />
            Tags
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1 rounded text-xs font-medium transition ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition"
          >
            <X size={16} />
            Clear all filters
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-slate-400">
        Found <span className="font-bold text-white">{filteredPosts.length}</span> article
        {filteredPosts.length !== 1 ? 's' : ''}
      </div>

      {/* Search Results */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-slate-900 rounded-lg overflow-hidden hover:shadow-xl transition duration-300 flex flex-col"
            >
              {/* Image placeholder */}
              <div className="h-48 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <p className="text-white text-sm opacity-70">{post.category}</p>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                    {post.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 hover:text-blue-400 transition">
                  <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </h3>

                <p className="text-slate-400 text-sm mb-4 flex-1">{post.excerpt}</p>

                {/* Meta info */}
                <div className="space-y-2 text-xs text-slate-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    <span>{post.author}</span>
                  </div>
                </div>

                {/* Read More Link */}
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition"
                >
                  Read Article <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-400 mb-4">No articles found matching your search.</p>
          <button
            onClick={clearFilters}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
