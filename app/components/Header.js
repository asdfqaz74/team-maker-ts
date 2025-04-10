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

  return (
    <ul className="flex justify-end p-4">
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
          <Link href="/mypage">마이페이지</Link>
        </li>
      )}
      <li className="px-5">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="cursor-pointer">
            로그아웃
          </button>
        ) : (
          <Link href="/auth/login">로그인</Link>
        )}
      </li>
    </ul>
  );
}
