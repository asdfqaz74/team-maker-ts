"use client";

import { useAtom } from "jotai";
import { tokenAtom, isLoggedInAtom } from "@/store/auth";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [, setToken] = useAtom(tokenAtom);
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/auth/login");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <ul className="flex justify-end p-4">
      <li className="px-5">
        <Link href="/">홈</Link>
      </li>
      <li className="px-5">팀 메이커</li>
      <li className="px-5">플레이어 정보</li>
      <li className="px-5">
        {isLoggedIn ? (
          <button onClick={handleLogout}>로그아웃</button>
        ) : (
          <Link href="/auth/login">로그인</Link>
        )}
      </li>
    </ul>
  );
}
