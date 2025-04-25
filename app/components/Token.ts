"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { tokenAtom } from "@/store/auth";

export default function Token() {
  const setToken = useSetAtom(tokenAtom);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [setToken]);

  return null;
}
