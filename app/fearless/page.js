"use client";

import TodayBanChampion from "./TodayBanChampion";
import SetBan from "./SetBan";
import { useState } from "react";

export default function Page() {
  const [bans, setBans] = useState({
    "1경기": [],
    "2경기": [],
  });

  const handleSelectChange = (set, newSelected) => {
    setBans((prev) => ({ ...prev, [set]: newSelected }));
  };

  return (
    <div className="flex flex-col px-40 py-20">
      <p className="text-4xl font-bold mb-2">Fearless Helper</p>
      <p className="mb-10">피어리스 도우미</p>
      <TodayBanChampion />
      <SetBan
        set={"1 경기"}
        selected={bans["1경기"]}
        onSelectedChange={(newSelected) =>
          handleSelectChange("1경기", newSelected)
        }
      />
      <SetBan
        set={"2 경기"}
        selected={bans["2경기"]}
        onSelectedChange={(newSelected) =>
          handleSelectChange("2경기", newSelected)
        }
      />
    </div>
  );
}
