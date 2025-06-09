import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/dashboard/dataTable";
import { fetchEmailList } from "@/services/fetchEmail";
import { authOptions } from "@/lib/auth";
import TableSkeleton from "@/components/dashboard/TableSkeleton";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/admin/login");
  }

  const data = fetchEmailList({ page: 1, limit: 10 });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">관리자 대시보드</h1>
          <div className="mt-6">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">이메일 구독자 관리</h3>
                <Suspense fallback={<TableSkeleton />}>
                  <DataTable subscriptPromise={data} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
