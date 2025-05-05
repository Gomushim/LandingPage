import Image from "next/image";
import { Checkbox } from "@radix-ui/react-checkbox";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-start justify-center bg-gray-200">
      <main className="pc:max-w-[365px] min-w-[365px] bg-white">
        <header className="flex items-center justify-between px-7.5 py-5">
          <Image src="/logo.svg" alt="로고" width={70} height={21} />
          <div className="flex items-center gap-2.5">
            <Link
              href="https://frontend-sarang.vercel.app/"
              target="_blank"
              className="h-9 w-25 cursor-pointer rounded-2xl bg-red-400 px-4 py-2 text-sm font-semibold text-gray-50">
              앱 다운로드
            </Link>
            <button className="h-9 w-9 cursor-pointer rounded-full bg-gray-50 px-3 text-base font-semibold text-gray-500">
              ?
            </button>
          </div>
        </header>

        <section className="mt-[55px] flex w-full flex-col items-center bg-[url('/Ellipse.svg')] bg-cover bg-center bg-no-repeat">
          <h1 className="text-center text-4xl font-bold text-gray-900">
            더 깊이 연결되는 감정
            <br />
            곰신 커플을 위한{" "}
            <span className="bg-gradient-to-r from-[#FF42B0] to-[#FFC4E7] bg-clip-text text-transparent">
              공유 캘린더
            </span>
          </h1>
          {/* 무한 슬라이드 영역 */}
          <div className="relative mt-20 w-full overflow-hidden">
            <div className="animate-marquee flex w-[2000px]">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-5">
                  <Image
                    src="/iPhone1.svg"
                    alt="서비스 이미지1"
                    width={210}
                    height={425}
                    className="ml-5 shrink-0"
                    priority
                  />
                  <Image
                    src="/iPhone2.svg"
                    alt="서비스 이미지2"
                    width={210}
                    height={425}
                    className="shrink-0"
                    priority
                  />
                  <Image
                    src="/iPhone3.svg"
                    alt="서비스 이미지3"
                    width={210}
                    height={425}
                    className="shrink-0"
                    priority
                  />
                </div>
              ))}
            </div>
          </div>
          <Image src="/arrow.svg" alt="화살표" width={32} height={60} className="my-8 h-15 w-8" />
        </section>
        <section className="flex w-full flex-col items-center gap-17 bg-gray-50 py-15 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            힘들었건 곰신 연애
            <br />
            이제 서로의 감정을
            <br />
            더욱 깊게 이어가세요.
          </h2>
          <h2 className="text-2xl font-bold text-gray-900">
            보고 싶고, 기다리고,
            <br />
            걱정했던 시간들,
            <br />
            이제 사랑꾼이
            <br />둘 사이를 더 단단히 연결할 거예요.
          </h2>
        </section>
        <section className="mt-25">
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              <CarouselItem>
                <div className="flex flex-col items-start px-6">
                  <div className="rounded-2xl bg-red-50 p-1 px-3 text-xs font-bold text-red-500">공유 캘린더</div>
                  <h3 className="mt-3 mb-12 text-2xl font-bold text-gray-900">
                    피로도 설정 가능한 공유 캘린더로
                    <br />
                    상대의 일정과 감정을 한 눈에
                  </h3>
                  <Image
                    src="/calendarIphone.svg"
                    alt="캘린더 휴대폰"
                    width={208}
                    height={425}
                    className="h-[425px] w-[208px]"
                  />
                  <p className="mt-12 text-sm font-semibold text-gray-900">
                    공유 캘린더로 서로의 일정을 등록하고
                    <br />
                    상대의 일정과 피로도를 더욱 상세히 알 수 있어요
                  </p>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="flex flex-col items-start px-7.5">
                  <div className="rounded-2xl bg-red-50 p-1 px-3 text-xs font-bold text-red-500">내 감정 공유</div>
                  <h3 className="mt-3 mb-12 text-2xl font-bold text-gray-900">
                    메진저로 전하기 못한 오늘의 나,
                    <br />
                    이제 감정과 상태메시지로 전해요
                  </h3>
                  <Image
                    src="/statusIphone.svg"
                    alt="캘린더 휴대폰"
                    width={208}
                    height={425}
                    className="h-[425px] w-[208px]"
                  />
                  <p className="mt-12 text-sm font-semibold text-gray-900">
                    내 감정 상태에 따른 이모지와 글,
                    <br />
                    이제 서로를 더 깊게 알아가요.
                  </p>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="flex flex-col items-start px-7.5">
                  <div className="rounded-2xl bg-red-50 p-1 px-3 text-xs font-bold text-red-500">
                    일정에 작성하는 편지
                  </div>
                  <h3 className="mt-3 mb-12 text-2xl font-bold text-gray-900">
                    고된 훈련, 행군...
                    <br />
                    걱정하는 마음을 추억과 함께 전해요.
                  </h3>
                  <Image
                    src="/detailIphone.svg"
                    alt="캘린더 휴대폰"
                    width={208}
                    height={425}
                    className="h-[425px] w-[208px]"
                  />
                  <p className="mt-12 text-sm font-semibold text-gray-900">
                    일정에 직접 남길 수 있는 편지로
                    <br />
                    연인과 더 가깝게 연결될 수 있어요.
                  </p>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </section>
        <section className="flex flex-col items-center bg-[linear-gradient(180deg,_#2A2C2F_0%,_#9FA6B0_100%)] pt-[116px] pb-[200px] text-center">
          <Image src="/bottomLogo.svg" alt="로고" width={48} height={48} className="h-12 w-12" />
          <h2 className="text-gray-0 mt-6 text-4xl font-bold">
            떨어져 있어야만 했던 불편함,
            <br />
            이제 <span className="text-red-300">사랑꾼</span>으로 해결해요
          </h2>
          <p className="text-gray-0 mt-13 text-sm font-medium">사랑꾼 서비스가 런칭되면 이메일로 알려드릴게요</p>
          <form className="mt-11 flex w-full flex-col gap-5 p-11">
            <div className="flex flex-col">
              <label className="mb-1 text-start text-sm font-semibold text-gray-50" htmlFor="email">
                이메일
              </label>
              <Input className="mt-1 h-13 rounded-2xl bg-white" type="email" id="email" name="email" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="check" className="h-5 w-5 border-gray-50 bg-white" />
              <label className="text-sm font-semibold text-gray-50" htmlFor="check">
                개인정보 이용 동의
              </label>
            </div>
            <Button variant="submit" size="xl">
              확인
            </Button>
          </form>
        </section>
        <footer className="flex items-center justify-center gap-10 bg-gray-900 py-10">
          <Link href="#" className="text-sm font-semibold text-gray-100 underline">
            Instagram
          </Link>
          <Link href="#" className="text-sm font-semibold text-gray-100 underline">
            Email
          </Link>
        </footer>
      </main>
    </div>
  );
}
