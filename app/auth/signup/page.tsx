"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { API } from "@/constants";

export default function SignupPage() {
  const [message, setMessage] = useState("");

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    const response = await fetch(API.AUTH.SIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();

    if (response.ok) {
      setMessage("회원가입 성공");
      // 회원가입 성공 시, 로그인 페이지로 리다이렉트
      router.push("/auth/login");
    } else {
      // 회원가입 실패 시 에러 메시지 표시
      setMessage(res.error || "회원가입 실패");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-4 p-4"
    >
      <h1 className="text-xl font-bold">회원가입</h1>
      <div className="space-y-2">
        <div className="mb-4">
          <span>아이디</span>
          <input
            {...register("userId", { required: "아이디는 필수입니다." })}
            placeholder="아이디를 입력하세요."
            className="w-full border p-2"
          />
          <p className="text-red-500 text-sm h-5">
            {errors.userId?.message || ""}
          </p>
        </div>
        <div className="mb-4">
          <span>비밀번호</span>
          <input
            {...register("password", {
              required: "비밀번호는 필수입니다.",
              validate: (value) =>
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ||
                "비밀번호는 영문 + 숫자 조합으로 8자리 이상이어야 합니다.",
            })}
            type="password"
            placeholder="비밀번호를 입력하세요."
            className="w-full border p-2"
          />
          <p className="text-red-500 text-sm h-5">
            {errors.password?.message || ""}
          </p>
        </div>
        <div className="space-y-2">
          <span>비밀번호 확인</span>
          <input
            {...register("recheckPassword", {
              required: "비밀번호 확인은 필수입니다.",
              validate: (value) =>
                value === watch("password") || "비밀번호가 일치하지 않습니다.",
            })}
            type="password"
            placeholder="비밀번호를 다시 입력하세요."
            className="w-full border p-2"
          />
          <p className="text-red-500 text-sm h-5">
            {errors.recheckPassword?.message || ""}
          </p>
        </div>
        <div className="space-y-2">
          <span>이름</span>
          <input
            {...register("name", { required: "이름은 필수입니다." })}
            placeholder="이름을 입력하세요."
            className="w-full border p-2"
          />
          <p className="text-red-500 text-sm h-5">
            {errors.name?.message || ""}
          </p>
        </div>
        <div className="space-y-2">
          <span>이메일</span>
          <input
            {...register("email", {
              required: "이메일은 필수입니다.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "유효한 이메일 주소를 입력하세요.",
              },
            })}
            placeholder="이메일을 입력하세요."
            className="w-full border p-2"
          />
          <p className="text-red-500 text-sm h-5">
            {errors.email?.message || ""}
          </p>
        </div>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        회원가입
      </button>
      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
    </form>
  );
}
