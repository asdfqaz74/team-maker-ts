import { useToast } from "@/app/components/ToastContext";
import { API } from "@/constants";
import { useState } from "react";

type FindIdResponse =
  | {
      message: string;
      userId: string;
    }
  | {
      error: string;
    };

export default function FindId() {
  const [findIdName, setFindIdName] = useState("");
  const [findIdEmail, setFindIdEmail] = useState("");
  const [userId, setUserId] = useState("");

  const { showSnack } = useToast();

  const handleFindId = async () => {
    const response = await fetch(API.AUTH.FIND_ID, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ findIdName, findIdEmail }),
    });
    const data: FindIdResponse = await response.json();

    if ("userId" in data) {
      showSnack("아이디 찾기 성공", "success");
      setUserId(data.userId);
    } else {
      showSnack(data.error || "아이디 찾기 실패", "error");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <h1 className="text-xl font-bold">아이디 찾기</h1>
      <span>이름</span>
      <input
        type="text"
        placeholder="이름을 입력하세요"
        onChange={(e) => setFindIdName(e.target.value)}
        className="bg-gray-400 placeholder-gray-700"
      />
      <span>이메일</span>
      <input
        type="email"
        placeholder="이메일을 입력하세요"
        onChange={(e) => setFindIdEmail(e.target.value)}
        className="bg-gray-400 placeholder-gray-700"
      />
      <button
        onClick={handleFindId}
        className="bg-sky-700 rounded p-2 cursor-pointer"
      >
        아이디 찾기
      </button>
      {userId && <p>아이디: {userId}</p>}
    </div>
  );
}
