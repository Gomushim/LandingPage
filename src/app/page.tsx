import Image from "next/image";
import { Header } from "@/components/sections/Header";
import { InfiniteSlider } from "@/components/sections/InfiniteSlider";
import { FeatureSection } from "@/components/sections/FeatureSection";
import { NewsletterForm } from "@/components/sections/NewsletterForm";
import { Footer } from "@/components/sections/Footer";
import { FEATURE_SECTIONS } from "@/constants";
import { ArrowButton } from "@/components/ArrowButton";

export default function Home() {
  return (
    <div className="font-pretendard flex items-start justify-center bg-gray-200">
      <main className="pc:max-w-[365px] min-w-[365px] bg-white">
        <Header />

        <section className="mt-[55px] flex w-full flex-col items-center bg-[url('/Ellipse.svg')] bg-cover bg-center bg-no-repeat">
          <h1 className="text-center text-4xl font-bold text-gray-900">
            더 깊이 연결되는 감정
            <br />
            곰신 커플을 위한
            <span className="bg-[#31AF89] bg-clip-text text-transparent"> 공유 캘린더</span>
          </h1>
          <InfiniteSlider />
          <ArrowButton scrollToId="newsletter-section" />
        </section>

        <section
          id="newsletter-section"
          className="flex w-full flex-col items-center gap-17 bg-gray-50 py-15 text-center">
          <h2 className="text-2xl font-bold whitespace-pre-line text-gray-900">
            {"힘들었던 곰신 연애\n이제 서로의 감정을\n더욱 깊게 이어가세요."}
          </h2>
          <h2 className="text-2xl font-bold text-gray-900">
            보고 싶고, 기다리고,
            <br />
            걱정했던 시간들,
            <br />
            이제 <Image src="/miniLogo.svg" alt="miniLogo" width={100} height={35} className="mb-1 inline h-7 w-25" />이
            <br />둘 사이를 더 단단히 연결할 거예요.
          </h2>
        </section>

        <section className="my-25 flex flex-col items-center gap-25">
          {FEATURE_SECTIONS.map((feature, idx) => (
            <FeatureSection key={idx} {...feature} isLast={idx === FEATURE_SECTIONS.length - 1} />
          ))}
        </section>

        <section className="flex flex-col items-center bg-[linear-gradient(180deg,_#2A2C2F_0%,_#9FA6B0_100%)] pt-[116px] pb-[200px] text-center">
          <Image src="/bottomLogo.svg" alt="로고" width={48} height={48} className="h-12 w-12" />
          <h2 className="text-gray-0 mt-6 text-4xl font-bold">
            떨어져 있어야만 했던 불편함,
            <br />
            이제 <span className="text-green-500">사랑꾼</span>으로 해결해요
          </h2>
          <p className="text-gray-0 mt-13 text-sm font-medium">사랑꾼 서비스가 런칭되면 이메일로 알려드릴게요</p>
          <NewsletterForm />
        </section>

        <Footer />
      </main>
    </div>
  );
}
