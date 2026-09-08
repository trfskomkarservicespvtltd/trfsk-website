"use client";

import { FormEvent, useState } from "react";

export default function CreatePartnerForm() {
  const [form, setForm] = useState({
    email: "",
    full_name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    pan: "",
    aadhaar: "",
    bank_name: "",
    bank_account_name: "",
    bank_account_no: "",
    ifsc: "",
    rate: "12",
    rate_type: "monthly",
    due_day: "15",
    currency: "INR",
    initial_contribution: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function update(key: string, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/partners/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`Partner created! Account: ${data.data.accountCode}`);
        setForm({
          email: "",
          full_name: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          pan: "",
          aadhaar: "",
          bank_name: "",
          bank_account_name: "",
          bank_account_no: "",
          ifsc: "",
          rate: "12",
          rate_type: "monthly",
          due_day: "15",
          currency: "INR",
          initial_contribution: "",
        });
      } else {
        setMessage(data.error || "Failed to create partner");
      }
    } catch {
      setMessage("Network error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <h2 className="text-lg font-semibold text-white">Create Manual Partner Account</h2>
      <p className="mt-1 text-sm text-slate-500">Add an existing investor with their capital deployed and payout history.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-slate-400">Email<input value={form.email} onChange={(e) => update("email", e.target.value)} required className="field mt-2" /></label>
          <label className="text-sm text-slate-400">Full Name<input value={form.full_name} onChange={(e) => update("full_name", e.target.value)} required className="field mt-2" /></label>
          <label className="text-sm text-slate-400">Phone<input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="field mt-2" /></label>
          <label className="text-sm text-slate-400">Initial Contribution (INR)<input type="number" value={form.initial_contribution} onChange={(e) => update("initial_contribution", e.target.value)} className="field mt-2" /></label>
        </div>
        <div className="border-t border-slate-800 pt-4">
          <h3 className="mb-3 text-sm font-semibold text-white">Bank Details</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-slate-400">Bank Name<input value={form.bank_name} onChange={(e) => update("bank_name", e.target.value)} className="field mt-2" /></label>
            <label className="text-sm text-slate-400">Account Holder<input value={form.bank_account_name} onChange={(e) => update("bank_account_name", e.target.value)} className="field mt-2" /></label>
            <label className="text-sm text-slate-400">Account Number<input value={form.bank_account_no} onChange={(e) => update("bank_account_no", e.target.value)} className="field mt-2" /></label>
            <label className="text-sm text-slate-400">IFSC Code<input value={form.ifsc} onChange={(e) => update("ifsc", e.target.value)} className="field mt-2" /></label>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-4">
          <h3 className="mb-3 text-sm font-semibold text-white">Address & KYC</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-slate-400">Address<input value={form.address} onChange={(e) => update("address", e.target.value)} className="field mt-2" /></label>
            <label className="text-sm text-slate-400">City<input value={form.city} onChange={(e) => update("city", e.target.value)} className="field mt-2" /></label>
            <label className="text-sm text-slate-400">State<input value={form.state} onChange={(e) => update("state", e.target.value)} className="field mt-2" /></label>
            <label className="text-sm text-slate-400">Pincode<input value={form.pincode} onChange={(e) => update("pincode", e.target.value)} className="field mt-2" /></label>
            <label className="text-sm text-slate-400">PAN<input value={form.pan} onChange={(e) => update("pan", e.target.value)} className="field mt-2" /></label>
            <label className="text-sm text-slate-400">Aadhaar<input value={form.aadhaar} onChange={(e) => update("aadhaar", e.target.value)} className="field mt-2" /></label>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-4">
          <h3 className="mb-3 text-sm font-semibold text-white">Investment Settings</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <label className="text-sm text-slate-400">Return Rate<input type="number" value={form.rate} onChange={(e) => update("rate", e.target.value)} className="field mt-2" /></label>
            <label className="text-sm text-slate-400">Rate Type<select value={form.rate_type} onChange={(e) => update("rate_type", e.target.value)} className="field mt-2"><option value="monthly">Monthly</option><option value="annual">Annual</option></select></label>
            <label className="text-sm text-slate-400">Due Day<input type="number" min="1" max="28" value={form.due_day} onChange={(e) => update("due_day", e.target.value)} className="field mt-2" /></label>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button disabled={loading} type="submit" className="action">{loading ? "Creating..." : "Create Partner"}</button>
          {message && <span className={`text-sm ${message.includes("Account") ? "text-emerald-300" : "text-rose-300"}`}>{message}</span>}
        </div>
      </form>
    </div>
  );
}