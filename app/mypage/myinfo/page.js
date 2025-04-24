"use client";

import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom, tokenAtom } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "@/lib/api/fetchMe";

import Category from "@/public/images/components/Category.svg";

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
      setUser(data);
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

  if (!user) {
    return (
      <div>
        <h1>내 정보</h1>
        <p>아이디: -</p>
        <p>이메일: -</p>
        <p>이름: -</p>
      </div>
    );
  }

  return (
    <div className=" w-full text-black">
      <h1 className="font-bold text-2xl flex items-center gap-4 mb-10">
        <Category />
        <span>내 정보</span>
      </h1>
      <div className="w-full bg-white rounded-2xl px-8 py-6 gap-4">
        <div className="flex justify-between gap-4 w-[30rem]">
          <div className="flex flex-col gap-10 font-bold">
            <h2>아이디</h2>
            <h2>이메일</h2>
            <h2>이름</h2>
          </div>
          <div className="flex flex-col gap-10">
            <p>{user.userId}</p>
            <p>{user.email}</p>
            <p>{user.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
