"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/browser";

export default function LiveRefresh({ accountId }: { accountId: string }) {
  const router = useRouter();
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase.channel(`investor-${accountId}`).on("postgres_changes", { event: "*", schema: "public", table: "ledger_entries", filter: `account_id=eq.${accountId}` }, () => router.refresh()).on("postgres_changes", { event: "*", schema: "public", table: "return_periods", filter: `account_id=eq.${accountId}` }, () => router.refresh()).subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [accountId, router]);
  return null;
}