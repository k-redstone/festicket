import { View } from "react-native";
import DefaultTopFrame from "@/components/ticket/TopFrame/DefaultTopFrame";
import DefaultBottomFrame from "@/components/ticket/BottomFrame/defaultBottomFrame";
import DottedLine from "@/components/ticket/DottedLine";

import {
  FRAME_WIDTH,
  FRAME_HEIGHT,
  TOP_FRAME_HEIGHT,
  BOTTOM_FRAME_HEIGHT,
} from "@/constants/ticketFrame";

interface IDefaultTicketProps {
  width?: number;
  height?: number;
}

export default function DefaultTicket({
  width = FRAME_WIDTH,
  height = FRAME_HEIGHT,
}: IDefaultTicketProps) {
  const TOP_HEIGHT = height * (TOP_FRAME_HEIGHT / FRAME_HEIGHT);
  const BOTTOM_HEIGHT = height * (BOTTOM_FRAME_HEIGHT / FRAME_HEIGHT);

  return (
    <View className="px-4 py-6 bg-black">
      <View className="items-center relative">
        {/* 상단 프레임 */}
        <DefaultTopFrame
          title="인천 펜타포트 락 페스티벌 2025"
          width={width}
          height={TOP_HEIGHT}
        />

        {/* 절취선 */}
        <DottedLine width={width} />

        {/* 하단 프레임 */}
        <DefaultBottomFrame
          location="서울 올림픽 공원\n앞마당"
          date="2025.08.01\n~ 2025.08.02"
          width={width}
          height={BOTTOM_HEIGHT}
        />
      </View>
    </View>
  );
}
