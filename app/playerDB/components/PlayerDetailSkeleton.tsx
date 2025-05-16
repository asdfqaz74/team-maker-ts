// components/PlayerDetailLoading.tsx
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

export default function PlayerDetailSkeleton({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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
        {/* 이미지 영역 */}
        <div className="w-full h-[480px] bg-gray-700 animate-pulse" />

        <div className="py-4 px-10 flex flex-col gap-10">
          {/* 이름 영역 */}
          <div className="flex gap-4 items-end">
            <div className="w-32 h-10 bg-gray-600 rounded animate-pulse" />
            <div className="w-24 h-6 bg-gray-600 rounded animate-pulse" />
          </div>

          <Divider sx={{ borderColor: "#fff" }} />

          {/* Elo 타이틀 */}
          <div className="w-40 h-10 bg-gray-600 rounded animate-pulse" />

          {/* Elo 테이블 스켈레톤 */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  {["TOP", "JUG", "MID", "ADC", "SUP"].map((pos) => (
                    <TableCell
                      key={pos}
                      align="center"
                      sx={{ backgroundColor: "#DCDCDC" }}
                    >
                      {pos}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ backgroundColor: "#1e1e1e" }}>
                  {[...Array(5)].map((_, idx) => (
                    <TableCell key={idx} align="center">
                      <div className="w-10 h-4 bg-gray-700 rounded animate-pulse mx-auto" />
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ borderColor: "#fff" }} />

          {/* 최근 5게임 타이틀 */}
          <div className="w-48 h-10 bg-gray-600 rounded animate-pulse" />

          <div className="flex justify-between px-10">
            {/* 포지션 그래프 */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-4 bg-gray-600 rounded animate-pulse" />
              <div className="w-40 h-40 bg-gray-700 rounded animate-pulse" />
            </div>
            {/* 승률 그래프 */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-4 bg-gray-600 rounded animate-pulse" />
              <div className="w-40 h-40 bg-gray-700 rounded-full animate-pulse" />
            </div>
            {/* 최근 챔피언 */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-4 bg-gray-600 rounded animate-pulse" />
              <div className="flex gap-2">
                {[...Array(3)].map((_, idx) => (
                  <div
                    key={idx}
                    className="w-20 h-20 bg-gray-700 rounded-xl animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 최근 매치 테이블 */}
          <div className="w-full h-40 bg-gray-800 rounded-lg animate-pulse" />
        </div>
      </div>
    </Dialog>
  );
}
