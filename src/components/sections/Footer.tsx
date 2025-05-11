import Link from "next/link";

export const Footer = () => (
  <footer className="flex items-center justify-center gap-10 bg-gray-900 py-10">
    <Link href="#" className="text-sm font-semibold text-gray-100 underline">
      Instagram
    </Link>
    <Link href="#" className="text-sm font-semibold text-gray-100 underline">
      Email
    </Link>
  </footer>
);
