"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminForms({ accounts }: { accounts: { id: string; account_code: string }[] }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>, endpoint: string, fields: Record<string, string>) {
    event.preventDefault(); setMessage("");
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(fields) });
    const result = await response.json();
    setMessage(response.ok ? "Saved successfully." : result.error ?? "Could not save record.");
    if (response.ok) { event.currentTarget.reset(); router.refresh(); }
  }
  return <div className="grid gap-6"><form onSubmit={(event) => { const form = new FormData(event.currentTarget); return submit(event, "/api/admin/ledger", { accountId: String(form.get("accountId")), entryType: String(form.get("entryType")), amount: String(form.get("amount")), effectiveAt: new Date(String(form.get("effectiveAt"))).toISOString(), reference: String(form.get("reference")), notes: String(form.get("notes")) }); }} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6"><h2 className="text-lg font-semibold text-white">Post ledger entry</h2><p className="mt-1 text-sm text-slate-500">Partner accounts are created automatically. Add contributions, withdrawals, adjustments, and monthly returns here.</p><div className="mt-5 grid gap-4 md:grid-cols-2"><select name="accountId" required className="field"><option value="">Select account</option>{accounts.map((account) => <option key={account.id} value={account.id}>{account.account_code}</option>)}</select><select name="entryType" required className="field"><option value="contribution">Contribution</option><option value="return">Monthly return</option><option value="withdrawal">Withdrawal</option><option value="adjustment">Adjustment</option></select><input name="amount" required type="number" min="0.01" step="0.01" placeholder="Amount" className="field" /><input name="effectiveAt" required type="datetime-local" className="field" /><input name="reference" required placeholder="Unique reference e.g. RET-2026-09-1001" className="field md:col-span-2" /><textarea name="notes" placeholder="Notes (optional)" className="field min-h-20 md:col-span-2" /><button className="action md:col-span-2">Post entry</button></div></form>{message && <p className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-200">{message}</p>}</div>;
}