"use client";
import User from "@/public/images/components/User.svg";
import Users from "@/public/images/components/Users.svg";
import Rocket from "@/public/images/components/Rocket.svg";
import Gamepad from "@/public/images/components/Gamepad2.svg";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Image from "next/image";

export default function MyPageLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const menu = [
    { label: "내 정보", path: "/mypage/myinfo", icon: <User /> },
    { label: "내전 멤버 관리", path: "/mypage/member", icon: <Users /> },
    { label: "그룹 관리", path: "/mypage/group", icon: <Rocket /> },
    { label: "경기 추가하기", path: "/mypage/match", icon: <Gamepad /> },
  ];

  return (
    <div className="flex h-[calc(100vh-4.8125rem)] bg-white">
      <aside className="w-48 bg-[#030222] fixed h-screen">
        <h2 className="text-2xl font-bold pl-4 mb-10 text-[#0FA4FE]">
          MY PAGE
        </h2>
        <ul className="flex flex-col gap-10 text-sm">
          {menu.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-4 pl-4 rounded-l-full hover:text-blue-500 ${
                    isActive
                      ? "text-black font-semibold py-2 bg-white"
                      : "text-white"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* 본문 */}
      <div className="ml-48 flex-1 px-8 py-6 bg-white h-full">
        <div className="relative w-full h-full">
          <Image src="/images/components/mypage-bg.webp" alt="bg" fill />
          <div className="w-full h-full bg-[#F2FAFF] opacity-10"></div>
          <div className="w-full h-full text-black rounded-2xl px-8 py-6 absolute top-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
