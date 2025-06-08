"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "대시보드", href: "/admin/dashboard" },
  { name: "기본값", href: "" },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen w-64 border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold">사랑꾼 관리자 페이지</h1>
      </div>
      <nav className="space-y-1 p-4">
        {navigation.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center rounded-lg px-4 py-2 text-sm transition-colors ${
                isActive ? "bg-blue-50 font-medium text-blue-700" : "text-gray-700 hover:bg-gray-50"
              }`}>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
