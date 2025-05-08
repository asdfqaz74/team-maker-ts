import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Image from "next/image";
import DamageGraph from "./DamageGraph";

interface PlayerRow {
  nickName: string;
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
    bought: number;
    placed: number;
    killed: number;
  };
  cs: number;
}

interface DetailResultTableProps {
  blueTeamRows: PlayerRow[];
  redTeamRows: PlayerRow[];
  isMyTeamWin: boolean;
  maxDamage: number;
  maxTaken: number;
}

export default function DetailResultTable({
  blueTeamRows,
  redTeamRows,
  isMyTeamWin,
  maxDamage,
  maxTaken,
}: DetailResultTableProps) {
  return (
    <div>
      <TableContainer component={Paper} sx={{ borderRadius: "0" }}>
        <Table
          sx={{ width: "100%" }}
          size="small"
          aria-label="detail result table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: `${isMyTeamWin ? "#0B89CF" : "#E34646"}`,
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  border: "none",
                }}
                align="center"
              >
                {isMyTeamWin ? "승리" : "패배"}
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#10131C",
                  color: "#3F8FC4",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  width: "8.75rem",
                  border: "none",
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
                  width: "11.5625rem",
                  border: "none",
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
                  width: "18.125rem",
                  border: "none",
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
                  border: "none",
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
                  border: "none",
                }}
                align="center"
              >
                CS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blueTeamRows.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: idx % 2 === 0 ? "#233F59" : "#203047",
                }}
              >
                <TableCell align="center" sx={{ border: "none" }}>
                  <div className="flex justify-center items-center">
                    <Image
                      src={row.championImage}
                      alt="초상화"
                      width={50}
                      height={50}
                    />
                  </div>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    width: "8.75rem",
                    padding: "0",
                    border: "none",
                  }}
                >
                  <span className="block truncate text-center whitespace-nowrap overflow-hidden w-[8.75rem] text-white font-semibold">
                    {row.nickName}
                  </span>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ width: "11.5625rem", border: "none" }}
                >
                  <div className="flex justify-center items-center gap-2 font-bold text-2xl text-white">
                    <span>{row.kda.kills}</span>
                    <span>/</span>
                    <span className="text-[#E73F50]">{row.kda.deaths}</span>
                    <span>/</span>
                    <span>{row.kda.assists}</span>
                  </div>
                </TableCell>
                <TableCell align="center" sx={{ border: "none" }}>
                  <div className="flex justify-center items-center gap-2 font-bold text-2xl">
                    <DamageGraph
                      dealt={row.damage.dealt}
                      taken={row.damage.taken}
                      maxDealt={maxDamage}
                      maxTaken={maxTaken}
                    />
                  </div>
                </TableCell>
                <TableCell align="center" sx={{ border: "none" }}>
                  <div className="flex flex-col justify-center items-center text-white">
                    <span className="text-rose-500">{row.wards.bought}</span>
                    <div className="flex gap-1">
                      <span>{row.wards.placed}</span>
                      <span>/</span>
                      <span>{row.wards.killed}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="center" sx={{ border: "none" }}>
                  <span className="text-white">{row.cs}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 레드팀 */}
      <TableContainer
        component={Paper}
        sx={{ borderTopRightRadius: "0", borderTopLeftRadius: "0" }}
      >
        <Table
          sx={{ width: "100%" }}
          size="small"
          aria-label="detail result table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: `${!isMyTeamWin ? "#0B89CF" : "#E34646"}`,
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  border: "none",
                }}
                align="center"
              >
                {!isMyTeamWin ? "승리" : "패배"}
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#10131C",
                  color: "#DA5E66",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  width: "8.75rem",
                  border: "none",
                }}
                align="center"
              >
                레드 팀
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#10131C",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  width: "11.5625rem",
                  border: "none",
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
                  width: "18.125rem",
                  border: "none",
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
                  border: "none",
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
                  border: "none",
                }}
                align="center"
              >
                CS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {redTeamRows.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: idx % 2 === 0 ? "#402937" : "#2A2131",
                }}
              >
                <TableCell align="center" sx={{ border: "none" }}>
                  <div className="flex justify-center items-center">
                    <Image
                      src={row.championImage}
                      alt="초상화"
                      width={50}
                      height={50}
                    />
                  </div>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    width: "8.75rem",
                    padding: "0",
                    border: "none",
                  }}
                >
                  <span className="block truncate text-center whitespace-nowrap overflow-hidden w-[8.75rem] text-white font-semibold">
                    {row.nickName}
                  </span>
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ width: "11.5625rem", border: "none" }}
                >
                  <div className="flex justify-center items-center gap-2 font-bold text-2xl text-white">
                    <span>{row.kda.kills}</span>
                    <span>/</span>
                    <span className="text-[#E73F50]">{row.kda.deaths}</span>
                    <span>/</span>
                    <span>{row.kda.assists}</span>
                  </div>
                </TableCell>
                <TableCell align="center" sx={{ border: "none" }}>
                  <div className="flex justify-center items-center gap-2 font-bold text-2xl">
                    <DamageGraph
                      dealt={row.damage.dealt}
                      taken={row.damage.taken}
                      maxDealt={maxDamage}
                      maxTaken={maxTaken}
                    />
                  </div>
                </TableCell>
                <TableCell align="center" sx={{ border: "none" }}>
                  <div className="flex flex-col justify-center items-center text-white">
                    <span className="text-rose-500">{row.wards.bought}</span>
                    <div className="flex gap-1">
                      <span>{row.wards.placed}</span>
                      <span>/</span>
                      <span>{row.wards.killed}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="center" sx={{ border: "none" }}>
                  <span className="text-white">{row.cs}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
