"use client";

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
import Image from "next/image";

function createData(top, jug, mid, adc, sup) {
  return { top, jug, mid, adc, sup };
}

export default function PlayerDetailSkeleton({
  open,
  onClose,
  user,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const rows = [
    createData(
      user?.eloRating.top,
      user?.eloRating.jug,
      user?.eloRating.mid,
      user?.eloRating.adc,
      user?.eloRating.sup
    ),
  ];
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
        {/* 모스트 챔피언 이미지 Placeholder */}
        <Image
          src={"/images/components/placeholder.webp"}
          alt="모스트챔피언"
          width={1000}
          height={480}
        />

        <div className="py-4 px-10 flex flex-col gap-10">
          {/* 이름/닉네임 */}
          <div className="flex gap-4 items-end text-white">
            <span className="text-4xl font-bold">{user.name}</span>
            <span className="">{user.nickName}</span>
          </div>

          <Divider sx={{ borderColor: "#fff" }} />

          {/* Elo 점수 */}
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

          {/* 최근 게임 통계 */}
          <div className="flex flex-col gap-10">
            <span className="text-4xl text-white font-bold">최근 5게임</span>
            <div className="flex justify-between px-10">
              <div className="flex flex-col items-center gap-10">
                <span className="text-white font-semibold">포지션</span>
                <div className="w-40 h-40 bg-gray-600" />
              </div>
              <div className="flex flex-col items-center gap-10">
                <span className="text-white font-semibold">승률</span>
                <div className="w-40 h-40 bg-gray-600" />
              </div>
              <div className="flex flex-col items-center gap-10">
                <span className="text-white font-semibold">
                  플레이한 챔피언
                </span>
                <div className="w-40 h-40 bg-gray-600" />
              </div>
            </div>
          </div>

          {/* 매치 테이블 Placeholder */}
          <div className="mt-10 text-white">최근 매치 내역이 없습니다.</div>
        </div>
      </div>
    </Dialog>
  );
}
