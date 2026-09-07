"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/browser";

export default function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const supabase = createClient();
    const authRedirectUrl = process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL ?? `${window.location.origin}/auth/callback`;
    const result = mode === "login"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName }, emailRedirectTo: authRedirectUrl },
        });

    if (result.error) {
      setMessage(result.error.message);
    } else if (mode === "signup" && !result.data.session) {
      setMessage("Check your email to confirm your account, then come back to sign in.");
    } else {
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", result.data.user?.id ?? "").maybeSingle();
      router.push(profile?.role === "admin" ? "/admin" : "/investor");
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-blue-950/20">
      <div className="mb-8 flex gap-6 border-b border-slate-800">
        {(["login", "signup"] as const).map((tab) => (
          <button key={tab} type="button" onClick={() => { setMode(tab); setMessage(""); }} className={`pb-3 text-sm font-semibold capitalize ${mode === tab ? "border-b-2 border-cyan-400 text-white" : "text-slate-500"}`}>
            {tab === "login" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>
      <h1 className="text-3xl font-semibold text-white">Your partner desk</h1>
      <p className="mt-2 text-sm leading-6 text-slate-400">Access your contribution history, approved monthly returns, and current account value.</p>
      <form onSubmit={submit} className="mt-8 space-y-5">
        {mode === "signup" && <label className="block text-sm text-slate-300">Full name<input required value={fullName} onChange={(event) => setFullName(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400" /></label>}
        <label className="block text-sm text-slate-300">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400" /></label>
        <label className="block text-sm text-slate-300">Password<input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400" /></label>
        {message && <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">{message}</p>}
        <button disabled={loading} className="w-full rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60">{loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create partner account"}</button>
      </form>
    </div>
  );
}