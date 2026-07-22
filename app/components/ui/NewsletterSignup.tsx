'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setStatus('error');
      setMessage('Please enter a valid email');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Thank you for subscribing!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
    } finally {
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 rounded text-sm bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {status === 'loading' ? (
            <>
              <span className="animate-spin">⏳</span> Subscribing...
            </>
          ) : (
            <>
              <Mail size={16} /> Subscribe
            </>
          )}
        </button>
      </form>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="mt-3 flex items-center gap-2 p-3 bg-green-900/30 border border-green-700 rounded text-green-300 text-sm">
          <CheckCircle size={18} />
          <span>{message}</span>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-3 flex items-center gap-2 p-3 bg-red-900/30 border border-red-700 rounded text-red-300 text-sm">
          <AlertCircle size={18} />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}