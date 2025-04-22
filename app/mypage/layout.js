"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyPageLayout({ children }) {
  const pathname = usePathname();

  const menu = [
    { label: "내 정보", path: "/mypage/myinfo" },
    { label: "내전 멤버 관리", path: "/mypage/member" },
    { label: "그룹 관리", path: "/mypage/group" },
    { label: "경기 추가하기", path: "/mypage/match" },
  ];

  return (
    <div className="flex min-h-screen mt-20">
      <aside className="w-48 p-4 border-r">
        <h2 className="text-lg font-bold mb-4">마이페이지</h2>
        <ul className="space-y-2 text-sm">
          {menu.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`block px-2 py-1 rounded hover:text-blue-500 ${
                    isActive
                      ? "text-blue-600 font-semibold bg-white shadow-sm"
                      : "text-gray-700"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* 본문 */}
      <main className="flex-1 max-w-4xl px-8 py-6 mx-auto">{children}</main>
    </div>
  );
}
