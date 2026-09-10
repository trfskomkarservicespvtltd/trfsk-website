"use client";

import { useEffect, useState } from "react";

type KycRecord = {
  user_id: string;
  account_code: string;
  kyc_status: string;
  profiles: { full_name: string | null } | null;
  partner_details: Record<string, string | null> | null;
};

export default function KycApprovals() {
  const [records, setRecords] = useState<KycRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    const response = await fetch("/api/admin/kyc");
    const result = await response.json();
    if (response.ok) setRecords(result.data ?? []);
    else setMessage(result.error ?? "Could not load KYC records.");
    setLoading(false);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  async function review(userId: string, status: "verified" | "rejected") {
    setMessage("");
    const response = await fetch("/api/admin/kyc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, status }),
    });
    const result = await response.json();
    if (!response.ok) setMessage(result.error ?? "Could not update KYC status.");
    else await load();
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-8 px-6 py-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Admin review</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">KYC approvals</h1>
          <p className="mt-2 text-slate-400">Review partner details and documents before issuing the agreement.</p>
        </div>
        {message && <p className="rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200">{message}</p>}
        {loading ? <p className="text-slate-500">Loading KYC records...</p> : records.length === 0 ? <p className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-center text-slate-500">No KYC submissions yet.</p> : (
          <div className="space-y-5">
            {records.map((record) => {
              const details = record.partner_details ?? {};
              return (
                <section key={record.user_id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <h2 className="text-lg font-semibold text-white">{record.profiles?.full_name || "Unnamed partner"}</h2>
                      <p className="mt-1 font-mono text-sm text-cyan-300">{record.account_code}</p>
                    </div>
                    <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase text-amber-200">{record.kyc_status}</span>
                  </div>
                  <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-3">
                    {[["Address", details.address], ["City", details.city], ["State", details.state], ["PAN", details.pan], ["Aadhaar", details.aadhaar], ["Bank", details.bank_name], ["Account holder", details.bank_account_name], ["Account number", details.bank_account_no], ["IFSC", details.ifsc]].map(([label, value]) => <p key={label}><span className="text-slate-500">{label}: </span>{value || "Not provided"}</p>)}
                  </div>
                    <div className="mt-5 flex gap-3 text-sm">
                      {details.pan_document_path && <a className="text-cyan-300 hover:text-cyan-200" href={`/api/admin/kyc/document?path=${encodeURIComponent(details.pan_document_path)}`} target="_blank">View PAN document</a>}
                      {details.aadhaar_document_path && <a className="text-cyan-300 hover:text-cyan-200" href={`/api/admin/kyc/document?path=${encodeURIComponent(details.aadhaar_document_path)}`} target="_blank">View Aadhaar document</a>}
                    </div>
                  {record.kyc_status === "submitted" && <div className="mt-6 flex gap-3"><button onClick={() => review(record.user_id, "verified")} className="action">Approve KYC</button><button onClick={() => review(record.user_id, "rejected")} className="rounded-lg border border-rose-400/30 px-4 py-2 text-sm font-semibold text-rose-300">Reject KYC</button></div>}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
