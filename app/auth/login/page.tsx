"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  // 로그인 상태를 관리하기 위한 상태 변수
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    const result = await signIn("credentials", {
      userId,
      password,
      redirect: false,
    });

    if (result?.error) {
      setMessage("아이디 또는 비밀번호가 잘못되었습니다.");
    } else {
      window.location.href = "/";
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
