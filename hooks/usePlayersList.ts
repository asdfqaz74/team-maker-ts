import { fetchPlayers } from "@/lib/api/fetchPlayers";
import { Player } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const usePlayerList = () => {
  return useQuery<Player[]>({
    queryKey: ["players"],
    queryFn: async () => fetchPlayers(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 60,
  });
};
