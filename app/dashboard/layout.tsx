import DashboardSidebar from "../_components/sidebar/dashboard-sidebar";
import "@/app/styles/Dashboard.css";
import DashboardNavbar from "../_components/navbar/dashboard-navbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full grid grid-cols-[70px_auto]">
      <DashboardSidebar />

      <div id="dashboard-content" className="relative overflow-y-auto">
        <DashboardNavbar />

        <div className="overflow-y-auto max-h-screen mt-[65px] p-4">{children}</div>
      </div>
    </main>
  );
}
