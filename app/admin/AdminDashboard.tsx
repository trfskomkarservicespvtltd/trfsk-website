"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, TrendingUp, Users, Wallet, ArrowUpDown, Search, Filter, Eye } from "lucide-react";

type WithdrawalRequest = {
  id: string;
  amount: number;
  status: string;
  payment_method: string | null;
  created_at: string;
  investor_accounts: {
    account_code: string;
    profiles: { full_name: string; email: string };
  };
};

type FundAdditionRequest = {
  id: string;
  amount: number;
  status: string;
  payment_method: string | null;
  created_at: string;
  investor_accounts: {
    account_code: string;
    profiles: { full_name: string; email: string };
  };
};

export default function AdminDashboard() {
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [fundAdditions, setFundAdditions] = useState<FundAdditionRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"withdrawals" | "additions">("withdrawals");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/funds");
      const data = await res.json();
      if (data.withdrawals) setWithdrawals(data.withdrawals);
      if (data.fund_additions) setFundAdditions(data.fund_additions);
    } catch (error) {
      console.error("Failed to fetch requests");
    }
    setLoading(false);
  }

  async function handleAction(id: string, type: "withdrawal" | "fund_addition", action: "approve" | "reject" | "complete", rejectionReason?: string) {
    setProcessing(id);
    try {
      const res = await fetch("/api/admin/funds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, action, id, rejection_reason: rejectionReason }),
      });
      if (res.ok) {
        fetchRequests();
      }
    } catch (error) {
      console.error("Action failed");
    }
    setProcessing(null);
  }

  const pendingWithdrawals = withdrawals.filter((w) => w.status === "pending");
  const pendingAdditions = fundAdditions.filter((f) => f.status === "pending");

  const filteredRequests = activeTab === "withdrawals" ? withdrawals : fundAdditions;
  const filtered = filteredRequests.filter((req) => {
    const matchesSearch = searchTerm === "" || 
      req.investor_accounts?.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.investor_accounts?.account_code?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors: Record<string, string> = {
    pending: "bg-amber-400/10 text-amber-300 border-amber-400/30",
    approved: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
    rejected: "bg-rose-400/10 text-rose-300 border-rose-400/30",
    completed: "bg-blue-400/10 text-blue-300 border-blue-400/30",
  };

  const formatCurrency = (amount: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-500/10 to-amber-600/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Pending Withdrawals</p>
              <p className="mt-2 text-3xl font-bold text-white">{pendingWithdrawals.length}</p>
            </div>
            <div className="rounded-full bg-amber-400/10 p-3">
              <Clock className="text-amber-400" size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Pending Additions</p>
              <p className="mt-2 text-3xl font-bold text-white">{pendingAdditions.length}</p>
            </div>
            <div className="rounded-full bg-cyan-400/10 p-3">
              <TrendingUp className="text-cyan-400" size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Withdrawals</p>
              <p className="mt-2 text-3xl font-bold text-white">
                {formatCurrency(withdrawals.filter((w) => w.status !== "rejected").reduce((sum, w) => sum + w.amount, 0))}
              </p>
            </div>
            <div className="rounded-full bg-emerald-400/10 p-3">
              <ArrowUpDown className="text-emerald-400" size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Additions</p>
              <p className="mt-2 text-3xl font-bold text-white">
                {formatCurrency(fundAdditions.filter((f) => f.status !== "rejected").reduce((sum, f) => sum + f.amount, 0))}
              </p>
            </div>
            <div className="rounded-full bg-blue-400/10 p-3">
              <Wallet className="text-blue-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("withdrawals")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                activeTab === "withdrawals"
                  ? "bg-rose-600 text-white"
                  : "border border-slate-700 text-slate-400 hover:text-white"
              }`}
            >
              <ArrowUpDown size={16} />
              Withdrawals
              {pendingWithdrawals.length > 0 && (
                <span className="ml-1 rounded-full bg-amber-400 px-2 py-0.5 text-xs text-black">
                  {pendingWithdrawals.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("additions")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                activeTab === "additions"
                  ? "bg-cyan-600 text-white"
                  : "border border-slate-700 text-slate-400 hover:text-white"
              }`}
            >
              <TrendingUp size={16} />
              Fund Additions
              {pendingAdditions.length > 0 && (
                <span className="ml-1 rounded-full bg-amber-400 px-2 py-0.5 text-xs text-black">
                  {pendingAdditions.length}
                </span>
              )}
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="Search partner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="field pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="field"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent"></div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-500">No requests found</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="pb-4 pr-4">Partner</th>
                  <th className="pb-4 pr-4">Account</th>
                  <th className="pb-4 pr-4">Amount</th>
                  <th className="pb-4 pr-4">Method</th>
                  <th className="pb-4 pr-4">Status</th>
                  <th className="pb-4 pr-4">Date</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-800/50">
                    <td className="py-4 pr-4">
                      <div>
                        <p className="font-semibold text-white">{req.investor_accounts?.profiles?.full_name || "Unknown"}</p>
                        <p className="text-xs text-slate-500">{req.investor_accounts?.profiles?.email}</p>
                      </div>
                    </td>
                    <td className="py-4 pr-4 font-mono text-cyan-400">
                      {req.investor_accounts?.account_code}
                    </td>
                    <td className="py-4 pr-4 font-semibold text-white">
                      {formatCurrency(req.amount)}
                    </td>
                    <td className="py-4 pr-4 text-slate-400">
                      {req.payment_method?.replace("_", " ") || "N/A"}
                    </td>
                    <td className="py-4 pr-4">
                      <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusColors[req.status] || ""}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-slate-400">
                      {new Date(req.created_at).toLocaleDateString("en-IN")}
                    </td>
                    <td className="py-4">
                      {req.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAction(req.id, activeTab === "withdrawals" ? "withdrawal" : "fund_addition", "approve")}
                            disabled={processing === req.id}
                            className="flex items-center gap-1 rounded-lg bg-emerald-600/20 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-600/30 disabled:opacity-50"
                          >
                            <CheckCircle size={14} />
                            {processing === req.id ? "Processing..." : "Approve"}
                          </button>
                          <button
                            onClick={() => {
                              const reason = prompt("Enter rejection reason:");
                              if (reason) {
                                handleAction(req.id, activeTab === "withdrawals" ? "withdrawal" : "fund_addition", "reject", reason);
                              }
                            }}
                            disabled={processing === req.id}
                            className="flex items-center gap-1 rounded-lg bg-rose-600/20 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:bg-rose-600/30 disabled:opacity-50"
                          >
                            <XCircle size={14} />
                            Reject
                          </button>
                        </div>
                      )}
                      {req.status === "approved" && activeTab === "withdrawals" && (
                        <button
                          onClick={() => handleAction(req.id, "withdrawal", "complete")}
                          disabled={processing === req.id}
                          className="flex items-center gap-1 rounded-lg bg-blue-600/20 px-3 py-1.5 text-xs font-semibold text-blue-400 hover:bg-blue-600/30 disabled:opacity-50"
                        >
                          <CheckCircle size={14} />
                          Mark Complete
                        </button>
                      )}
                      {(req.status === "approved" || req.status === "completed" || req.status === "rejected") && (
                        <span className="text-xs text-slate-500">
                          {req.status === "approved" ? "Approved" : req.status === "completed" ? "Completed" : "Rejected"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
