"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import Header from "./components/Header";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export default function ClientProvider({
  children,
  session,
}: {
  children: ReactNode;
  session: any;
}) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          <Header />
          <div className="pt-[4.8125rem]">{children}</div>
        </JotaiProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
