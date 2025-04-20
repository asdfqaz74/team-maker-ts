"use client";

import TodayBanChampion from "./TodayBanChampion";
import SetBan from "./SetBan";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGlobalBan } from "@/lib/api/fetchGlobalBan";
import { Alert, Slide, Snackbar } from "@mui/material";

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

export default function Page() {
  const [bans, setBans] = useState({
    "1경기": [],
    "2경기": [],
  });

  // 토스트 관리를 위한 상태
  const [snackMessage, setSnackMessage] = useState("");
  const [snackColor, setSnackColor] = useState("success");
  const [state, setState] = useState({
    open: false,
    Transition: SlideTransition,
  });

  // 토스트 핸들러
  const showSnack = (message, type = "success") => {
    setSnackMessage(message);
    setSnackColor(type);
    setState({ open: true, Transition: SlideTransition });
  };

  const handleSnackClose = () => {
    setState({ ...state, open: false });
  };

  const handleSelectChange = (set, newSelected) => {
    setBans((prev) => ({ ...prev, [set]: newSelected }));
  };

  const {
    data: champions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["globalBan"],
    queryFn: fetchGlobalBan,
  });

  // 디스코드 복사용 포맷팅
  const formatList = (arr) => arr.map((champion) => champion.name).join(" ");

  const handleCopy = async () => {
    const text = [
      "```",
      "[오늘의 글로벌 밴]",
      champions.length ? formatList(champions) : "없음",
      "",
      "[1 경기]",
      formatList(bans["1경기"]),
      "",
      "[2 경기]",
      formatList(bans["2경기"]),
      "```",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Failed to copy: ", error);
      showSnack("클립보드 복사에 실패했습니다.", "error");
    } finally {
      showSnack("디스코드용 복사 완료", "success");
    }
  };

  return (
    <div className="flex flex-col px-40 py-20">
      <TodayBanChampion
        champions={champions}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
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
      <button
        className="bg-sky-700 hover:bg-sky-900 p-2 rounded cursor-pointer w-72 mx-auto"
        onClick={handleCopy}
      >
        디스코드용 복사하기
      </button>
      <Snackbar
        open={state.open}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        slots={{ transition: state.Transition }}
      >
        <Alert onClose={handleSnackClose} severity={snackColor}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
