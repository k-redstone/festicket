import DefaultBottomFrameSVG from "@/assets/svg/frame/defaultBottomFrame.svg";
import { View, StyleSheet } from "react-native";
import { AppText } from "@/components/common/AppText";

import MapSVG from "@/assets/svg/MapSVG.svg";
import CalendarSVG from "@/assets/svg/CalendarSVG.svg";

import { FRAME_WIDTH, BOTTOM_FRAME_HEIGHT } from "@/constants/ticketFrame";

interface IDefaultBottomFrameProps {
  location?: string;
  startDate?: string;
  endDate?: string;
  bottomFrameColor?: string;
  QRSectionColor?: string;
  locationTxtColor?: string;
  dateTxtColor?: string;
  width?: number;
  height?: number;
}

export default function DefaultBottomFrame({
  location = "",
  startDate = "",
  endDate = "",
  bottomFrameColor = "#ffffff",
  locationTxtColor = "#000000",
  dateTxtColor = "#000000",
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
        color={bottomFrameColor}
        style={StyleSheet.absoluteFill}
      />
      <View className="items-center absolute w-full h-full px-3 gap-x-1 flex-row justify-between">
        {/* 장소 및 날짜 */}
        <View className="gap-y-1">
          <View className="flex-row gap-x-1 items-start">
            <MapSVG
              color={locationTxtColor}
              width={width * (20 / FRAME_WIDTH)}
              height={height * (20 / BOTTOM_FRAME_HEIGHT)}
              style={{ alignSelf: "flex-start" }}
            />
            <AppText
              numberOfLines={2}
              style={{
                color: locationTxtColor,
                paddingTop: height * (2 / BOTTOM_FRAME_HEIGHT),
                minHeight: height * (40 / BOTTOM_FRAME_HEIGHT),
                maxWidth: width * (85 / FRAME_WIDTH),
                textAlignVertical: "top",
                fontSize: width * (12 / FRAME_WIDTH),
              }}
            >
              {location.replace(/\(br\)/g, "\n")}
            </AppText>
          </View>
          <View className="flex-row gap-x-1 items-center">
            <CalendarSVG
              color={dateTxtColor}
              width={width * (20 / FRAME_WIDTH)}
              height={height * (20 / BOTTOM_FRAME_HEIGHT)}
              style={{ alignSelf: "flex-start" }}
            />
            <AppText
              numberOfLines={2}
              style={{
                color: dateTxtColor,
                paddingTop: height * (2 / BOTTOM_FRAME_HEIGHT),
                fontSize: width * (12 / FRAME_WIDTH),
                minHeight: height * (40 / BOTTOM_FRAME_HEIGHT),
                maxWidth: width * (100 / FRAME_WIDTH),
                textAlignVertical: "top",
              }}
            >
              {endDate ? `${startDate}\n~ ${endDate}` : `${startDate}`}
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
