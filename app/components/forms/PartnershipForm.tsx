'use client';

import { useState } from 'react';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { HoneypotField } from '@/app/components/forms/HoneypotField';

interface PartnershipFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

export default function PartnershipForm() {
  const [formData, setFormData] = useState<PartnershipFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'Business Partnership Enquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState({
    type: '',
    message: '',
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/partnership", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {

        setNotification({
          type: "success",
          message: result.message,
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "Business Partnership Enquiry",
          message: "",
        });

      } else {

        setNotification({
          type: "error",
          message:
            result.message ||
            "Unable to submit your enquiry.",
        });

      }

    } catch {

      setNotification({
        type: "error",
        message:
          "Something went wrong. Please try again.",
      });

    } finally {

      setLoading(false);

      setTimeout(() => {

        setNotification({
          type: "",
          message: "",
        });

      }, 5000);

    }
  }

  return (
    <div className="max-w-4xl mx-auto">

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <HoneypotField />

        {notification.message && (

          <div
            className={`rounded-lg p-4 flex items-center gap-3 ${
              notification.type === "success"
                ? "bg-green-900/30 border border-green-600 text-green-300"
                : "bg-red-900/30 border border-red-600 text-red-300"
            }`}
          >

            {notification.type === "success"
              ? <CheckCircle size={20}/>
              : <AlertCircle size={20}/>
            }

            <span>{notification.message}</span>

          </div>

        )}

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="block mb-2 font-medium">
              Full Name *
            </label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Email *
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Phone
            </label>

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Company
            </label>

            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
            />

          </div>

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Partnership Type
          </label>

          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
          >

            <option>
              Business Partnership Enquiry
            </option>

            <option>
              Strategic Alliance
            </option>

            <option>
              Franchise Partnership
            </option>

            <option>
              Corporate Collaboration
            </option>

            <option>
              Channel Partner
            </option>

            <option>
              Investor Discussion
            </option>

          </select>

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Message *
          </label>

          <textarea
            rows={7}
            required
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 py-4 font-semibold flex items-center justify-center gap-3"
        >

          {loading ? (
            <>
              <Loader
                size={18}
                className="animate-spin"
              />
              Sending...
            </>
          ) : (
            "Submit Partnership Enquiry"
          )}

        </button>

      </form>

    </div>
  );
}