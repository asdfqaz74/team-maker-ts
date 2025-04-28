import { useState } from "react";
import ChampionPalette from "../components/ChampionPalette";
import BanChampion from "./BanChampion";
import { SelectedBanChampion } from "@/types/champion";

interface SetBanProps {
  set: "1 경기" | "2 경기";
  selected: SelectedBanChampion[];
  onSelectedChange: (newSelected: SelectedBanChampion[]) => void;
}

export default function SetBan({
  set,
  selected,
  onSelectedChange,
}: SetBanProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
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
