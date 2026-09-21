import type { Metadata } from "next";
import { requireAdmin } from "@/app/lib/auth";

export const metadata: Metadata = {
  title: "Admin Control Room | TRFSK",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return children;
}
