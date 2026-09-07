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
  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="rounded-lg bg-amber-400/10 p-2">
              <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-[0.2em] text-white">
              TRFSK <span className="text-amber-400">CONTROL</span>
            </span>
          </Link>
          
          <nav className="hidden items-center gap-6 lg:flex">
            <Link href="/admin" className="text-sm font-medium text-slate-400 hover:text-white">
              Dashboard
            </Link>
            <Link href="/admin/partners" className="text-sm font-medium text-slate-400 hover:text-white">
              Partners
            </Link>
            <Link href="/admin/transactions" className="text-sm font-medium text-slate-400 hover:text-white">
              Transactions
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/investor" className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800">
              Partner View
            </Link>
            <SignOutButton />
          </div>
        </div>
      </div>
      <main className="pt-16">
        {children}
      </main>
    </>
  );
}
