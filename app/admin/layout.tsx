import Link from "next/link";
import type { Metadata } from "next";
import { requireAdmin } from "@/app/lib/auth";
import SignOutButton from "@/app/components/auth/SignOutButton";

export const metadata: Metadata = {
  title: "Admin Control Room | TRFSK",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return <div className="min-h-screen bg-slate-950"><header className="border-b border-slate-800 bg-slate-950/90"><div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5"><Link href="/admin" className="text-xl font-bold tracking-[0.2em] text-white">TRFSK <span className="text-amber-300">CONTROL</span></Link><div className="flex items-center gap-4"><Link href="/investor" className="text-sm text-slate-400 hover:text-white">Investor view</Link><SignOutButton /></div></div></header><main className="mx-auto max-w-7xl px-6 py-10">{children}</main></div>;
}