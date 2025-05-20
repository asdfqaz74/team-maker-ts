"use client";

import { useState } from "react";
import UploadFile from "./UploadFile";
import { Parsed } from "@/types/match";
import { useToast } from "@/app/components/ToastContext";
import PlayerNicknameEditor from "./PlayerNicknameEditor";
import Category from "@/public/images/components/Category.svg";

export default function MatchPage() {
  const [parsed, setParsed] = useState<Parsed | null>(null);
  const { showSnack } = useToast();

  return (
    <div className="flex flex-col h-full w-full text-black overflow-auto">
      <h1 className="font-bold text-2xl flex items-center gap-4 mb-10">
        <Category />
        <span>매칭 관리</span>
      </h1>
      {parsed ? (
        <PlayerNicknameEditor
          playersData={parsed?.players}
          maxDamage={parsed?.maxDamage}
          onSubmit={(players) => {
            setParsed(null);
          }}
          showSnack={showSnack}
        />
      ) : (
        <UploadFile
          onUploadSuccess={(data) => setParsed(data)}
          showSnack={showSnack}
        />
      )}
    </div>
  );
}
