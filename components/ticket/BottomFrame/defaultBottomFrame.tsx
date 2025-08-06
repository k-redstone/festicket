import DefaultBottomFrameSVG from "@/assets/svg/frame/defaultBottomFrame.svg";
import { View, StyleSheet } from "react-native";
import { AppText } from "@/components/common/AppText";

import MapSVG from "@/assets/svg/MapSVG.svg";
import CalendarSVG from "@/assets/svg/CalendarSVG.svg";

import { FRAME_WIDTH, BOTTOM_FRAME_HEIGHT } from "@/constants/ticketFrame";

interface IDefaultBottomFrameProps {
  location: string;
  date: string;
  frameColor?: string;
  QRSectionColor?: string;
  width?: number;
  height?: number;
}

export default function DefaultBottomFrame({
  location,
  date,
  frameColor = "#ffffff",
  QRSectionColor = "#9CA3AF",
  width = FRAME_WIDTH,
  height = BOTTOM_FRAME_HEIGHT,
}: IDefaultBottomFrameProps) {
  const QR_SECTION_WIDTH = width * (80 / FRAME_WIDTH);
  const QR_SECTION_HEIGHT = height * (80 / BOTTOM_FRAME_HEIGHT);

  return (
    <View className="items-center justify-center" style={{ width, height }}>
      <DefaultBottomFrameSVG
        width={width}
        height={height}
        color={frameColor}
        style={StyleSheet.absoluteFill}
      />
      <View className="items-center absolute w-full h-full px-3 gap-x-1 flex-row justify-between">
        {/* 장소 및 날짜 */}
        <View className="gap-y-1">
          <View className="flex-row gap-x-1 items-start">
            <MapSVG
              width={width * (20 / FRAME_WIDTH)}
              height={height * (20 / BOTTOM_FRAME_HEIGHT)}
              style={{ alignSelf: "flex-start" }}
            />
            <AppText
              numberOfLines={2}
              style={{
                paddingTop: height * (2 / BOTTOM_FRAME_HEIGHT),
                minHeight: height * (40 / BOTTOM_FRAME_HEIGHT),
                maxWidth: width * (100 / FRAME_WIDTH),
                textAlignVertical: "top",
                fontSize: width * (12 / FRAME_WIDTH),
              }}
            >
              {location.replace(/\\n/g, "\n")}
            </AppText>
          </View>
          <View className="flex-row gap-x-1 items-center">
            <CalendarSVG
              width={width * (20 / FRAME_WIDTH)}
              height={height * (20 / BOTTOM_FRAME_HEIGHT)}
              style={{ alignSelf: "flex-start" }}
            />
            <AppText
              numberOfLines={2}
              style={{
                paddingTop: height * (2 / BOTTOM_FRAME_HEIGHT),
                fontSize: width * (12 / FRAME_WIDTH),
                minHeight: height * (40 / BOTTOM_FRAME_HEIGHT),
                maxWidth: width * (100 / FRAME_WIDTH),
                textAlignVertical: "top",
              }}
            >
              {date.replace(/\\n/g, "\n")}
            </AppText>
          </View>
        </View>

        {/* QR Section */}
        <View
          className="rounded-lg"
          style={{
            backgroundColor: QRSectionColor,
            width: QR_SECTION_WIDTH,
            height: QR_SECTION_HEIGHT,
          }}
        ></View>
      </View>
    </View>
  );
}
