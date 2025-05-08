import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface RecentWinRateGraphProps {
  win: number;
  lose: number;
  winRate: number;
}

interface LabelValue {
  label: string;
  value: number;
}

export default function RecentWinRateGraph({
  win,
  lose,
  winRate,
}: RecentWinRateGraphProps) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    const width = 150;
    const height = 150;
    const radius = Math.min(width, height) / 2;

    const data = [
      { label: "Win", value: win },
      { label: "Lose", value: lose },
    ];

    const color = d3
      .scaleOrdinal()
      .domain(["Win", "Lose"])
      .range(["#5383E8", "#E84057"]);

    const pie = d3.pie<LabelValue>().value((d) => d.value);
    const data_ready = pie(data);

    const arc = d3
      .arc<d3.PieArcDatum<LabelValue>>()
      .innerRadius(30)
      .outerRadius(radius);

    svg.selectAll("*").remove();

    const chartGroup = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    chartGroup
      .selectAll<SVGPathElement, d3.PieArcDatum<LabelValue>>("path")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.label) as string)
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .transition()
      .duration(2000)
      .ease(d3.easeCubicInOut)
      .attrTween(
        "d",
        function (this: SVGPathElement, d: d3.PieArcDatum<LabelValue>) {
          const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
          return function (t) {
            return arc(interpolate(t)) || "";
          };
        }
      );

    const text = chartGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("font-size", "1.25rem")
      .style("fill", "#fff");

    let currentRate = { rate: 0 };

    d3.transition()
      .duration(2000)
      .tween("text", () => {
        const interpolate = d3.interpolate(0, winRate);
        return function (t) {
          currentRate.rate = Math.round(interpolate(t));
          text.text(`${currentRate.rate}%`);
        };
      });
  }, [win, lose, winRate]);

  return <svg ref={ref}></svg>;
}
