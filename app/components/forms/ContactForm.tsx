'use client';

import { useState } from 'react';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
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
    company: '',
    subject: '',
    message: '',
    type: 'general',
  });

  const [notification, setNotification] = useState<NotificationState>({
    type: null,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setNotification({
          type: 'success',
          message:
            result.message ||
            'Thank you! Your message has been sent successfully.',
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          type: 'general',
        });

        setTimeout(() => {
          setNotification({
            type: null,
            message: '',
          });
        }, 5000);
      } else {
        setNotification({
          type: 'error',
          message:
            result.message ||
            'Unable to send your message. Please try again.',
        });
      }
    } catch (error) {
      console.error(error);

      setNotification({
        type: 'error',
        message:
          'Something went wrong while sending your message.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {notification.type && (
        <div
          className={`p-4 rounded-lg flex items-center gap-3 ${
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

      <div>
        <label className="block text-sm font-medium mb-2">
          Full Name *
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          placeholder="Enter your full name"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Email Address *
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          placeholder="you@example.com"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Phone Number
        </label>

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          disabled={isSubmitting}
          placeholder="+91 9876543210"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Company / Organization
        </label>

        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          disabled={isSubmitting}
          placeholder="ABC Pvt Ltd (Optional)"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Contact Type
        </label>

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
        >
          <option value="general">General Inquiry</option>
          <option value="partnership">Business Partnership</option>
          <option value="support">Customer Support</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Subject
        </label>

        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          disabled={isSubmitting}
          placeholder="Subject"
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Message *
        </label>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          disabled={isSubmitting}
          placeholder="Write your message here..."
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2 disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader
              className="animate-spin"
              size={18}
            />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>

      <p className="text-xs text-slate-400 text-center">
        Your information is securely transmitted to TRFSK OMKAR
        SERVICES PVT LTD and will only be used to respond to your
        enquiry.
      </p>
    </form>
  );
}