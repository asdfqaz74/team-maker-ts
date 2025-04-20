import Image from "next/image";
import Arrow from "@/public/images/components/arrow.svg";
import { useState } from "react";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function createData(championImage, nickName, kda, damage, wards, cs) {
  return { championImage, nickName, kda, damage, wards, cs };
}

export default function MatchResultTable({ data = [] }) {
  const [isClicked, setIsClicked] = useState({});

  const toggleMatch = (matchId) => () => {
    setIsClicked((prev) => ({
      ...prev,
      [matchId]: !prev[matchId],
    }));
  };

  return (
    <>
      {data.map((match) => {
        const me = match.me;
        const isWin = me.win;
        const teamPlayerData = match.teamPlayerData;
        const enemyPlayerData = match.enemyPlayerData;
        const isOpen = isClicked[match.matchId];
        const myTeam = me.team;

        return (
          <div className="w-full" key={match.matchId}>
            <div
              className={`relative w-full h-[9.375rem] rounded-xl ${
                isWin ? "bg-[#2E3D59]" : "bg-[#59343B]"
              }`}
            >
              <div
                className={`absolute w-[1.875rem] h-full rounded-l-xl ${
                  isWin ? "bg-[#5C8EF2]" : "bg-[#F24464]"
                }`}
              ></div>
              {isWin ? (
                <span className="absolute top-4 left-12 text-[#5C8EF2] font-bold text-2xl">
                  승리
                </span>
              ) : (
                <span className="absolute top-4 left-12 text-[#F24464] font-bold text-2xl">
                  패배
                </span>
              )}
              <div className="absolute w-[18.75rem] h-[6.25rem] transform -translate-y-1/2 rounded-full top-1/2 left-40 flex items-center justify-between">
                {/* 내가 했던 챔피언 초상화 */}
                <Image
                  src={me.championImage}
                  alt={me.champion}
                  width={100}
                  height={100}
                  className="rounded-full object-center"
                />
                {/* kda 표시 */}
                <div className="flex items-center justify-center gap-4 font-bold text-white text-2xl">
                  <span>{me.kda.kills}</span>
                  <span>/</span>
                  <span className="text-[#E73F50]">{me.kda.deaths}</span>
                  <span>/</span>
                  <span>{me.kda.assists}</span>
                </div>
              </div>

              {/* 해당 게임에 나왔던 챔피언들 */}
              <div className="absolute w-[15.625rem] right-16 transform -translate-y-1/2 top-1/2 flex justify-between">
                {/* 아군 */}
                <div className="flex flex-col gap-1">
                  {teamPlayerData.map((player) => (
                    <div
                      key={player.nickName}
                      className="flex items-center gap-2"
                    >
                      <Image
                        src={player.championImage}
                        alt={player.champion}
                        width={20}
                        height={20}
                      />
                      <span className="truncate w-[4.375rem] overflow-hidden whitespace-nowrap">
                        {player.nickName}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 적군 */}
                <div className="flex flex-col gap-1">
                  {enemyPlayerData.map((player) => (
                    <div
                      key={player.nickName}
                      className="flex items-center gap-2"
                    >
                      <Image
                        src={player.championImage}
                        alt={player.champion}
                        width={20}
                        height={20}
                      />
                      <span className="truncate w-[4.375rem] overflow-hidden whitespace-nowrap">
                        {player.nickName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 표 열고 닫기 */}
              <button
                onClick={toggleMatch(match.matchId)}
                className={`w-[3.125rem] h-full absolute right-0 cursor-pointer transition-colors duration-500 ${
                  isWin
                    ? "bg-[#476096] hover:bg-[#5C7BBC]"
                    : "bg-[#8D4D5B] hover:bg-[#A85D6B]"
                }`}
              >
                <Arrow
                  className={`absolute bottom-0 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {/* 게임 상세 정보 */}
            {isOpen && (
              <div>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ width: "100%" }}
                    aria-label="detail result table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            backgroundColor: `${isWin ? "#0B89CF" : "#E34646"}`,
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "1.25rem",
                          }}
                          align="center"
                        >
                          {isWin ? "승리" : "패배"}
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "#10131C",
                            color: "#3F8FC4",
                            fontWeight: "bold",
                            fontSize: "1.25rem",
                          }}
                          align="center"
                        >
                          블루 팀
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "#10131C",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "1.25rem",
                          }}
                          align="center"
                        >
                          K / D / A
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "#10131C",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "1.25rem",
                          }}
                          align="center"
                        >
                          피해량
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "#10131C",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "1.25rem",
                          }}
                          align="center"
                        >
                          와드
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "#10131C",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "1.25rem",
                          }}
                          align="center"
                        >
                          CS
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
