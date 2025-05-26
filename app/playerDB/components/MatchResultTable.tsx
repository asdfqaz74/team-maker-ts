import Image from "next/image";
import Arrow from "@/public/images/components/arrow.svg";
import { useState } from "react";
import DetailResultTable from "./DetailResultTable";
import { motion, AnimatePresence } from "framer-motion";

type PlayerRow = {
  championImage: string;
  nickName: string;
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
};

type KDA = {
  kills: number;
  deaths: number;
  assists: number;
};

type Damage = {
  dealt: number;
  taken: number;
};

type Wards = {
  placed: number;
  bought: number;
  killed: number;
};

type Player = {
  nickName: string;
  champion: string;
  championImage: string;
  kda: KDA;
  damage: Damage;
  wards: Wards;
  cs: number;
};

type Me = {
  championImage: string;
  champion: string;
  kda: KDA;
  win: boolean;
  team: "Blue" | "Red";
};

type Match = {
  matchId: string;
  me: Me;
  maxDamage: number;
  maxTaken: number;
  teamPlayerData: Player[];
  enemyPlayerData: Player[];
};

function createData(
  championImage: string,
  nickName: string,
  kda: PlayerRow["kda"],
  damage: PlayerRow["damage"],
  wards: PlayerRow["wards"],
  cs: number
): PlayerRow {
  return {
    championImage,
    nickName,
    kda,
    damage,
    wards,
    cs,
  };
}

export default function MatchResultTable({ data = [] }) {
  const [isClicked, setIsClicked] = useState<Record<string, boolean>>({});

  const toggleMatch = (matchId: string) => () => {
    setIsClicked((prev) => ({
      ...prev,
      [matchId]: !prev[matchId],
    }));
  };
  return (
    <>
      {data.map((match: Match) => {
        const me = match.me;
        const isWin = me.win;
        const maxDamage = match.maxDamage;
        const maxTaken = match.maxTaken;
        const teamPlayerData = match.teamPlayerData;
        const enemyPlayerData = match.enemyPlayerData;
        const isOpen = isClicked[match.matchId];
        const myTeam = me.team;
        const isMyTeamWin = myTeam === "Blue" ? isWin : !isWin;

        // 블루 팀의 row 데이터
        const blueTeamRows = (
          myTeam === "Blue" ? teamPlayerData : enemyPlayerData
        ).map((player) =>
          createData(
            player.championImage,
            player.nickName,
            player.kda,
            player.damage,
            player.wards,
            player.cs
          )
        );

        // 레드 팀의 row 데이터
        const redTeamRows = (
          myTeam === "Red" ? teamPlayerData : enemyPlayerData
        ).map((player) =>
          createData(
            player.championImage,
            player.nickName,
            player.kda,
            player.damage,
            player.wards,
            player.cs
          )
        );

        return (
          <div className="w-full" key={match.matchId}>
            <div
              className={`relative w-full h-[9.375rem] ${
                isWin ? "bg-[#2E3D59]" : "bg-[#59343B]"
              }`}
            >
              <div
                className={`absolute w-[1.875rem] h-full ${
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
                <div className="flex flex-col gap-1 text-[#DCDCDC]">
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
                <div className="flex flex-col gap-1 text-[#DCDCDC]">
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
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="slide-down"
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <DetailResultTable
                    blueTeamRows={blueTeamRows}
                    redTeamRows={redTeamRows}
                    isMyTeamWin={isMyTeamWin}
                    maxDamage={maxDamage}
                    maxTaken={maxTaken}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </>
  );
}
