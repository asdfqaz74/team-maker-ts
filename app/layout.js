import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { Provider } from "jotai";
import Token from "./components/Token";

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko-KR">
      <body
        className={`${notoSans.variable} antialiased max-w-[1920px] w-full`}
      >
        <Provider>
          <Token />
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
