import "./globals.css";
import Script from "next/script";
import { Metadata } from "next";
import localFont from "next/font/local";
import { GA_TRACKING_ID } from "@/lib/gtag";
import { NextAuthProvider } from "@/components/NextAuthProvider";

const pretendard = localFont({
  src: "../static/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "사랑꾼 - 곰신 커플을 위한 공유 캘린더",
  description: "더 깊이 연결되는 감정, 곰신 커플을 위한 공유 캘린더",
  openGraph: {
    title: "사랑꾼 – 곰신 커플을 위한 감정 공유 캘린더",
    description:
      "곰신 커플의 마음을 이어주는 공유 캘린더 서비스. 피로도, 일정, 감정까지 한눈에 확인하고 더 깊이 소통하세요.",
    url: "https://sarang-landing-page.vercel.app",
    siteName: "사랑꾼",
    images: [
      {
        url: "https://i.ibb.co/Kc4M0F8h/Frame-2087327861.png",
        width: 1200,
        height: 630,
        alt: "사랑꾼 서비스 미리보기 이미지",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "사랑꾼 – 곰신 커플을 위한 감정 공유 캘린더",
    description: "떨어져 있어도 감정은 함께. 일정과 감정을 함께 기록하며 더 가까워지세요.",
    images: ["https://i.ibb.co/Kc4M0F8h/Frame-2087327861.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `,
          }}
        />
        <meta name="google-site-verification" content="FSXKlC8L2fC87G2HeDdxtnQyzDlOM4C3Y1eYoq3mzVA" />
        <meta name="naver-site-verification" content="159f6b48c5a57e08991c3f3d01c90a33db3ccba0" />
      </head>
      <body className={`${pretendard.className}`}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
