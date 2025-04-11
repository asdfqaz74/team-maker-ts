"use client";

import { useAtom } from "jotai";
import { tokenAtom, isLoggedInAtom, userAtom } from "@/store/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useResetAtom } from "jotai/utils";
import {
  checkedPlayersAtom,
  groupListAtom,
  groupPlayersAtom,
  selectedGroupAtom,
} from "@/store/group";
import { playersAtom, selectedPlayerAtom } from "@/store/player";

export default function Header() {
  const [, setToken] = useAtom(tokenAtom);
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const resetAtoms = useResetAtom(tokenAtom);
  const resetUser = useResetAtom(userAtom);
  const resetGroupList = useResetAtom(groupListAtom);
  const resetGroupPlayers = useResetAtom(groupPlayersAtom);
  const resetSelectedGroup = useResetAtom(selectedGroupAtom);
  const resetCheckedPlayers = useResetAtom(checkedPlayersAtom);
  const resetPlayers = useResetAtom(playersAtom);
  const resetSelectedPlayer = useResetAtom(selectedPlayerAtom);

  // 로그아웃 핸들러
  // 로그아웃 시 토큰 삭제 및 상태 초기화
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    resetAtoms();
    resetUser();
    resetGroupList();
    resetGroupPlayers();
    resetSelectedGroup();
    resetCheckedPlayers();
    resetPlayers();
    resetSelectedPlayer();
    router.push("/auth/login");
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center py-4 px-40 justify-between bg-[#030222]">
      <span className="text-[1.875rem] font-[Alumni]">
        <Link href={"/"}>Tea M aker</Link>
      </span>
      <ul className="flex justify-end text-[1rem] font-bold">
        <li className="px-5">
          <Link href="/">홈</Link>
        </li>
        <li className="px-5">팀 메이커</li>
        <li className="px-5">플레이어 정보</li>
        {isLoggedIn && (
          <li className="px-5">
            <Link href="/">피어리스 도우미</Link>
          </li>
        )}
        {isLoggedIn && (
          <li className="px-5">
            <Link href="/mypage">
              <span className="text-[#0FA4FE]">마이페이지</span>
            </Link>
          </li>
        )}
        <li className="px-5">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="cursor-pointer text-[#F53B3B]"
            >
              로그아웃
            </button>
          ) : (
            <Link href="/auth/login">
              <span className="text-[#0FA4FE]">로그인</span>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}
