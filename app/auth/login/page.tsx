"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { tokenAtom } from "@/store/auth";

type LoginResponse =
  | {
      message: string;
      token: string;
    }
  | {
      error: string;
    };

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const setToken = useSetAtom(tokenAtom);

  const handleLogin = async () => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, password }),
    });

    const data: LoginResponse = await response.json();

    if ("token" in data) {
      setMessage("로그인 성공");
      // JWT 토큰을 로컬 스토리지에 저장
      sessionStorage.setItem("token", data.token);
      // Jotai 상태 업데이트
      setToken(data.token);

      // 로그인 성공 시, 홈으로 리다이렉트
      router.push("/");
    } else {
      // 로그인 실패 시 에러 메시지 표시
      setMessage(data.error || "로그인 실패");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col py-20 gap-5">
      <div className="flex flex-col items-start gap-4 mb-4">
        <div className="flex gap-4">
          <label htmlFor="userId">아이디</label>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            onChange={(e) => setUserId(e.target.value)}
            id="userId"
            className="bg-gray-400 placeholder-gray-700 text-black px-2"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className="bg-gray-400 placeholder-gray-700 text-black px-2"
          />
        </div>
      </div>
      <button
        onClick={handleLogin}
        className="cursor-pointer bg-sky-600 p-2 rounded "
      >
        로그인
      </button>
      {message && <p>{message}</p>}
      <div className="flex gap-2 mt-4">
        <span>아직 회원이 아니신가요?</span>
        <button
          onClick={() => router.push("/auth/signup")}
          className="cursor-pointer text-sky-600"
        >
          회원가입
        </button>
      </div>
      <div className="flex gap-2 mt-4">
        <span>아이디 또는 비밀번호를 잊으셨나요?</span>
        <button
          onClick={() => router.push("/auth/find")}
          className="cursor-pointer text-sky-600"
        >
          아이디/비밀번호 찾기
        </button>
      </div>
    </div>
  );
}
