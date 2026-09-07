"use client";

import { FormEvent, useState, useEffect } from "react";
import { Wallet, ArrowDownLeft, ArrowUpRight, RefreshCw } from "lucide-react";

type WithdrawalRequest = {
  id: string;
  amount: number;
  status: string;
  payment_method: string | null;
  created_at: string;
  processed_at: string | null;
};

export default function FundActions({ accountId }: { accountId: string }) {
  const [activeTab, setActiveTab] = useState<"add" | "withdraw">("add");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [paymentReference, setPaymentReference] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [withdrawalHistory, setWithdrawalHistory] = useState<WithdrawalRequest[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (activeTab === "withdraw") {
      fetchWithdrawalHistory();
    }
  }, [activeTab]);

  async function fetchWithdrawalHistory() {
    setLoadingHistory(true);
    try {
      const res = await fetch("/api/partner/withdrawal");
      const data = await res.json();
      if (data.data) {
        setWithdrawalHistory(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch withdrawal history");
    }
    setLoadingHistory(false);
  }

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

  async function handleWithdrawalRequest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/partner/withdrawal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          payment_method: paymentMethod,
          payment_reference: paymentReference,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Withdrawal request submitted successfully.");
        setAmount("");
        setPaymentReference("");
        fetchWithdrawalHistory();
      } else {
        setMessage(data.error || "Failed to submit request");
      }
    } catch {
      setMessage("Network error. Please try again.");
    }
    setLoading(false);
  }

  const statusColors: Record<string, string> = {
    pending: "bg-amber-400/10 text-amber-300 border-amber-400/20",
    approved: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
    rejected: "bg-rose-400/10 text-rose-300 border-rose-400/20",
    completed: "bg-blue-400/10 text-blue-300 border-blue-400/20",
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-white">Fund Management</h2>
          <p className="mt-1 text-sm text-slate-500">Add funds or request withdrawals</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("add")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeTab === "add"
                ? "bg-blue-600 text-white"
                : "border border-slate-700 text-slate-400 hover:text-white"
            }`}
          >
            <ArrowDownLeft size={16} />
            Add Funds
          </button>
          <button
            onClick={() => setActiveTab("withdraw")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeTab === "withdraw"
                ? "bg-blue-600 text-white"
                : "border border-slate-700 text-slate-400 hover:text-white"
            }`}
          >
            <ArrowUpRight size={16} />
            Withdraw
          </button>
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "add" ? (
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
        ) : (
          <>
            <form onSubmit={handleWithdrawalRequest} className="space-y-4">
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
                <label className="text-sm text-slate-400">Preferred Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="field mt-2"
                >
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="upi">UPI</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-slate-400">Payment Reference (Optional)</label>
                <input
                  type="text"
                  value={paymentReference}
                  onChange={(e) => setPaymentReference(e.target.value)}
                  placeholder="Any reference notes"
                  className="field mt-2"
                />
              </div>
              <div className="flex items-center gap-4">
                <button disabled={loading} type="submit" className="action">
                  {loading ? "Submitting..." : "Request Withdrawal"}
                </button>
                {message && (
                  <span className={`text-sm ${message.includes("success") || message.includes("submitted") ? "text-cyan-300" : "text-rose-300"}`}>
                    {message}
                  </span>
                )}
              </div>
            </form>

            {activeTab === "withdraw" && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-semibold text-white">Withdrawal History</h3>
                  <button
                    onClick={fetchWithdrawalHistory}
                    className="flex items-center gap-1 text-sm text-slate-400 hover:text-cyan-400"
                  >
                    <RefreshCw size={14} />
                    Refresh
                  </button>
                </div>
                {loadingHistory ? (
                  <p className="mt-4 text-sm text-slate-500">Loading...</p>
                ) : withdrawalHistory.length > 0 ? (
                  <div className="mt-4 space-y-2">
                    {withdrawalHistory.map((req) => (
                      <div key={req.id} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-800/50 p-4">
                        <div>
                          <p className="font-semibold text-white">
                            ₹{new Intl.NumberFormat("en-IN").format(req.amount)}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(req.created_at).toLocaleDateString("en-IN")}
                          </p>
                        </div>
                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColors[req.status] || "bg-slate-700 text-slate-300"}`}>
                          {req.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-slate-500">No withdrawal requests yet.</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
