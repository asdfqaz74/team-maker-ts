"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import Header from "./components/Header";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

export default function ClientProvider({ children }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          <Header />
          {children}
        </JotaiProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
