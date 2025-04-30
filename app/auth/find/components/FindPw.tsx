import { useToast } from "@/app/components/ToastContext";
import { useState } from "react";

type FindPwResponse =
  | {
      message: string;
    }
  | {
      error: string;
    };

export default function FindPw() {
  const [findPwName, setFindPwName] = useState("");
  const [findPwEmail, setFindPwEmail] = useState("");
  const [findPwId, setFindPwId] = useState("");

  const { showSnack } = useToast();

  const handleResetPassword = async () => {
    const response = await fetch("/api/auth/find-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ findPwName, findPwEmail, findPwId }),
    });
    const data: FindPwResponse = await response.json();

    if ("message" in data) {
      showSnack("비밀번호 재설정 이메일이 전송되었습니다.", "success");
    } else {
      showSnack(data.error || "비밀번호 찾기 실패", "error");
    }
  };

  return (
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
    </div>
  );
}
