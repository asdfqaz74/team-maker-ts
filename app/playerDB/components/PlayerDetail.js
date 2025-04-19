import { fetchPlayerDetail } from "@/lib/api/fetchPlayerDetail";
import {
  Dialog,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

function createData(top, jug, mid, adc, sup) {
  return { top, jug, mid, adc, sup };
}

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

  const user = userDetail?.user;
  const recentMatches = userDetail?.recentMatches;
  const recentMatchesWinRate = userDetail?.recentMatchesWinRate;

  // 표에 나타날 데이터
  const rows = [
    createData(
      user?.eloRating.top,
      user?.eloRating.jug,
      user?.eloRating.mid,
      user?.eloRating.adc,
      user?.eloRating.sup
    ),
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (!userDetail) return <div>No data available</div>;

  console.log("user", user);
  console.log("recentMatches", recentMatches);
  console.log("recentMatchesWinRate", recentMatchesWinRate);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      autoFocus
      slotProps={{
        paper: {
          sx: {
            minWidth: "62.5rem",
            minHeight: "30rem",
            backgroundColor: "#1E1E2F",
          },
        },
      }}
    >
      <div className="flex flex-col">
        <Image
          src={user?.mostPlayedChampion}
          alt="모스트챔피언"
          width={1000}
          height={480}
        />
        <div className="py-4 px-10 flex flex-col gap-10">
          <div className="flex gap-4 items-end text-white">
            <span className="text-4xl font-bold">{user?.name}</span>
            <span className="">{user?.nickName}</span>
          </div>
          <Divider sx={{ borderColor: "#fff" }} />
          <span className="text-4xl text-white font-bold">Elo 점수</span>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Elo Rating Table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">TOP</TableCell>
                  <TableCell align="center">JUG</TableCell>
                  <TableCell align="center">MID</TableCell>
                  <TableCell align="center">ADC</TableCell>
                  <TableCell align="center">SUP</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor: "#1e1e1e",
                    }}
                  >
                    <TableCell align="center" sx={{ color: "#dcdcdc" }}>
                      {row.top}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#dcdcdc" }}>
                      {row.jug}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#dcdcdc" }}>
                      {row.mid}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#dcdcdc" }}>
                      {row.adc}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "#dcdcdc" }}>
                      {row.sup}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider sx={{ borderColor: "#fff" }} />
        </div>
      </div>
    </Dialog>
  );
}
