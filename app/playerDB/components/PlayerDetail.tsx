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
import { useEffect, useState } from "react";

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

type TopChampionsType = {
  champion: string;
  championImage: string;
  count: number;
  lossCount: number;
  winCount: number;
  winRate: number;
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

interface MatchFormatted {
  matchId: string;
  me: {
    champion: string;
    win: boolean;
    team: "Blue" | "Red";
    kda: {
      kills: number;
      deaths: number;
      assists: number;
    };
    championImage: string;
  };
  teamPlayerData: PlayerFormatted[];
  enemyPlayerData: PlayerFormatted[];
  maxDamage: number;
  maxTaken: number;
}

interface PlayerFormatted {
  nickName: string;
  champion: string;
  championImage: string;
  kda: {
    kills: number;
    deaths: number;
    assists: number;
  };
  damage: {
    dealt: number;
    taken: number;
  };
  wards: {
    placed: number;
    bought: number;
    killed: number;
  };
  cs: number;
}

const placeholderImage = "/images/components/placeholder.webp";

export default function PlayerDetail({
  open,
  onClose,
  player,
}: PlayerDetailProps) {
  const [matches, setMatches] = useState<MatchFormatted[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // userDetail 정보 가져오기
  const {
    data: userDetail = [],
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["userDetail", player],
    queryFn: () => fetchPlayerDetail(player!, 0, 5),
    enabled: !!player,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess && userDetail) {
      setMatches(userDetail.recentMatches || []);
      setSkip(5);
      setHasMore(true);
    }
  }, [isSuccess, userDetail]);

  const user = userDetail?.user;
  const recentMatches = userDetail?.recentMatches;
  const recentMatchesData = userDetail?.recentMatchesData;
  const topChampions: TopChampionsType[] = userDetail?.topChampions;
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

  const handleLoadMore = async () => {
    const moreData = await fetchPlayerDetail(player!, skip, 5);
    setMatches((prev) => [...prev, ...moreData.recentMatches]);
    setSkip((prev) => prev + 5);

    if (moreData.recentMatches.length === 0) {
      setHasMore(false);
    }
  };

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
          {/* 모스트 챔피언 */}
          <span className="text-4xl text-white font-bold">모스트 챔피언 5</span>
          {topChampions?.length > 0 ? (
            <div className="flex justify-between px-10">
              {topChampions?.map((champion, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <Image
                    src={champion.championImage}
                    alt={champion.champion}
                    width={100}
                    height={100}
                  />
                  <span className="text-white font-semibold">
                    {champion.champion}
                  </span>
                  <div className="flex gap-2 font-semibold text-white">
                    <span>{champion.count}</span>
                    <span>/</span>
                    <span className="text-blue-500">{champion.winCount}</span>
                    <span>/</span>
                    <span className="text-red-500">{champion.lossCount}</span>
                  </div>
                  <span className="text-white font-semibold">
                    승률: {champion.winRate}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-white text-center mt-10">
              모스트 챔피언이 없습니다.
            </span>
          )}
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
                  <div className="flex flex-col items-center gap-5">
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
            <MatchResultTable data={matches} />
          ) : (
            <div></div>
          )}
          {/* 더보기 버튼 */}
          {hasMore && (
            <button
              onClick={handleLoadMore}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer"
            >
              더보기
            </button>
          )}
        </div>
      </div>
    </Dialog>
  );
}
