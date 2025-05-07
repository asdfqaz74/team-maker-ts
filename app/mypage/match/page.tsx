"use client";

import PlayerNicknameEditor from "./PlayerNicknameEditor";
import UploadFile from "./UploadFile";
import { useState } from "react";
import { useToast } from "@/app/components/ToastContext";
import { Parsed } from "@/types/match";

export default function MatchPage() {
  const [parsed, setParsed] = useState<Parsed | null>(null);
  const { showSnack } = useToast();

  console.log("parsed", parsed);

  return (
    <div className="w-full text-black">
      <h1>매칭 관리</h1>
      <p>매칭 관리 페이지입니다.</p>
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
