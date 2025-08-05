import Svg, { Line } from "react-native-svg";

interface IDottedLineProps {
  lineColor?: string;
  width?: number;
  height?: number;
}

export default function DottedLine({
  width = 205,
  height = 8,
  lineColor = "#fca5a5",
}: IDottedLineProps) {
  const dashLength = width * (8 / 205);
  const gapLength = width * (6 / 205);
  const strokeWidth = height * (4 / 8);
  return (
    <Svg
      height={height}
      width={width * (205 / 232)}
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
