import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function DamageGraph({ dealt, taken, maxDealt, maxTaken }) {
  const ref = useRef();

  console.log("dealt", dealt);
  console.log("taken", taken);
  console.log("maxDealt", maxDealt);
  console.log("maxTaken", maxTaken);

  useEffect(() => {
    const svg = d3.select(ref.current);
    const width = 70;
    const height = 20;
    const padding = 5;
    const spacing = 20;
    const barHeight = 10;

    const totalMaxDealt = maxDealt;
    const totalMaxTaken = maxTaken;

    const dealtRatio = dealt / totalMaxDealt;
    const takenRatio = taken / totalMaxTaken;

    svg.selectAll("*").remove();

    // dealt 숫자
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 12)
      .attr("text-anchor", "middle")
      .attr("fill", "#000")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .text(dealt.toLocaleString());

    // taken 숫자
    svg
      .append("text")
      .attr("x", width + spacing + width / 2)
      .attr("y", 12)
      .attr("text-anchor", "middle")
      .attr("fill", "#000")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .text(taken.toLocaleString());

    // delat 배경
    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", height)
      .attr("width", width)
      .attr("height", barHeight)
      .attr("fill", "#2b2b35");

    // dealt 그래프
    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", height)
      .attr("width", width * dealtRatio)
      .attr("height", barHeight)
      .attr("fill", "#E6475C");

    // taken 배경
    svg
      .append("rect")
      .attr("x", width + spacing)
      .attr("y", height)
      .attr("width", width)
      .attr("height", barHeight)
      .attr("fill", "#2b2b35");

    // taken 그래프
    svg
      .append("rect")
      .attr("x", width + spacing)
      .attr("y", height)
      .attr("width", width * takenRatio)
      .attr("height", barHeight)
      .attr("fill", "#73718D");
  }, [dealt, taken, maxDealt, maxTaken]);

  return <svg ref={ref} width={180} height={35}></svg>;
}
