"use client";
import FindPw from "./components/FindPw";
import FindId from "./components/FindId";

export default function FindPage() {
  return (
    <div className="flex justify-center items-center py-20 gap-28">
      <FindId />
      <FindPw />
    </div>
  );
}
