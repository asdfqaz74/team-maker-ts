"use client";

import { useAtom } from "jotai";
import { tokenAtom, isLoggedInAtom, userAtom } from "@/store/auth";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useResetAtom } from "jotai/utils";
import {
  checkedPlayersAtom,
  groupListAtom,
  groupPlayersAtom,
  selectedGroupAtom,
} from "@/store/group";
import { playersAtom, selectedPlayerAtom } from "@/store/player";
import { QueryClient } from "@tanstack/react-query";
import Burger from "@/public/images/components/Burger.svg";

export default function Header() {
  const [, setToken] = useAtom(tokenAtom);
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const router = useRouter();

  const resetAtoms = useResetAtom(tokenAtom);
  const resetUser = useResetAtom(userAtom);
  const resetGroupList = useResetAtom(groupListAtom);
  const resetGroupPlayers = useResetAtom(groupPlayersAtom);
  const resetSelectedGroup = useResetAtom(selectedGroupAtom);
  const resetCheckedPlayers = useResetAtom(checkedPlayersAtom);
  const resetPlayers = useResetAtom(playersAtom);
  const resetSelectedPlayer = useResetAtom(selectedPlayerAtom);

  const queryClient = new QueryClient();

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
    queryClient.removeQueries({ queryKey: ["me"] });
    queryClient.removeQueries({ queryKey: ["players"] });
    router.push("/auth/login");
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  return (
    <div className="flex items-center py-4 px-10 md:px-40 justify-between md:justify-center 2xl:justify-between bg-[#030222] fixed w-full top-0 left-0 z-50 whitespace-nowrap">
      <span className="text-[1.875rem] font-[Alumni] block md:hidden 2xl:block">
        <Link href={"/"}>Tea M aker</Link>
      </span>
      {/* 모바일 메뉴 */}
      <button className="block md:hidden">
        <Burger />
      </button>

      {/* 데스크탑 메뉴 */}
      <ul className="hidden md:flex justify-end text-[1rem] font-bold">
        <li className="px-5">
          <Link href="/">홈</Link>
        </li>
        <li className="px-5">팀 메이커</li>
        <li className="px-5">
          <Link href={"/playerDB"}>플레이어 정보</Link>
        </li>
        {isLoggedIn && (
          <li className="px-5">
            <Link href="/fearless">피어리스 도우미</Link>
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
