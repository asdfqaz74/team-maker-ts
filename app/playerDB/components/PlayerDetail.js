import { fetchPlayerDetail } from "@/lib/api/fetchPlayerDetail";
import { Dialog } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function PlayerDetail({ open, onClose, player }) {
  // userDetail 정보 가져오기
  const {
    data: userDetail = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userDetail", player?.name],
    queryFn: () => fetchPlayerDetail(player?._id),
    enabled: !!player?._id,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!userDetail) return <div>No data available</div>;

  console.log("userDetail", userDetail);

  return (
    <Dialog open={open} onClose={onClose} autoFocus>
      <div>
        <p>안녕</p>
      </div>
    </Dialog>
  );
}
