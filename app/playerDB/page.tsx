"use client";

import { useRouter } from "next/navigation";

import PlayerInfo from "./components/PlayerInfo";
import { getToken } from "@/utils/client/getToken";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function PlayerDB() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") return null;
  if (status === "unauthenticated") return null;

  return (
    <div className="px-60 py-20">
      <PlayerInfo />
    </div>
  );
}
