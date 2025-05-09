import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
} from "@mui/material";

export default function PlayerInfoSkeleton() {
  return (
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
          {Array.from({ length: 5 }).map((_, idx) => (
            <TableRow
              key={idx}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#2e2b4f",
                },
                backgroundColor: "#1e1e1e",
              }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <TableCell key={i} sx={{ color: "#dcdcdc" }}>
                  <Skeleton
                    variant="text"
                    width="100%"
                    sx={{ backgroundColor: "#fff" }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
