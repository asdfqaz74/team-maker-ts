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
import { useSession } from "next-auth/react";

function createData(name, nickName, position, eloRating, winRate, _id) {
  return { name, nickName, position, eloRating, winRate, _id };
}

export default function PlayerInfo() {
  const [open, setOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const { data: session } = useSession();

  // 모달 열기
  const handleOpen = (id) => {
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
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  // 표에 나타날 데이터
  const rows = playerInfo.map((player) =>
    createData(
      player.name,
      player.nickName,
      player.position,
      player.eloRating,
      player.winRate,
      player._id
    )
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!playerInfo) return <div>No data available</div>;

  return (
    <div className="">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>이름</TableCell>
              <TableCell>닉네임</TableCell>
              <TableCell>포지션</TableCell>
              <TableCell>최고 Elo</TableCell>
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
                onClick={() => handleOpen(row)}
              >
                <TableCell component="th" scope="row" sx={{ color: "#dcdcdc" }}>
                  {row?.name}
                </TableCell>
                <TableCell sx={{ color: "#dcdcdc" }}>{row?.nickName}</TableCell>
                <TableCell sx={{ color: "#dcdcdc" }}>{row?.position}</TableCell>
                <TableCell sx={{ color: "#dcdcdc" }}>
                  {row?.eloRating}
                </TableCell>
                <TableCell sx={{ color: "#dcdcdc" }}>{row?.winRate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PlayerDetail open={open} onClose={handleClose} player={selectedPlayer} />
    </div>
  );
}
