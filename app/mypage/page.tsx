"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/mypage/myinfo");
  }, [router]);

  return null;
}
