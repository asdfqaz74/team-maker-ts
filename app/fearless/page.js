"use client";

import { useState } from "react";
import ChampionPalette from "../components/ChampionPalette";

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  console.log(openModal);
  return (
    <div>
      <button
        className="cursor-pointer bg-gray-800"
        onClick={() => setOpenModal(true)}
      >
        설정하기
      </button>
      <ChampionPalette open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
