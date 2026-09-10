"use client";

import { FormEvent, useState } from "react";

type Details = Record<string, string>;

export default function PartnerTools({ details, kycStatus }: { details: Details; kycStatus: string }) {
  const [form, setForm] = useState(details);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState("");
  function update(key: string, value: string) { setForm((current) => ({ ...current, [key]: value })); }
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setMessage("");
    const response = await fetch("/api/partner/details", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const result = await response.json();
    setMessage(response.ok ? "Details submitted for review." : result.error ?? "Could not save details."); setSaving(false);
  }
  async function upload(type: "pan" | "aadhaar", file: File | undefined) { if (!file) return; setUploading(type); const data = new FormData(); data.set("type", type); data.set("file", file); const response = await fetch("/api/partner/documents", { method: "POST", body: data }); const result = await response.json(); setMessage(response.ok ? `${type.toUpperCase()} document uploaded.` : result.error ?? "Upload failed."); setUploading(""); }
  const submitted = kycStatus === "submitted";
  const verified = kycStatus === "verified";
  return <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><h2 className="text-lg font-semibold text-white">Partner details and KYC</h2><p className="mt-1 text-sm text-slate-500">{submitted ? "Your KYC details are pending admin approval." : verified ? "Your KYC is approved." : "Complete your details for KYC review."}</p></div>{verified && <a href="/api/partner/agreement" className="w-fit rounded-lg border border-cyan-400/40 px-4 py-2 text-sm font-semibold text-cyan-300 hover:bg-cyan-400/10">Download agreement</a>}</div><form onSubmit={save} className="mt-6 grid gap-4 md:grid-cols-2">{[["address", "Full address"], ["city", "City"], ["state", "State"], ["pincode", "Pincode"], ["pan", "PAN number"], ["aadhaar", "Aadhaar number"], ["bank_name", "Bank name"], ["bank_account_name", "Account holder name"], ["bank_account_no", "Account number"], ["ifsc", "IFSC code"]].map(([key, label]) => <label key={key} className="text-sm text-slate-400">{label}<input disabled={submitted || verified} value={form[key] ?? ""} onChange={(event) => update(key, event.target.value)} className="field mt-2 disabled:opacity-60" /></label>)}<label className="text-sm text-slate-400">PAN document<input disabled={submitted || verified} type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" onChange={(event) => upload("pan", event.target.files?.[0])} className="field mt-2 disabled:opacity-60" /></label><label className="text-sm text-slate-400">Aadhaar document<input disabled={submitted || verified} type="file" accept=".jpg,.jpeg,.png,.webp,.pdf" onChange={(event) => upload("aadhaar", event.target.files?.[0])} className="field mt-2 disabled:opacity-60" /></label>{!submitted && !verified && <div className="flex items-center gap-4 md:col-span-2"><button disabled={saving} className="action w-fit">{saving ? "Saving..." : "Submit for approval"}</button>{uploading && <span className="text-sm text-slate-400">Uploading {uploading}...</span>}{message && <span className="text-sm text-cyan-300">{message}</span>}</div>}</form></section>;
}