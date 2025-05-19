"use client";

import PlayerList from "./components/PlayerList/PlayerList";
import PlayerDB from "./components/PlayerDB";
import PlayerAdd from "./components/PlayerAdd";

export default function MemberPage() {
  return (
    <div className="flex flex-col h-full w-full">
      <PlayerAdd />
      <div className="flex gap-5 w-full flex-grow overflow-auto">
        <PlayerList />
        <PlayerDB />
      </div>
    </div>
  );
}
