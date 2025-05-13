"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PickPlayers from "./components/PickPlayers";
import PickTeamMode from "./components/PickTeamMode";
import { useState } from "react";
import PickLeader from "./components/PickLeader/PickLeader";

export default function Page() {
  const [step, setStep] = useState(1);

  const { status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/auth/login");
  }

  return (
    <div className="px-60 py-20">
      {step === 1 && <PickPlayers onNext={() => setStep(2)} />}
      {step === 2 && (
        <PickLeader onNext={() => setStep(3)} onPrev={() => setStep(1)} />
      )}
      {step === 3 && <PickTeamMode onPrev={() => setStep(2)} />}
    </div>
  );
}
