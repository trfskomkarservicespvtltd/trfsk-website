import Link from "next/link";
import type { Metadata } from "next";
import { requireUser } from "@/app/lib/auth";
import SignOutButton from "@/app/components/auth/SignOutButton";

export const metadata: Metadata = {
  title: "Investor Desk | TRFSK",
  robots: { index: false, follow: false },
};

export default async function InvestorLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  return <div className="min-h-screen bg-slate-950"><header className="border-b border-slate-800 bg-slate-950/90"><div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5"><Link href="/investor" className="text-xl font-bold tracking-[0.2em] text-white">TRFSK <span className="text-cyan-400">DESK</span></Link><div className="flex items-center gap-4"><span className="hidden text-sm text-slate-500 sm:block">{user.email}</span><SignOutButton /></div></div></header><main className="mx-auto max-w-7xl px-6 py-10">{children}</main></div>;
}