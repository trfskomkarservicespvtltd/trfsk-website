import { requireUser } from "@/app/lib/auth";
import { getPerformanceEntries } from "@/app/lib/performance";
import HomeDashboard from "./HomeDashboard";
import { createClient } from "@/app/lib/supabase/browser";

export default async function HomePage() {
  await requireUser();
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user?.id)
    .single();
  const configuredAdminEmail = (process.env.ADMIN_PORTAL_EMAIL ?? "omkar@admin.com").toLowerCase();
  const isAdmin = profile?.role === "admin" || user?.email?.toLowerCase() === configuredAdminEmail;
  const entries = await getPerformanceEntries();
  return <HomeDashboard entries={entries} isAdmin={isAdmin} />;
}
