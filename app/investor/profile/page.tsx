import { requireUser } from "@/app/lib/auth";
import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";
import { ArrowLeft, User, Mail, Phone, MapPin, Building, CreditCard, FileText } from "lucide-react";

export default async function ProfilePage() {
  const user = await requireUser();
  const supabase = await createClient();
  
  const [{ data: profile }, { data: account }, { data: details }] = await Promise.all([
    supabase.from("profiles").select("full_name, email, created_at").eq("id", user.id).single(),
    supabase.from("investor_accounts").select("account_code, status, currency, rate, rate_type, due_day").eq("user_id", user.id).single(),
    supabase.from("partner_details").select("*").eq("user_id", user.id).maybeSingle(),
  ]);

  if (!account) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white">Account Not Found</h1>
          <p className="mt-2 text-slate-400">Your account is not linked yet.</p>
          <Link href="/investor" className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: account.currency }).format(value);

  const statusColors: Record<string, string> = {
    active: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
    paused: "bg-amber-400/10 text-amber-300 border-amber-400/30",
    closed: "bg-slate-400/10 text-slate-300 border-slate-400/30",
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
        
        <div className="flex items-center gap-4">
          <Link href="/investor" className="rounded-lg border border-slate-700 p-2 text-slate-400 hover:text-white">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Partner Portal</p>
            <h1 className="mt-1 text-3xl font-semibold text-white">My Profile</h1>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Personal Information */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-full bg-cyan-400/10 p-2">
                <User className="text-cyan-400" size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Personal Information</h2>
                <p className="text-sm text-slate-500">Your account details</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <ProfileField label="Full Name" value={profile?.full_name || "Not provided"} icon={User} />
              <ProfileField label="Email" value={user.email || "Not provided"} icon={Mail} />
              <ProfileField 
                label="Member Since" 
                value={profile?.created_at ? new Date(profile.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "N/A"} 
                icon={Calendar} 
              />
            </div>
          </div>

          {/* Investment Account */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-full bg-emerald-400/10 p-2">
                <CreditCard className="text-emerald-400" size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Investment Account</h2>
                <p className="text-sm text-slate-500">Your investment details</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <ProfileField label="Account Code" value={account.account_code} icon={FileText} mono />
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Status</span>
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusColors[account.status]}`}>
                  {account.status}
                </span>
              </div>
              <ProfileField label="Currency" value={account.currency} icon={Building} />
              <ProfileField label="Return Rate" value={`${account.rate}% ${account.rate_type === "annual" ? "per annum" : "monthly"}`} icon={TrendingUp} />
              <ProfileField label="Due Day" value={`${account.due_day} of each month`} icon={Calendar} />
            </div>
          </div>
        </div>

        {/* Banking Details */}
        {details && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-full bg-blue-400/10 p-2">
                <Building className="text-blue-400" size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Banking Details</h2>
                <p className="text-sm text-slate-500">Your linked bank account</p>
              </div>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {details.bank_name && <ProfileField label="Bank Name" value={details.bank_name} icon={Building} />}
              {details.bank_account_name && <ProfileField label="Account Holder" value={details.bank_account_name} icon={User} />}
              {details.bank_account_no && <ProfileField label="Account Number" value={`****${details.bank_account_no.slice(-4)}`} icon={CreditCard} />}
              {details.ifsc && <ProfileField label="IFSC Code" value={details.ifsc} icon={FileText} mono />}
            </div>
          </div>
        )}

        {/* Address Details */}
        {details && (details.address || details.city || details.state) && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-full bg-amber-400/10 p-2">
                <MapPin className="text-amber-400" size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Address</h2>
                <p className="text-sm text-slate-500">Your registered address</p>
              </div>
            </div>
            
            <div className="space-y-2 text-slate-300">
              {details.address && <p>{details.address}</p>}
              {(details.city || details.state || details.pincode) && (
                <p className="text-slate-500">
                  {[details.city, details.state, details.pincode].filter(Boolean).join(", ")}
                </p>
              )}
            </div>
          </div>
        )}

        {/* KYC Details */}
        {details && (details.pan || details.aadhaar) && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-full bg-purple-400/10 p-2">
                <FileText className="text-purple-400" size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">KYC Documents</h2>
                <p className="text-sm text-slate-500">Your verified documents</p>
              </div>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {details.pan && <ProfileField label="PAN" value={details.pan} icon={FileText} mono />}
              {details.aadhaar && <ProfileField label="Aadhaar" value={`****${details.aadhaar.slice(-4)}`} icon={FileText} mono />}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function ProfileField({ label, value, icon: Icon, mono = false }: { label: string; value: string; icon: React.ComponentType<{ size?: number }>; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Icon size={16} />
        <span>{label}</span>
      </div>
      <span className={`font-medium text-slate-300 ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}

function TrendingUp({ size = 16 }: { size?: number }) {
  return (
    <svg className="text-emerald-400" width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

function Calendar({ size = 16 }: { size?: number }) {
  return (
    <svg className="text-slate-400" width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
