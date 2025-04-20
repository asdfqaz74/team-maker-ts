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

export default function DetailResultTable({
  blueTeamRows,
  redTeamRows,
  isMyTeamWin,
  maxDamage,
  maxTaken,
}) {
  console.log("blueTeamRows", blueTeamRows);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="detail result table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: `${isMyTeamWin ? "#0B89CF" : "#E34646"}`,
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
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
          <TableBody>
            {blueTeamRows.map((row, idx) => (
              <TableRow
                key={idx}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="center">
                  <div className="flex justify-center items-center">
                    <Image
                      src={row.championImage}
                      alt="초상화"
                      width={50}
                      height={50}
                    />
                  </div>
                </TableCell>
                <TableCell align="center">{row.nickName}</TableCell>
                <TableCell align="center">
                  <div className="flex justify-center items-center gap-2 font-bold text-2xl">
                    <span>{row.kda.kills}</span>
                    <span>/</span>
                    <span className="text-[#E73F50]">{row.kda.deaths}</span>
                    <span>/</span>
                    <span>{row.kda.assists}</span>
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className="flex justify-center items-center gap-2 font-bold text-2xl">
                    <DamageGraph
                      dealt={row.damage.dealt}
                      taken={row.damage.taken}
                      maxDealt={maxDamage}
                      maxTaken={maxTaken}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
