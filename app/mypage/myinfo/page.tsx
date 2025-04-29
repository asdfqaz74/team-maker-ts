"use client";

import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom, tokenAtom } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "@/lib/api/fetchMe";

import Category from "@/public/images/components/Category.svg";
import { useEffect, useState } from "react";
import { useToast } from "@/app/components/ToastContext";
import SkeletonBox from "@/app/components/SkeletonBox";
import { ExceptPasswordMember } from "@/types/member";

export default function MyInfoPage() {
  const [, setUser] = useAtom(userAtom);
  const router = useRouter();
  const [token, setToken] = useAtom(tokenAtom);
  const [storedToken, setStoredToken] = useState<string | null>(null);
  const [isMouted, setIsMouted] = useState(false);

  // 마운트가 됐는지
  useEffect(() => {
    setIsMouted(true);
  }, []);

  // 스낵바
  const { showSnack } = useToast();

  // 수정하기 상태
  const [isEdit, setIsEdit] = useState(false);

  // 아이디 인풋 상태
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setStoredToken(token);
  }, [token]);

  const tokenToUse = storedToken || token;

  // 내 정보 가져오기
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<ExceptPasswordMember>({
    queryKey: ["me"],
    queryFn: async () => fetchMe(tokenToUse),
    enabled: !!tokenToUse,
  });
  // 유저 저장
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  useEffect(() => {
    if (isMouted && !tokenToUse) {
      router.push("/auth/login");
    }
  }, [router, tokenToUse, isMouted]);

  if (!isMouted || !tokenToUse) {
    return null;
  }

  // 에러 처리
  if (isError) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return (
      <div className="w-full text-black">
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-bold text-2xl flex items-center gap-4">
            <Category />
            <SkeletonBox width="w-32" height="h-8" />
          </h1>
          <SkeletonBox width="w-24" height="h-8" />
        </div>

        <div className="w-full bg-white rounded-2xl px-8 py-6 gap-4 max-w-[30rem]">
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-10 font-bold">
              <SkeletonBox width="w-16" />
              <SkeletonBox width="w-16" />
              <SkeletonBox width="w-16" />
            </div>
            <div className="flex flex-col gap-10">
              <SkeletonBox width="w-40" />
              <SkeletonBox width="w-40" />
              <SkeletonBox width="w-40" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full text-black">
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-bold text-2xl flex items-center gap-4">
            <Category />
            <span>내 정보</span>
          </h1>
          <button className="px-2 py-1 bg-[#FF5B32] rounded-2xl text-sm text-white cursor-pointer hover:bg-[#d9483a] transition-colors duration-200">
            수정하기
          </button>
        </div>

        <div className="w-full bg-white rounded-2xl px-8 py-6 gap-4">
          <div className="flex justify-between gap-4 max-w-[30rem]">
            <div className="flex flex-col gap-10 font-bold">
              <h2>아이디</h2>
              <h2>이메일</h2>
              <h2>이름</h2>
            </div>
            <div className="flex flex-col gap-10">
              <p>-</p>
              <p>-</p>
              <p>-</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 수정 완료 핸들러
  const handleEdit = async () => {
    setIsEdit(false);
    try {
      const response = await fetch("/api/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showSnack("아이디 수정에 실패했습니다.", "error");
        return;
      }

      if (data.token) {
        sessionStorage.setItem("token", data.token);
        setToken(data.token);
      }

      showSnack("아이디 수정이 완료되었습니다.", "success");

      await refetch();
    } catch (error: any) {
      console.error("Error:", error);
      showSnack(error, "error");
    } finally {
      setIsEdit(false);
    }
  };

  return (
    <div className=" w-full text-black">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl flex items-center gap-4 mb-10">
          <Category />
          <span>내 정보</span>
        </h1>
        {!isEdit && (
          <button
            className="px-2 py-1 bg-[#FF5B32] rounded-2xl text-sm text-white cursor-pointer hover:bg-[#d9483a] transition-colors duration-200"
            onClick={() => setIsEdit(true)}
          >
            수정하기
          </button>
        )}
        {!!isEdit && (
          <div className="flex gap-4">
            <button
              className="px-2 py-1 bg-[#FF5B32] rounded-2xl text-sm text-white cursor-pointer hover:bg-[#d9483a] transition-colors duration-200"
              onClick={handleEdit}
            >
              수정하기
            </button>
            <button
              className="px-2 py-1 bg-[#FF5B32] rounded-2xl text-sm text-white cursor-pointer hover:bg-[#d9483a] transition-colors duration-200"
              onClick={() => setIsEdit(false)}
            >
              취소하기
            </button>
          </div>
        )}
      </div>
      <div className="w-full bg-white rounded-2xl px-8 py-6 gap-4">
        <div className="flex justify-between gap-4 max-w-[30rem]">
          <div className="flex flex-col gap-10 font-bold">
            <h2>아이디</h2>
            <h2>이메일</h2>
            <h2>이름</h2>
          </div>
          <div className="flex flex-col gap-10">
            {!isEdit && <p>{user.userId}</p>}
            {!!isEdit && (
              <input
                type="text"
                pattern="[a-zA-Z0-9]{4,20}"
                defaultValue={user.userId}
                className="bg-gray-200 px-2"
                onChange={(e) => setUserId(e.target.value || user.userId)}
                placeholder="아이디를 입력하세요."
                maxLength={20}
                minLength={4}
                required
              />
            )}
            <p>{user.email}</p>
            <p>{user.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
