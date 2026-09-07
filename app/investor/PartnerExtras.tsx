"use client";

import { useEffect, useState } from "react";

export default function PartnerExtras({ accountCode }: { accountCode: string }) {
  const [copied, setCopied] = useState(false);
  const [referralLink, setReferralLink] = useState("");
  const referralCode = accountCode.replace(/[^A-Z0-9]/gi, "").slice(-10).toUpperCase();

  useEffect(() => {
    setReferralLink(`${window.location.origin}/auth/login?ref=${referralCode}`);
  }, [referralCode]);

  async function copyReferralLink() {
    if (!referralLink) return;
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return <div className="grid gap-6 lg:grid-cols-2">
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">Partner benefit</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Referral Program</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">Invite a trusted partner to explore TRFSK. Share your referral link and we will connect their enquiry to your partner profile.</p>
        </div>
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">Active</span>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3">
          <p className="text-xs uppercase tracking-wider text-slate-500">Your referral code</p>
          <p className="mt-1 font-mono text-lg tracking-[0.2em] text-white">{referralCode}</p>
        </div>
        <button type="button" onClick={copyReferralLink} className="rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300">{copied ? "Copied" : "Copy invite link"}</button>
      </div>
    </section>

    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">Explore</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Current Opportunities</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">Review opportunities currently available through the TRFSK partner team.</p>
        </div>
        <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200">Updates monthly</span>
      </div>
      <div className="mt-6 space-y-3">
        <Opportunity title="Managed growth account" detail="Structured monthly-return opportunity" status="Open for review" />
        <Opportunity title="Business expansion pool" detail="Partner-led capital deployment" status="Coming soon" />
      </div>
    </section>
  </div>;
}

function Opportunity({ title, detail, status }: { title: string; detail: string; status: string }) {
  return <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3"><div><p className="text-sm font-semibold text-slate-200">{title}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></div><span className="shrink-0 text-xs font-semibold text-emerald-300">{status}</span></div>;
}