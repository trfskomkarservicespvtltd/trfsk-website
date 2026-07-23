'use client';

import { useState } from 'react';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type?: 'general' | 'partnership' | 'support';
}

interface NotificationState {
  type: 'success' | 'error' | null;
  message: string;
}

export default function EnhancedContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'general',
  });

  const [notification, setNotification] = useState<NotificationState>({
    type: null,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setNotification({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully. We will get back to you soon.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          type: 'general',
        });
        setTimeout(() => {
          setNotification({ type: null, message: '' });
        }, 5000);
      } else {
        setNotification({
          type: 'error',
          message: 'Failed to send message. Please try again or contact us directly.',
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'An error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Notification */}
      {notification.type && (
        <div
          className={`p-4 rounded-lg flex items-center gap-3 animate-slideInRight ${
            notification.type === 'success'
              ? 'bg-green-900/30 border border-green-700 text-green-300'
              : 'bg-red-900/30 border border-red-700 text-red-300'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium mb-2">Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          required
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition"
          disabled={isSubmitting}
        />
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium mb-2">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          required
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition"
          disabled={isSubmitting}
        />
      </div>

      {/* Phone Field */}
      <div>
        <label className="block text-sm font-medium mb-2">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your phone number (optional)"
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition"
          disabled={isSubmitting}
        />
      </div>

      {/* Contact Type */}
      <div>
        <label className="block text-sm font-medium mb-2">Contact Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none transition"
          disabled={isSubmitting}
        >
          <option value="general">General Inquiry</option>
          <option value="partnership">Partnership Proposal</option>
          <option value="support">Support Request</option>
        </select>
      </div>

      {/* Message Field */}
      <div>
        <label className="block text-sm font-medium mb-2">Message *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message here..."
          rows={6}
          required
          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition resize-none"
          disabled={isSubmitting}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>

      <p className="text-xs text-slate-400 text-center">
        We respect your privacy. Your information will never be shared with third parties.
      </p>
    </form>
  );
}
