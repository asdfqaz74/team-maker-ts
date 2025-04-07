"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom, tokenAtom } from "@/store/auth";

export default function MyInfoPage() {
  const [user, setUser] = useAtom(userAtom);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const [token] = useAtom(tokenAtom);

  useEffect(() => {
    const storedToken = token || localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    if (user) return;

    const fetchUser = async () => {
      const response = await fetch("/api/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
      } else {
        setMessage(data.error || "사용자 정보를 가져오는 데 실패했습니다.");
      }
    };

    fetchUser();
  }, [token, user, router, setUser]);

  if (message) {
    return <div>{message}</div>;
  }
  if (!user) {
    return (
      <div>
        <h1>내 정보</h1>
        <p>아이디: 불러오는 중입니다...</p>
        <p>이메일: 불러오는 중입니다...</p>
        <p>이름: 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>내 정보</h1>
      <p>아이디: {user.userId}</p>
      <p>이메일: {user.email}</p>
      <p>이름: {user.name}</p>
    </div>
  );
}
