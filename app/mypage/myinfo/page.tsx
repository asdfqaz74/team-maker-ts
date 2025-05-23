"use client";
import { useState } from "react";
import { fetchMe } from "@/lib/api/fetchMe";
import InfoEmpty from "./components/InfoEmpty";
import { useQuery } from "@tanstack/react-query";
import InfoLoading from "./components/InfoLoading";
import { signOut, useSession } from "next-auth/react";
import { ExceptPasswordMember } from "@/types/member";
import { useToast } from "@/app/components/ToastContext";
import Spinner from "@/public/images/components/spinner.svg";
import Category from "@/public/images/components/Category.svg";

export default function MyInfoPage() {
  // 수정하기 상태
  const [isEdit, setIsEdit] = useState(false);
  const [userId, setUserId] = useState("");

  const { showSnack } = useToast();
  const { data: session, status } = useSession();

  // 내 정보 가져오기
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<ExceptPasswordMember>({
    queryKey: ["me"],
    queryFn: async () => fetchMe(),
    enabled: !!session,
  });

  if (status === "loading") {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 z-50">
        <Spinner />
        <p className="mt-4 text-white text-lg">
          로그인 정보를 확인 중입니다...
        </p>
      </div>
    );
  }
  // 에러 처리
  if (isError) {
    return <div>{error.message}</div>;
  }

  if (isLoading) return <InfoLoading />;

  if (!user) return <InfoEmpty />;

  // 수정 완료 핸들러
  const handleEdit = async () => {
    setIsEdit(false);
    try {
      const response = await fetch("/api/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          changeId: userId,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        showSnack("아이디 수정에 실패했습니다.", "error");
        return;
      }

      alert("아이디가 수정되었습니다. 다시 로그인 해주세요.");
      signOut();
      return;
    } catch (error: any) {
      console.error("Error:", error);
      showSnack(error, "error");
    } finally {
      setIsEdit(false);
    }
  };

  return (
    <div className="max-w-[43.75rem] w-full h-full">
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
      <div className="w-full bg-white rounded-2xl px-8 py-6 gap-4 h-3/4">
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
