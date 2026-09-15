import { requireAdmin } from "@/app/lib/auth";
import { getPerformanceEntries } from "@/app/lib/performance";
import HomeDashboard from "./HomeDashboard";

export default async function HomePage() {
  await requireAdmin();
  const entries = await getPerformanceEntries();
  return <HomeDashboard entries={entries} isAdmin />;
}
