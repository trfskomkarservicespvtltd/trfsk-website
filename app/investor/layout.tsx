import type { Metadata } from "next";
import { requireUser } from "@/app/lib/auth";

export const metadata: Metadata = {
  title: "Partner Dashboard | TRFSK",
  robots: { index: false, follow: false },
};

export default async function InvestorLayout({ children }: { children: React.ReactNode }) {
  await requireUser();
  return <>{children}</>;
}