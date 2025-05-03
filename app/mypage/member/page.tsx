"use client";

import PlayerList from "./components/PlayerList";
import PlayerDB from "./components/PlayerDB";
import PlayerAdd from "./components/PlayerAdd";

export default function MemberPage() {
  return (
    <>
      <PlayerAdd />
      <PlayerList />
      <PlayerDB />
    </>
  );
}
