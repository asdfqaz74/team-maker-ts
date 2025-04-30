"use client";

import { useRouter } from "next/navigation";

import PlayerInfo from "./components/PlayerInfo";
import { getToken } from "@/utils/client/getToken";
import { useEffect, useState } from "react";

export default function PlayerDB() {
  const router = useRouter();
  const [tokenCheck, setTokenCheck] = useState(false);

  // 토큰이 있는지 확인, 없으면 로그인 페이지로 이동
  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/auth/login");
    } else {
      setTokenCheck(true);
    }
  }, [router]);

  if (!tokenCheck) return null;

  return (
    <div className="px-60 py-20">
      <PlayerInfo />
    </div>
  );
}
