import { Noto_Sans } from "next/font/google";
import "./globals.css";
import ClientProvider from "./ClientProvider";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata = {
  title: "팀메이커",
  description:
    "팀메이커는 리그오브레전드 사용자 설정 팀을 생성하고 관리하는 웹 애플리케이션입니다.",
  keywords: [
    "리그오브레전드",
    "팀메이커",
    "팀 생성",
    "리그오브레전드 팀",
    "롤 팀",
    "롤 팀 생성기",
    "롤 팀 메이커",
  ],
  openGraph: {
    title: "팀메이커",
    description: "리그오브레전드 내전 팀을 쉽게 생성하고 분석해보세요!",
    url: "https://team-maker.me/",
    siteName: "팀메이커",
    images: [
      {
        url: "https://team-maker.me/",
        width: 1200,
        height: 630,
        alt: "팀메이커 메인 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko-KR">
      <body
        className={`${notoSans.variable} antialiased max-w-[1920px] w-full`}
      >
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
