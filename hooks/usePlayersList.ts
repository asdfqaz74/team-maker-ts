import { fetchPlayers } from "@/lib/api/fetchPlayers"
import { useQuery } from "@tanstack/react-query"

export const usePlayerList = () => {
  return useQuery({
    queryKey: ["players"],
    queryFn: async () => fetchPlayers(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 60,
  })
}