import Image from "next/image";
import { SLIDE_IMAGES } from "@/constants";

export const InfiniteSlider = () => (
  <div className="relative mt-20 w-full overflow-hidden">
    <div className="animate-marquee flex w-[2000px]">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex gap-5">
          {SLIDE_IMAGES.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              width={210}
              height={425}
              className={index === 0 ? "ml-5 shrink-0" : "shrink-0"}
              priority
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);
