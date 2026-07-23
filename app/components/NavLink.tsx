"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  label: string;
}

export default function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`transition-all duration-300 font-medium hover:text-blue-500 ${
        active
          ? "text-blue-500"
          : "text-gray-300"
      }`}
    >
      {label}
    </Link>
  );
}