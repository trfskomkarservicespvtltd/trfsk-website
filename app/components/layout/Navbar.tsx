"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, LayoutDashboard, Receipt, User, LogOut, Settings, Shield } from "lucide-react";
import NavLink from "../NavLink";
import { createClient } from "@/app/lib/supabase/browser";

type UserRole = "investor" | "admin" | null;

interface NavItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ size?: number }>;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    
    async function getUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setSignedIn(true);
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        setUserRole(profile?.role || "investor");
      } else {
        setSignedIn(false);
        setUserRole(null);
      }
      setLoading(false);
    }
    
    getUserData();
    
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setSignedIn(true);
        supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single()
          .then(({ data: profile }) => {
            setUserRole(profile?.role || "investor");
          });
      } else {
        setSignedIn(false);
        setUserRole(null);
      }
    });
    
    return () => listener.subscription.unsubscribe();
  }, []);

  const publicLinks: NavItem[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/knowledge-center", label: "Knowledge Center" },
    { href: "/contact", label: "Contact" },
  ];

  const moreLinks: NavItem[] = [
    { href: "/blog", label: "Blog" },
    { href: "/team", label: "Team" },
    { href: "/partnerships", label: "Partnerships" },
  ];

  const partnerLinks: NavItem[] = [
    { href: "/investor", label: "Dashboard", icon: LayoutDashboard },
    { href: "/investor/transactions", label: "Transactions", icon: Receipt },
    { href: "/investor/profile", label: "Profile", icon: User },
  ];

  const adminLinks: NavItem[] = [
    { href: "/admin", label: "Control Panel", icon: Shield },
    { href: "/admin/partners", label: "All Partners", icon: User },
    { href: "/admin/transactions", label: "All Transactions", icon: Receipt },
  ];

  if (loading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="h-14 w-32 bg-slate-800 animate-pulse rounded" />
        </div>
      </header>
    );
  }

  const displayLinks = signedIn ? (userRole === "admin" ? adminLinks : partnerLinks) : publicLinks;
  const showGetStarted = !signedIn;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo-navbar.png"
            alt="TRFSK Omkar Services"
            width={474}
            height={286}
            priority
            className="h-14 w-auto object-contain sm:h-16"
          />
        </Link>

        {/* Desktop */}

        <nav className="hidden lg:flex items-center gap-8">

          {displayLinks.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
            />
          ))}

          {!signedIn && (
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-300 hover:text-blue-400 transition">
                More
                <ChevronDown size={16} />
              </button>

              <div className="absolute right-0 top-8 hidden min-w-[220px] rounded-2xl border border-slate-800 bg-slate-900 p-3 shadow-2xl group-hover:block">
                {moreLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-4 py-3 text-gray-300 transition hover:bg-slate-800 hover:text-blue-400"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </nav>

        {/* CTA */}

        <div className="hidden lg:block">
          <div className="flex items-center gap-3">
            {signedIn ? (
              <>
                <Link href={userRole === "admin" ? "/admin" : "/investor"} className="px-3 py-3 text-sm font-semibold text-slate-300 transition hover:text-cyan-400">
                  {userRole === "admin" ? "Control Panel" : "Dashboard"}
                </Link>
                <form action="/auth/signout" method="post" className="inline">
                  <button type="submit" className="px-3 py-3 text-sm font-semibold text-slate-300 transition hover:text-cyan-400 flex items-center gap-2">
                    <LogOut size={16} />
                    Log out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="px-3 py-3 text-sm font-semibold text-slate-300 transition hover:text-cyan-400">
                  Partner Login
                </Link>
                <Link href="/get-started" className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>

      {mobileOpen && (

        <div className="border-t border-slate-800 bg-slate-950 lg:hidden">

          <div className="space-y-1 p-6">

            {/* Authenticated Navigation */}
            {signedIn && (
              <>
                <div className="mb-4 px-4 py-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {userRole === "admin" ? "Admin" : "Partner"}
                  </p>
                </div>
                {displayLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-300 hover:bg-slate-900 hover:text-blue-400"
                  >
                    {item.icon && <item.icon size={20} />}
                    {item.label}
                  </Link>
                ))}
                <div className="border-t border-slate-800 pt-4 mt-4">
                  <form action="/auth/signout" method="post">
                    <button type="submit" className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-gray-300 hover:bg-slate-900 hover:text-red-400">
                      <LogOut size={20} />
                      Log out
                    </button>
                  </form>
                </div>
              </>
            )}

            {/* Public Navigation */}
            {!signedIn && (
              <>
                {[...publicLinks, ...moreLinks].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-4 py-3 text-gray-300 hover:bg-slate-900 hover:text-blue-400"
                  >
                    {item.label}
                  </Link>
                ))}
                
                <div className="mt-4 space-y-3">
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl border border-slate-800 py-3 text-center font-semibold text-slate-200"
                  >
                    Partner Login
                  </Link>
                  <Link
                    href="/get-started"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl bg-blue-600 py-3 text-center font-semibold text-white"
                  >
                    Get Started
                  </Link>
                </div>
              </>
            )}

          </div>

        </div>

      )}

    </header>
  );
}
