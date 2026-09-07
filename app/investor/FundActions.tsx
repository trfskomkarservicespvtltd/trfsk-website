"use client";

import { FormEvent, useState } from "react";
import { Wallet, ArrowDownLeft } from "lucide-react";

export default function FundActions({ accountId }: { accountId: string }) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [paymentReference, setPaymentReference] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAddFunds(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/partner/details", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fund_addition_request: true,
          amount: parseFloat(amount),
          payment_method: paymentMethod,
          payment_reference: paymentReference,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Fund addition request submitted. Admin will review and process.");
        setAmount("");
        setPaymentReference("");
      } else {
        setMessage(data.error || "Failed to submit request");
      }
    } catch {
      setMessage("Network error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-full bg-emerald-400/10 p-2">
          <Wallet className="text-emerald-400" size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Add Funds</h2>
          <p className="text-sm text-slate-500">Submit a fund addition request for admin review</p>
        </div>
      </div>

      <form onSubmit={handleAddFunds} className="space-y-4">
        <div>
          <label className="text-sm text-slate-400">Amount (INR)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="1000"
            required
            className="field mt-2"
          />
        </div>
        <div>
          <label className="text-sm text-slate-400">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="field mt-2"
          >
            <option value="upi">UPI</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="cash">Cash</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-slate-400">Payment Reference (Transaction ID)</label>
          <input
            type="text"
            value={paymentReference}
            onChange={(e) => setPaymentReference(e.target.value)}
            placeholder="Enter transaction ID"
            className="field mt-2"
          />
        </div>
        <div className="flex items-center gap-4">
          <button disabled={loading} type="submit" className="action">
            {loading ? "Submitting..." : "Submit Request"}
          </button>
          {message && (
            <span className={`text-sm ${message.includes("success") || message.includes("submitted") ? "text-cyan-300" : "text-rose-300"}`}>
              {message}
            </span>
          )}
        </div>
      </form>

      <div className="mt-6 rounded-xl border border-slate-700 bg-slate-800/30 p-4">
        <p className="text-sm text-slate-400">
          <span className="font-semibold text-amber-400">Note:</span> Withdrawals are processed by admin only. Contact support if you need assistance with fund withdrawals.
        </p>
      </div>
    </section>
  );
}
