"use client";

import { useState } from "react";

export default function FindPage() {
  const [findIdName, setFindIdName] = useState("");
  const [findIdEmail, setFindIdEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [findPwName, setFindPwName] = useState("");
  const [findPwEmail, setFindPwEmail] = useState("");
  const [findPwId, setFindPwId] = useState("");
  const [messageId, setMessageId] = useState("");
  const [messagePw, setMessagePw] = useState("");

  const handleFindId = async () => {
    const response = await fetch("/api/auth/find-id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ findIdName, findIdEmail }),
    });
    const data = await response.json();

    if (response.ok) {
      setMessageId("아이디 찾기 성공");
      setUserId(data.userId);
    } else {
      setMessageId(data.error || "아이디 찾기 실패");
    }
  };

  const handleResetPassword = async () => {
    const response = await fetch("/api/auth/find-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ findPwName, findPwEmail, findPwId }),
    });
    const data = await response.json();

    if (response.ok) {
      setMessagePw("비밀번호 재설정 이메일이 전송되었습니다.");
    } else {
      setMessagePw(data.error || "비밀번호 찾기 실패");
    }
  };

  return (
    <div className="flex justify-center items-center py-20 gap-28">
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
        {messageId && <p>{messageId}</p>}
        {userId && <p>아이디: {userId}</p>}
      </div>
      <div className="flex flex-col gap-4 items-start">
        <h1 className="text-xl font-bold">비밀번호 찾기</h1>
        <span>이름</span>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          onChange={(e) => setFindPwName(e.target.value)}
          className="bg-gray-400 placeholder-gray-700"
        />
        <span>이메일</span>
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          onChange={(e) => setFindPwEmail(e.target.value)}
          className="bg-gray-400 placeholder-gray-700"
        />
        <span>아이디</span>
        <input
          type="text"
          placeholder="아이디를 입력하세요"
          onChange={(e) => setFindPwId(e.target.value)}
          className="bg-gray-400 placeholder-gray-700"
        />
        <button
          onClick={handleResetPassword}
          className="bg-sky-700 rounded p-2 cursor-pointer"
        >
          비밀번호 찾기
        </button>
        {messagePw && <p>{messagePw}</p>}
      </div>
    </div>
  );
}
