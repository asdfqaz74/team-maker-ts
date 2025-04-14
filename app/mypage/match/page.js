"use client";

import PlayerNicknameEditor from "./PlayerNicknameEditor";
import UploadFile from "./UploadFile";
import { useState } from "react";

export default function MatchPage() {
  const [parsed, setParsed] = useState(null);

  return (
    <div>
      <h1>매칭 관리</h1>
      <p>매칭 관리 페이지입니다.</p>
      {parsed ? (
        <PlayerNicknameEditor
          playersData={parsed?.players}
          maxDamage={parsed?.maxDamage}
          onSubmit={() => {
            setParsed(null);
          }}
        />
      ) : (
        <UploadFile onUploadSuccess={(data) => setParsed(data)} />
      )}
    </div>
  );
}
