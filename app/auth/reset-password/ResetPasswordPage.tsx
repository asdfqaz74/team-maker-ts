"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, newPassword: password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    setMessage(data.message || data.error);

    if (response.ok) {
      setTimeout(() => router.push("/"), 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <h2 className="text-xl font-bold">비밀번호 재설정</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
        placeholder="새 비밀번호 입력"
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        변경하기
      </button>
      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
    </form>
  );
}
