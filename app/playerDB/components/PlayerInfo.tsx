import { fetchUserData } from "@/lib/api/fetchUserData";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import PlayerDetail from "./PlayerDetail";
import { useState } from "react";
import LoadingSpinner from "@/public/lottie/components/LoadingSpinner";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import MobileLoadingSpinner from "@/public/lottie/components/MobileLoadingSpinner";

interface Player {
  _id: string;
  name: string;
  nickName: string;
  position: "top" | "jug" | "mid" | "adc" | "sup";
  eloRating: number;
  winRate: number;
}

function createData(
  name: string,
  nickName: string,
  position: Player["position"],
  eloRating: number,
  winRate: number,
  _id: string
): Player {
  return { name, nickName, position, eloRating, winRate, _id };
}

export default function PlayerInfo({ status }: { status: string }) {
  const [open, setOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const { ismd } = useBreakpoint();

  // 모달 열기
  const handleOpen = (id: string) => {
    setSelectedPlayer(id);
    setOpen(true);
  };

  // 모달 닫기
  const handleClose = () => setOpen(false);

  const {
    data: playerInfo = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["playerInfo"],
    queryFn: fetchUserData,
    enabled: status === "authenticated",
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  // 표에 나타날 데이터
  const rows: Player[] = playerInfo.map((player: Player) =>
    createData(
      player.name,
      player.nickName,
      player.position,
      player.eloRating,
      player.winRate,
      player._id
    )
  );

  if (isLoading)
    return ismd ? <LoadingSpinner text="" /> : <MobileLoadingSpinner />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!playerInfo) return <div>No data available</div>;

  return (
    <div className="lg:max-w-[59.375rem] lg:min-w-[43.75rem] max-w-[21.875rem] sm:max-w-[50rem] mx-auto">
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "fixed" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  width: { xs: 100, md: 200 },
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                이름
              </TableCell>
              <TableCell
                sx={{
                  width: { xs: 100, sm: 150, md: 200 },
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                닉네임
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", md: "table-cell" },
                }}
              >
                포지션
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", sm: "table-cell" },
                }}
              >
                최고 Elo
              </TableCell>
              <TableCell>승률</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#2e2b4f",
                  },
                  backgroundColor: "#1e1e1e",
                }}
                onClick={() => handleOpen(row._id)}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    color: "#dcdcdc",
                    width: { xs: 100, md: 200 },
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row?.name}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#dcdcdc",
                    width: { xs: 100, sm: 150, md: 200 },
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row?.nickName}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#dcdcdc",
                    display: { xs: "none", md: "table-cell" },
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row?.position}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#dcdcdc",
                    display: { xs: "none", sm: "table-cell" },
                  }}
                >
                  {row?.eloRating}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#dcdcdc",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row?.winRate}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PlayerDetail open={open} onClose={handleClose} player={selectedPlayer} />
    </div>
  );
}
