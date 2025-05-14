"use client";

import Link from "next/link";
import { event } from "@/lib/gtag";

export const Footer = () => {
  const handleInstagramClick = () => {
    event({
      action: "click-instagram",
      category: "social",
      label: "instagram",
    });
  };

  return (
    <footer className="flex items-center justify-center gap-10 bg-gray-900 py-10">
      <Link
        href="https://www.instagram.com/sarangkkun_official/"
        target="_blank"
        onClick={handleInstagramClick}
        className="text-sm font-semibold text-gray-100 underline">
        @sarangkkun_officia
      </Link>
    </footer>
  );
};
