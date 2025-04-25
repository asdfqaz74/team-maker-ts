"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import Token from "./components/Token";
import Header from "./components/Header";

const queryClient = new QueryClient();

export default function ClientProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <Token />
        <Header />
        {children}
      </JotaiProvider>
    </QueryClientProvider>
  );
}
