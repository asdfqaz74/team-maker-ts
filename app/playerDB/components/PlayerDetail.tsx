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
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import RecentPositionGraph from "./RecentPositionGraph";
import RecentWinRateGraph from "./RecentWinRateGraph";
import RecentPlayedChampions from "./RecentPlayedChampions";
import MatchResultTable from "./MatchResultTable";
import PlayerDetailSkeleton from "./PlayerDetailSkeleton";

type EloRow = {
  top: number;
  jug: number;
  mid: number;
  adc: number;
  sup: number;
};

type PlayerDetailProps = {
  open: boolean;
  onClose: () => void;
  player: string | null;
};

function createData(
  top: number,
  jug: number,
  mid: number,
  adc: number,
  sup: number
): EloRow {
  return { top, jug, mid, adc, sup };
}

const placeholderImage = "/images/components/placeholder.webp";

export default function PlayerDetail({
  open,
  onClose,
  player,
}: PlayerDetailProps) {
  // userDetail 정보 가져오기
  const {
    data: userDetail = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userDetail", player],
    queryFn: () => fetchPlayerDetail(player!),
    enabled: !!player,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });

  const user = userDetail?.user;
  const recentMatches = userDetail?.recentMatches;
  const recentMatchesData = userDetail?.recentMatchesData;
  const positionData = recentMatchesData?.[0]?.position;
  const win = recentMatchesData?.[0]?.totalWins;
  const lose = recentMatchesData?.[0]?.totalLosses;
  const winRate = recentMatchesData?.[0]?.winRate;
  const recentPlayedChampions = recentMatchesData?.[0]?.championImages;

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

  if (isLoading) return <PlayerDetailSkeleton open={open} onClose={onClose} />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!userDetail) return <div>No data available</div>;

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
          src={user?.mostPlayedChampion || placeholderImage}
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
                  <TableCell align="center" sx={{ backgroundColor: "#DCDCDC" }}>
                    TOP
                  </TableCell>
                  <TableCell align="center" sx={{ backgroundColor: "#DCDCDC" }}>
                    JUG
                  </TableCell>
                  <TableCell align="center" sx={{ backgroundColor: "#DCDCDC" }}>
                    MID
                  </TableCell>
                  <TableCell align="center" sx={{ backgroundColor: "#DCDCDC" }}>
                    ADC
                  </TableCell>
                  <TableCell align="center" sx={{ backgroundColor: "#DCDCDC" }}>
                    SUP
                  </TableCell>
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
          <div className="flex flex-col gap-10">
            {/* 최근 5게임 그래프 */}
            {recentMatches?.length > 0 ? (
              <>
                <span className="text-4xl text-white font-bold">
                  최근 5게임
                </span>
                <div className="flex justify-between px-10">
                  <div className="flex flex-col items-center gap-10">
                    <span className="text-white font-semibold">포지션</span>
                    <RecentPositionGraph data={positionData} />
                  </div>
                  <div className="flex flex-col items-center gap-10">
                    <span className="text-white font-semibold">승률</span>
                    <RecentWinRateGraph
                      win={win}
                      lose={lose}
                      winRate={winRate}
                    />
                  </div>
                  <RecentPlayedChampions data={recentPlayedChampions} />
                </div>
              </>
            ) : (
              <>
                <span className="text-4xl text-white font-bold">
                  최근 5게임
                </span>
                <span className="text-white text-center mt-10">
                  최근 게임이 없습니다.
                </span>
              </>
            )}
          </div>
          {/* 최근 매치 테이블 5경기 */}
          {recentMatches?.length > 0 ? (
            <MatchResultTable data={recentMatches} />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Dialog>
  );
}
