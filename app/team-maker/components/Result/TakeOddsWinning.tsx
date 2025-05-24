import { TeamResponse } from "@/types/team";
import * as d3 from "d3";
import { useEffect, useMemo, useRef } from "react";

interface winRate {
  blueTeam: TeamResponse[];
  redTeam: TeamResponse[];
}

export default function TakeOddsWinning({ blueTeam, redTeam }: winRate) {
  const ref = useRef<SVGSVGElement | null>(null);

  const winRate = useMemo(() => {
    const avg = (team: TeamResponse[]) =>
      team.length === 0
        ? 0
        : team.reduce((acc, cur) => acc + +cur.winRate, 0) / team.length;

    return {
      teamAwinRate: avg(blueTeam),
      teamBwinRate: avg(redTeam),
    };
  }, [blueTeam, redTeam]);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const teamA = +winRate.teamAwinRate;
    const teamB = +winRate.teamBwinRate;
    const total = teamA + teamB;

    const width = 400;
    const height = 30;

    if (!total || isNaN(total)) {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", "20px")
        .text("승률 정보가 없습니다.");
      return;
    }

    const teamAPercent = (teamA / total) * 100;
    const teamBPercent = (teamB / total) * 100;

    const aWidth = (teamAPercent / 100) * width;
    const bWidth = width - aWidth;

    // 블루팀 막대
    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 0)
      .attr("height", height)
      .attr("fill", "#3065ac")
      .transition()
      .duration(3000)
      .ease(d3.easeCubicInOut)
      .attr("width", aWidth);

    // 레드팀 막대
    svg
      .append("rect")
      .attr("x", width)
      .attr("y", 0)
      .attr("width", 0)
      .attr("height", height)
      .attr("fill", "#f44336")
      .transition()
      .duration(3000)
      .ease(d3.easeCubicInOut)
      .attr("x", aWidth)
      .attr("width", bWidth);

    // 블루 승률 텍스트
    svg
      .append("text")
      .attr("x", width / 4)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .text("0")
      .transition()
      .duration(3000)
      .ease(d3.easeCubicInOut)
      .tween("text", function () {
        const i = d3.interpolateNumber(0, teamAPercent);
        return function (t) {
          this.textContent = `${Math.round(i(t))}%`;
        };
      })
      .attr("x", aWidth / 2);

    // 레드 승률 텍스트
    svg
      .append("text")
      .attr("x", (3 * width) / 4)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .text("0")
      .transition()
      .duration(3000)
      .ease(d3.easeCubicInOut)
      .tween("text", function () {
        const i = d3.interpolateNumber(0, teamBPercent);
        return function (t) {
          this.textContent = `${Math.round(i(t))}%`;
        };
      })
      .attr("x", aWidth + bWidth / 2);
  }, [winRate]);

  return (
    <div className="flex flex-col items-center mb-6">
      <span className="text-lg font-bold mb-2">승률</span>
      <svg ref={ref} width={400} height={30}></svg>
    </div>
  );
}
