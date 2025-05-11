import { SlideImage, FeatureSection } from "@/types";

export const SLIDE_IMAGES: SlideImage[] = [
  { src: "/Iphone1.webp", alt: "서비스 이미지1" },
  { src: "/Iphone2.webp", alt: "서비스 이미지2" },
  { src: "/Iphone3.webp", alt: "서비스 이미지3" },
];

export const FEATURE_SECTIONS: FeatureSection[] = [
  {
    tag: "공유 캘린더",
    title: "피로도 설정 가능한 공유 캘린더로\n상대의 일정과 감정을 한 눈에",
    description: "공유 캘린더로 서로의 일정을 등록하고\n상대의 일정과 피로도를 더욱 상세히 알 수 있어요",
    image: { src: "/calendarIphone.webp", alt: "캘린더 휴대폰" },
  },
  {
    tag: "내 감정 공유",
    title: "메진저로 전하기 못한 오늘의 나,\n이제 감정과 상태메시지로 전해요",
    description: "내 감정 상태에 따른 이모지와 글,\n이제 서로를 더 깊게 알아가요.",
    image: { src: "/statusIphone.webp", alt: "상태 휴대폰" },
  },
  {
    tag: "일정에 작성하는 편지",
    title: "고된 훈련, 행군...\n걱정하는 마음을 추억과 함께 전해요.",
    description: "일정에 직접 남길 수 있는 편지로\n연인과 더 가깝게 연결될 수 있어요.",
    image: { src: "/detailIphone.webp", alt: "상세 휴대폰" },
  },
];
