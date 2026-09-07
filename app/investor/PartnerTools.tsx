"use client";

import { FormEvent, useState } from "react";

type Details = Record<string, string>;

export default function PartnerTools({ details }: { details: Details }) {
  const [form, setForm] = useState(details);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  function update(key: string, value: string) { setForm((current) => ({ ...current, [key]: value })); }
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setMessage("");
    const response = await fetch("/api/partner/details", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const result = await response.json();
    setMessage(response.ok ? "Details submitted for review." : result.error ?? "Could not save details."); setSaving(false);
  }
  return <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><h2 className="text-lg font-semibold text-white">Partner details and KYC</h2><p className="mt-1 text-sm text-slate-500">Keep your records current for account servicing.</p></div><a href="/api/partner/agreement" className="w-fit rounded-lg border border-cyan-400/40 px-4 py-2 text-sm font-semibold text-cyan-300 hover:bg-cyan-400/10">Download agreement</a></div><form onSubmit={save} className="mt-6 grid gap-4 md:grid-cols-2">{[["address", "Full address"], ["city", "City"], ["state", "State"], ["pincode", "Pincode"], ["pan", "PAN number"], ["aadhaar", "Aadhaar number"], ["bank_name", "Bank name"], ["bank_account_name", "Account holder name"], ["bank_account_no", "Account number"], ["ifsc", "IFSC code"]].map(([key, label]) => <label key={key} className="text-sm text-slate-400">{label}<input value={form[key] ?? ""} onChange={(event) => update(key, event.target.value)} className="field mt-2" /></label>)}<div className="flex items-center gap-4 md:col-span-2"><button disabled={saving} className="action w-fit">{saving ? "Saving..." : "Save details"}</button>{message && <span className="text-sm text-cyan-300">{message}</span>}</div></form></section>;
}