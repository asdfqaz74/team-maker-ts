import { useState } from "react";
import ChampionPalette from "../components/ChampionPalette";
import BanChampion from "./BanChampion";

export default function SetBan({ set, selected, onSelectedChange }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="">
      <BanChampion
        onClick={() => setOpenModal(true)}
        set={set}
        banList={selected}
      />
      <ChampionPalette
        open={openModal}
        onClose={() => setOpenModal(false)}
        selected={selected}
        setSelected={onSelectedChange}
      />
    </div>
  );
}
