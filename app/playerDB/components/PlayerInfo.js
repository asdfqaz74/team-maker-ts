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

function createData(name, nickName, position, eloRating, winRate, _id) {
  return { name, nickName, position, eloRating, winRate, _id };
}

export default function PlayerInfo() {
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
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.name}
                </TableCell>
                <TableCell>{row?.nickName}</TableCell>
                <TableCell>{row?.position}</TableCell>
                <TableCell>{row?.eloRating}</TableCell>
                <TableCell>{row?.winRate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
