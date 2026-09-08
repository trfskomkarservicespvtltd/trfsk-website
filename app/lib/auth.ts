import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  const supabase = await createClient();
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  const configuredAdminEmail = (process.env.ADMIN_PORTAL_EMAIL ?? "omkar@admin.com").toLowerCase();
  const isConfiguredAdmin = user.email?.toLowerCase() === configuredAdminEmail;
  if (profile?.role !== "admin" && !isConfiguredAdmin) redirect("/investor");
  return user;
}