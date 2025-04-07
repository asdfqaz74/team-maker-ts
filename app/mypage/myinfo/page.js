"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyInfoPage() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    const fetchUser = async () => {
      const response = await fetch("/api/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
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
  }, [router]);

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
