"use client";

import { useSession } from "next-auth/react";
import PlayerInfo from "./components/PlayerInfo";
import Spinner from "@/public/images/components/spinner.svg";

export default function PlayerDB() {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 z-50">
        <Spinner />
        <p className="mt-4 text-white text-lg">
          로그인 정보를 확인 중입니다...
        </p>
      </div>
    );
  }

  return (
    <div className="px-10 py-20 lg:px-40">
      <PlayerInfo status={status} />
    </div>
  );
}
