"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PlayerInfo from "./components/PlayerInfo";

export default function PlayerDB() {
  const router = useRouter();
  const { status } = useSession();

  console.log("Status : ", status);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  return (
    <div className="px-60 py-20">
      <PlayerInfo />
    </div>
  );
}
