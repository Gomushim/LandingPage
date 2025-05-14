"use client";

import Image from "next/image";

interface ArrowButtonProps {
  scrollToId?: string; // 이동할 id
}

export const ArrowButton = ({ scrollToId }: ArrowButtonProps) => {
  const handleClick = () => {
    if (scrollToId) {
      const el = document.getElementById(scrollToId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <Image
      src="/arrow.svg"
      alt="arrow"
      width={100}
      height={35}
      className="my-8 h-15 w-8"
      onClick={handleClick}
      style={{ cursor: scrollToId ? "pointer" : undefined }}
    />
  );
};
