"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/auth/login");
  }

  return <div>Team Maker</div>;
}
