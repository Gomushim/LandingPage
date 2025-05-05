import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "사랑꾼 – 곰신 커플을 위한 감정 공유 캘린더",
  description:
    "떨어져 있어도 함께하는 마음. 일정과 감정을 공유하며 더 깊게 연결되는 우리. 지금 '사랑꾼'에서 감정을 나누세요.",
  openGraph: {
    title: "사랑꾼 – 곰신 커플을 위한 감정 공유 캘린더",
    description:
      "곰신 커플의 마음을 이어주는 공유 캘린더 서비스. 피로도, 일정, 감정까지 한눈에 확인하고 더 깊이 소통하세요.",
    url: "https://sarang-landing-page.vercel.app",
    siteName: "사랑꾼",
    images: [
      {
        url: "/og-image.png", // OG 이미지 경로 (public 디렉토리 기준)
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
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="google-site-verification" content="45GCzKKzNEa1gCwyes5_wCyCxO_8hcpw0gUV" />
      </head>
      <body>{children}</body>
    </html>
  );
}
