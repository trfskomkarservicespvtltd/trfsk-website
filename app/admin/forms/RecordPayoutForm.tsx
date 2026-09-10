"use client";

import { FormEvent, useState } from "react";

type Account = { id: string; account_code: string; user_id: string; partnerName: string };

export default function RecordPayoutForm({ accounts }: { accounts: Account[] }) {
  const [form, setForm] = useState({
    account_id: "",
    amount: "",
    period_start: "",
    period_end: "",
    transaction_reference: "",
    notes: "",
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
      const res = await fetch("/api/admin/payouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Payout recorded successfully.");
        setForm({ account_id: "", amount: "", period_start: "", period_end: "", transaction_reference: "", notes: "" });
      } else {
        setMessage(data.error || "Failed to record payout");
      }
    } catch {
      setMessage("Network error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <h2 className="text-lg font-semibold text-white">Record Monthly Payout</h2>
      <p className="mt-1 text-sm text-slate-500">Post a payout with transaction reference. This appears in partner dashboard and transaction history.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-slate-400">Partner Account<select value={form.account_id} onChange={(e) => update("account_id", e.target.value)} required className="field mt-2"><option value="">Select partner</option>{accounts.map((a) => (<option key={a.id} value={a.id}>{a.partnerName} ({a.account_code})</option>))}</select></label>
          <label className="text-sm text-slate-400">Payout Amount (INR)<input type="number" value={form.amount} onChange={(e) => update("amount", e.target.value)} required className="field mt-2" /></label>
          <label className="text-sm text-slate-400">Period Start<input type="date" value={form.period_start} onChange={(e) => update("period_start", e.target.value)} required className="field mt-2" /></label>
          <label className="text-sm text-slate-400">Period End<input type="date" value={form.period_end} onChange={(e) => update("period_end", e.target.value)} required className="field mt-2" /></label>
          <label className="text-sm text-slate-400">Transaction Reference<input value={form.transaction_reference} onChange={(e) => update("transaction_reference", e.target.value)} className="field mt-2" /></label>
          <label className="text-sm text-slate-400">Notes<input value={form.notes} onChange={(e) => update("notes", e.target.value)} className="field mt-2" /></label>
        </div>
        <div className="flex items-center gap-4">
          <button disabled={loading} type="submit" className="action">{loading ? "Recording..." : "Record Payout"}</button>
          {message && <span className={`text-sm ${message.includes("success") ? "text-emerald-300" : "text-rose-300"}`}>{message}</span>}
        </div>
      </form>
    </div>
  );
}