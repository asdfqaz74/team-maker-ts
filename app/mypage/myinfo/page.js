"use client";

import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom, tokenAtom } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "@/lib/api/fetchMe";

export default function MyInfoPage() {
  const [, setUser] = useAtom(userAtom);
  const router = useRouter();
  const [token] = useAtom(tokenAtom);

  const storedToken =
    token || (typeof window !== "undefined" && sessionStorage.getItem("token"));

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["me"],
    queryFn: async () => fetchMe(storedToken),
    enabled: !!storedToken,
    onSuccess: (data) => {
      setUser(data.user);
    },
    onError: () => {
      router.push("/auth/login");
    },
  });

  if (isError) {
    return <div>{error.message}</div>;
  }
  if (isLoading) {
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
