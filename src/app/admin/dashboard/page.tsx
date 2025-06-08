// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { use, useEffect } from "react";
import { Suspense } from "react";
import { DataTable } from "@/components/dashboard/dataTable";
import { fetchEmailList } from "@/services/fetchEmail";

export default async function AdminDashboard() {
  // const { data: session, status } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/admin/login");
  //   }
  // }, [status, router]);

  // if (status === "loading") {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center">
  //       <div className="text-2xl">로딩 중...</div>
  //     </div>
  //   );
  // }

  // if (!session?.user) {
  //   return null;
  // }

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
                <Suspense fallback={<div>Loading...</div>}>
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
