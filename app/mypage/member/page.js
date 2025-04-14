"use client";

import { useState } from "react";
import PlayerList from "./PlayerList";

import { getToken } from "@/utils/getToken";
import PlayerDB from "./PlayerDB";

export default function MemberPage() {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [position, setPosition] = useState("top");

  const handleCreatePlayerButton = () => {
    setButtonClicked((c) => !c);
  };

  const handleCreatePlayer = async () => {
    const token = getToken();

    await fetch("/api/me/player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, nickName: nickname, position }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        alert("선수가 추가되었습니다.");
        setName("");
        setNickname("");
        setPosition("top");
        setButtonClicked(false);
      })
      .catch((err) => {
        console.error(err);
        alert("에러가 발생했습니다.");
      });
  };

  return (
    <>
      <div className="flex justify-between items-end">
        <h1 className="text-4xl">내전 멤버 관리</h1>
        <button className="cursor-pointer" onClick={handleCreatePlayerButton}>
          선수 추가
        </button>
      </div>
      {buttonClicked && (
        <div className="flex flex-col">
          <span>선수 추가하기</span>
          <div className="flex gap-4">
            <span>이름</span>
            <input
              type="text"
              placeholder="강진성"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <span>닉네임</span>
            <input
              type="text"
              placeholder="강진성#강진성"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <span>메인</span>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              <option value="top">탑</option>
              <option value="jug">정글</option>
              <option value="mid">미드</option>
              <option value="adc">원딜</option>
              <option value="sup">서포터</option>
            </select>
          </div>
          <button className="cursor-pointer" onClick={handleCreatePlayer}>
            추가
          </button>
        </div>
      )}
      <PlayerList />
      <PlayerDB />
    </>
  );
}
