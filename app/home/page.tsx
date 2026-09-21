import { requireUser } from "@/app/lib/auth";
import { getPerformanceEntries } from "@/app/lib/performance";
import HomeDashboard from "./HomeDashboard";
import { createClient } from "@/app/lib/supabase/server";

export default async function HomePage() {
  await requireUser();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();
  const configuredAdminEmail = (process.env.ADMIN_PORTAL_EMAIL ?? "omkar@admin.com").toLowerCase();
  const isAdmin = profile?.role === "admin" || user?.email?.toLowerCase() === configuredAdminEmail;
  const entries = await getPerformanceEntries();
  const { data: accounts } = isAdmin
    ? await supabase.from("investor_accounts").select("id, profiles!inner(full_name)").order("created_at", { ascending: false })
    : { data: [] };
  const partnerAccounts = (accounts ?? []).map((account) => {
    const profile = Array.isArray(account.profiles) ? account.profiles[0] : account.profiles;
    return { id: account.id, name: profile?.full_name || "Unnamed partner" };
  });
  return <HomeDashboard entries={entries} isAdmin={isAdmin} partnerAccounts={partnerAccounts} />;
}
