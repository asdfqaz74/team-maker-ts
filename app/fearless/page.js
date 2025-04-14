"use client";

import { useState } from "react";
import ChampionPalette from "../components/ChampionPalette";
import BanChampion from "./BanChampion";
import TodayBanChampion from "./TodayBanChampion";

export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  console.log(openModal);
  return (
    <div className="flex flex-col">
      <TodayBanChampion />
      <BanChampion onClick={() => setOpenModal(true)} />
      <ChampionPalette open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
