import React from "react";

interface EmailFormListItemProps {
  title: string;
  updatedAt: string;
  preview: string;
}

export default function EmailFormListItem({ title, updatedAt, preview }: EmailFormListItemProps) {
  return (
    <div className="flex min-h-[200px] cursor-pointer break-inside-avoid flex-col justify-between rounded-xl border border-gray-100 bg-white p-8 shadow-md transition hover:shadow-lg">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="truncate text-xl font-semibold text-gray-800">{title}</h3>
          <span className="text-xs text-gray-400">{updatedAt}</span>
        </div>
        <div className="text-base whitespace-pre-line text-gray-600">{preview}</div>
      </div>
    </div>
  );
}
