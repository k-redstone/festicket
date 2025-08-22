import { View } from "react-native";
import DefaultTopFrame from "@/components/ticket/TopFrame/DefaultTopFrame";
import DefaultBottomFrame from "@/components/ticket/BottomFrame/defaultBottomFrame";
import DottedLine from "@/components/ticket/DottedLine";
import type { ITicketData } from "@/types/createTicketContext";

import {
  FRAME_WIDTH,
  FRAME_HEIGHT,
  TOP_FRAME_HEIGHT,
  BOTTOM_FRAME_HEIGHT,
} from "@/constants/ticketFrame";

interface IDefaultTicketProps {
  width?: number;
  height?: number;
  ticket: ITicketData;
}

export default function DefaultTicket({
  width = FRAME_WIDTH,
  height = FRAME_HEIGHT,
  ticket,
}: IDefaultTicketProps) {
  const TOP_HEIGHT = height * (TOP_FRAME_HEIGHT / FRAME_HEIGHT);
  const BOTTOM_HEIGHT = height * (BOTTOM_FRAME_HEIGHT / FRAME_HEIGHT);

  return (
    <View className="p-5  rounded-md">
      <View className="items-center relative">
        {/* 상단 프레임 */}
        <DefaultTopFrame {...ticket.top} width={width} height={TOP_HEIGHT} />

        {/* 절취선 */}
        <DottedLine {...ticket.line} width={width} />

        {/* 하단 프레임 */}
        <DefaultBottomFrame
          {...ticket.bottom}
          width={width}
          height={BOTTOM_HEIGHT}
        />
      </View>
    </View>
  );
}
