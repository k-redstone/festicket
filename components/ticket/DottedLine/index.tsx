import Svg, { Line } from "react-native-svg";
import { FRAME_WIDTH, DOTTED_LINE_WIDTH } from "@/constants/ticketFrame";

interface IDottedLineProps {
  lineColor?: string;
  width?: number;
  height?: number;
}

export default function DottedLine({
  width = DOTTED_LINE_WIDTH,
  height = 8,
  lineColor = "#fca5a5",
}: IDottedLineProps) {
  const dashLength = width * (8 / DOTTED_LINE_WIDTH);
  const gapLength = width * (6 / DOTTED_LINE_WIDTH);
  const strokeWidth = height * (4 / 8);
  return (
    <Svg
      height={height}
      width={width * (DOTTED_LINE_WIDTH / FRAME_WIDTH)}
      style={{ marginVertical: -5 }}
    >
      <Line
        x1="0"
        y1={height / 2}
        x2={width}
        y2={height / 2}
        stroke={lineColor}
        strokeWidth={strokeWidth}
        strokeDasharray={`${dashLength} ${gapLength}`}
      />
    </Svg>
  );
}
