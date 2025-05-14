"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PlayerInfo from "./components/PlayerInfo";

export default function PlayerDB() {
  const router = useRouter();
  const { status } = useSession();

  if (status === "unauthenticated") {
    router.push("/auth/login");
  }

  return (
    <div className="px-60 py-20">
      <PlayerInfo />
    </div>
  );
}
