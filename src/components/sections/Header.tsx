import Image from "next/image";
import Link from "next/link";

export const Header = () => (
  <header className="flex items-center justify-between px-7.5 py-5">
    <Image src="/logo.svg" alt="로고" width={70} height={21} />
    <div className="flex items-center gap-2.5">
      <Link
        href="#"
        className="h-9 w-25 cursor-not-allowed rounded-2xl bg-red-700 px-4 py-2 text-sm font-semibold text-gray-50">
        앱 다운로드
      </Link>

      <button className="h-9 w-9 cursor-pointer rounded-full bg-gray-50 px-3 text-base font-semibold text-gray-500">
        ?
      </button>
    </div>
  </header>
);
