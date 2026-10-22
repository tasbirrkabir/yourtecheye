import type { Metadata } from "next";
import { isAdmin } from "@/lib/admin-auth";
import { AdminLogin } from "@/components/admin/admin-login";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "YTE Admin: Field notes editor",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authed = await isAdmin();
  return (
    <main id="main-content" className="min-h-screen bg-secondary/60">
      {authed ? <AdminDashboard /> : <AdminLogin />}
    </main>
  );
}
