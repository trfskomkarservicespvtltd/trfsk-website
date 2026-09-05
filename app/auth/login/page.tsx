import LoginForm from "./LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Login | TRFSK",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <section className="flex min-h-[calc(100vh-6rem)] items-center justify-center bg-[radial-gradient(circle_at_top_right,#164e63,transparent_38%),#020617] px-6 py-16"><LoginForm /></section>;
}