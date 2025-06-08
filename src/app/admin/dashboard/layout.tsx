import "@/app/globals.css";
import { Sidebar } from "@/shared/ui";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
