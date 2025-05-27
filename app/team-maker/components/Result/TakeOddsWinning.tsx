import { TeamResponse } from "@/types/team";
import * as d3 from "d3";
import { useEffect, useMemo, useRef } from "react";

interface winRate {
  blueTeam: TeamResponse[];
  redTeam: TeamResponse[];
}

interface PathWithCurrent extends SVGPathElement {
  _current: d3.PieArcDatum<{ label: string; value: number }>;
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

    const teamA = winRate.teamAwinRate;
    const teamB = winRate.teamBwinRate;
    const total = teamA + teamB;

    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    if (!total || isNaN(total)) {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", "16px")
        .text("승률 정보 없음");
      return;
    }

    const data = [
      { label: "Blue", value: teamA },
      { label: "Red", value: teamB },
    ];

    const color = d3
      .scaleOrdinal()
      .domain(["Blue", "Red"])
      .range(["#5383E8", "#E84057"]);

    const pie = d3
      .pie<{ label: string; value: number }>()
      .value((d) => d.value);
    const data_ready = pie(data);

    const arc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .innerRadius(60)
      .outerRadius(radius);

    const chartGroup = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    chartGroup
      .selectAll("path")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("fill", (d) => color(d.data.label) as string)
      .attr("d", arc)
      .each(function (d) {
        (this as PathWithCurrent)._current = {
          ...d,
          startAngle: 0,
          endAngle: 0,
        };
      })
      .transition()
      .duration(1500)
      .attrTween("d", function (d) {
        const path = this as PathWithCurrent;
        const interpolate = d3.interpolate(path._current, d);
        path._current = interpolate(1);
        return function (t) {
          return arc(interpolate(t)) || "";
        };
      });

    chartGroup
      .selectAll("text.percent")
      .data(data_ready)
      .enter()
      .append("text")
      .attr("class", "percent")
      .attr("transform", function (d) {
        const [x, y] = arc.centroid(d);
        return `translate(${x}, ${y})`;
      })
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text((d) => {
        const percent = ((d.data.value / total) * 100).toFixed(0);
        return `${percent}%`;
      });

    // 중앙 텍스트: 어느 팀이 우세한지
    const leadingText =
      teamA > teamB ? "블루" : teamB > teamA ? "레드" : "동률";
    const subText = teamA === teamB ? "무승부" : "우세";

    chartGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("y", -5)
      .attr("fill", "white")
      .style("font-size", "1.2rem")
      .style("font-weight", "bold")
      .text(leadingText);

    chartGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("y", 20)
      .attr("fill", "white")
      .style("font-size", "0.9rem")
      .text(subText);
  }, [winRate]);

  return (
    <div className="flex flex-col items-center mb-6">
      <span className="text-lg font-bold mb-2">승률</span>
      <svg ref={ref}></svg>
    </div>
  );
}
