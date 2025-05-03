import { useToast } from "@/app/components/ToastContext";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Category from "@/public/images/components/Category.svg";

export default function PlayerAdd() {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [position, setPosition] = useState("top");

  const { showSnack } = useToast();

  const queryClient = useQueryClient();

  const handleCreatePlayerButton = () => {
    setButtonClicked((c) => !c);
  };

  const handleCreatePlayer = async () => {
    await fetch("/api/me/player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, nickName: nickname, position }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          showSnack(data.error, "error");
          return;
        }
        showSnack("선수가 추가되었습니다.", "success");
        setName("");
        setNickname("");
        setPosition("top");
        setButtonClicked(false);
        queryClient.invalidateQueries({ queryKey: ["players"] });
      })
      .catch((err) => {
        console.error(err);
        showSnack("에러가 발생했습니다.", "error");
      });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl flex items-center gap-4 mb-10">
          <Category />
          <span>내전 멤버 관리</span>
        </h1>
        <button
          className="px-2 py-1 bg-[#FF5B32] rounded-2xl text-sm text-white cursor-pointer hover:bg-[#d9483a] transition-colors duration-200"
          onClick={handleCreatePlayerButton}
        >
          선수 추가
        </button>
      </div>
      {buttonClicked && (
        <div className="flex flex-col text-black">
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
    </>
  );
}
