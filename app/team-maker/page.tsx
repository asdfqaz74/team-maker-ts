"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import { useState } from "react";

export default function Page() {
  const [step, setStep] = useState(1);

  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/auth/login");
  }

  return (
    <div className="px-60 py-20">
      {step === 1 && <StepOne onNext={() => setStep(2)} />}
      {step === 2 && <StepTwo onPrev={() => setStep(1)} />}
    </div>
  );
}
