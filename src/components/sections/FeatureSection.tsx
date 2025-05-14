import Image from "next/image";
import { FeatureSection as FeatureSectionType } from "@/types";

export const FeatureSection = ({ tag, title, description, image }: FeatureSectionType) => (
  <div className="flex flex-col items-center px-7.5 text-center">
    <div className="rounded-2xl bg-green-50 p-1 px-3 text-xs font-bold text-green-500">{tag}</div>
    <h3 className="mt-3 mb-12 text-2xl font-bold whitespace-pre-line text-gray-900">{title}</h3>
    <Image src={image.src} alt={image.alt} width={208} height={425} className="h-[425px] w-[208px]" />
    <p className="mt-12 text-sm font-semibold whitespace-pre-line text-gray-900">{description}</p>
  </div>
);
