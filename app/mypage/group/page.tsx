"use client";

import PlayerList from "./components/PlayerList/PlayerList";
import GroupUserList from "./components/GroupUserList";
import CreateGroup from "./components/CreateGroup";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import GroupList from "./components/GroupList/GroupList";

export default function GroupPage() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") return router.push("/auth/login");

  return (
    <div className="w-full text-black">
      <CreateGroup />
      <GroupList />
      <div className="flex mt-10 justify-evenly">
        <PlayerList />
        <GroupUserList />
      </div>
    </div>
  );
}
