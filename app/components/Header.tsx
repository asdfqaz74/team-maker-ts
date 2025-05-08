"use client";

import { userAtom } from "@/store/auth";
import Link from "next/link";
import { useState } from "react";
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
import { signOut, useSession } from "next-auth/react";

import Burger from "@/public/images/components/Burger.svg";
import Chart from "@/public/images/components/Chart.svg";
import Home from "@/public/images/components/Home.svg";
import Settings from "@/public/images/components/Settings.svg";
import Gamepad from "@/public/images/components/Gamepad.svg";
import Сalculator from "@/public/images/components/Сalculator.svg";

import { Box, Divider, Drawer } from "@mui/material";

export default function Header() {
  const router = useRouter();

  const { status } = useSession();

  const [open, setOpen] = useState(false);

  const resetUser = useResetAtom(userAtom);
  const resetGroupList = useResetAtom(groupListAtom);
  const resetGroupPlayers = useResetAtom(groupPlayersAtom);
  const resetSelectedGroup = useResetAtom(selectedGroupAtom);
  const resetCheckedPlayers = useResetAtom(checkedPlayersAtom);
  const resetPlayers = useResetAtom(playersAtom);
  const resetSelectedPlayer = useResetAtom(selectedPlayerAtom);

  const queryClient = new QueryClient();

  // 로그인 상태 확인
  const isLoggedIn = status === "authenticated";

  // 로그아웃 핸들러
  // 로그아웃 시 토큰 삭제 및 상태 초기화
  const handleLogout = () => {
    resetUser();
    resetGroupList();
    resetGroupPlayers();
    resetSelectedGroup();
    resetCheckedPlayers();
    resetPlayers();
    resetSelectedPlayer();
    queryClient.removeQueries({ queryKey: ["me"] });
    queryClient.removeQueries({ queryKey: ["players"] });
    signOut();
    router.push("/auth/login");
  };

  const toggleDrawer =
    (isOpen: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent): void => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(isOpen);
    };

  return (
    <div className="flex items-center py-4 px-10 md:px-40 justify-between md:justify-center 2xl:justify-between bg-[#030222] fixed w-screen top-0 left-0 z-50 whitespace-nowrap h-[4.8125rem]">
      <span className="text-[1.875rem] font-[Alumni] block md:hidden 2xl:block">
        <Link href={"/"}>Tea M aker</Link>
      </span>
      {/* 모바일 메뉴 */}
      <button
        className="block md:hidden cursor-pointer"
        type="button"
        onClick={toggleDrawer(true)}
      >
        <Burger />
      </button>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#1a1a2f",
              padding: "1.25rem",
              width: "18.75rem",
            },
          },
        }}
      >
        <Box role="presentation" onClick={toggleDrawer(false)}>
          <ul className="flex flex-col gap-4 text-white text-2xl">
            <Link href={"/"}>
              <li className="flex gap-3 items-center">
                <Home />
                <span>홈</span>
              </li>
            </Link>
            <li>
              <Divider sx={{ borderColor: "#fff" }} />
            </li>
            <Link href={"/teamMaker"}>
              <li className="flex gap-3 items-center">
                <Gamepad />
                <span>팀 메이커</span>
              </li>
            </Link>

            <Link href={"/playerDB"}>
              <li className="flex gap-3 items-center">
                <Chart />
                <span>플레이어 정보</span>
              </li>
            </Link>
            {isLoggedIn && (
              <Link href={"/fearless"}>
                <li className="flex gap-3 items-center">
                  <Сalculator />
                  <span>피어리스 도우미</span>
                </li>
              </Link>
            )}

            {isLoggedIn && (
              <Link href={"/mypage"}>
                <li className="flex gap-3 items-center">
                  <Settings />
                  <span>마이페이지</span>
                </li>
              </Link>
            )}
            <li>
              <Divider sx={{ borderColor: "#fff" }} />
            </li>
            {isLoggedIn ? (
              <li
                onClick={handleLogout}
                className="cursor-pointer text-[#F53B3B] hover:bg-white/10 rounded px-2 py-2"
              >
                로그아웃
              </li>
            ) : (
              <Link href="/auth/login">
                <li className="text-[#0FA4FE] hover:bg-white/10 rounded px-2 py-2 cursor-pointer">
                  로그인
                </li>
              </Link>
            )}
          </ul>
        </Box>
      </Drawer>

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
