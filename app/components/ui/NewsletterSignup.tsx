'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { HoneypotField } from '@/app/components/forms/HoneypotField';

export default function NewsletterSignup() {

  const [email, setEmail] = useState('');

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const [message, setMessage] = useState('');

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    if (!email.trim()) {

      setStatus('error');

      setMessage('Please enter your email address.');

      return;
    }

    setStatus('loading');

    try {

      const response = await fetch('/api/newsletter', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          email,
        }),

      });

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message || 'Unable to subscribe.'
        );

      }

      setStatus('success');

      setMessage(
        data.message ||
          'Thank you for subscribing.'
      );

      setEmail('');

    } catch (error: any) {

      setStatus('error');

      setMessage(
        error.message ||
          'Something went wrong.'
      );

    } finally {

      setTimeout(() => {

        setStatus('idle');

        setMessage('');

      }, 5000);

    }

  }

  return (

    <div className="w-full">

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3"
      >
        <HoneypotField />

        <input

          type="email"

          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }

          placeholder="Enter your email address"

          required

          disabled={status === 'loading'}

          className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-400 outline-none transition focus:border-blue-500"

        />

        <button

          type="submit"

          disabled={status === 'loading'}

          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"

        >

          {status === 'loading' ? (

            <span className="flex items-center gap-2">

              <Loader2
                size={18}
                className="animate-spin"
              />

              Subscribing...

            </span>

          ) : (

            <span className="flex items-center gap-2">

              <Mail size={18} />

              Subscribe

            </span>

          )}

        </button>

      </form>

      {status === 'success' && (

        <div className="mt-4 flex items-center gap-3 rounded-lg border border-green-700 bg-green-900/20 p-3 text-green-300">

          <CheckCircle size={20} />

          {message}

        </div>

      )}

      {status === 'error' && (

        <div className="mt-4 flex items-center gap-3 rounded-lg border border-red-700 bg-red-900/20 p-3 text-red-300">

          <AlertCircle size={20} />

          {message}

        </div>

      )}

    </div>

  );

}