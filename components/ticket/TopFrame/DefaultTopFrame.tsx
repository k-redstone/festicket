import DefaultTopFrameSVG from "@/assets/svg/frame/defaultTopFrame.svg";
import { View, StyleSheet } from "react-native";
import { AppText } from "@/components/common/AppText";
import { Image } from "expo-image";
import { FRAME_WIDTH, TOP_FRAME_HEIGHT } from "@/constants/ticketFrame";

interface IDefaultTopFrameProps {
  title?: string;
  width?: number;
  height?: number;
  titleColor?: string;
  imageSectionBorderColor?: string;
  frameColor?: string;
  imageUri?: string | null;
}

export default function DefaultTopFrame({
  title = "",
  titleColor = "#000000",
  imageSectionBorderColor = "#000000",
  frameColor = "#ffffff",
  width = FRAME_WIDTH,
  height = TOP_FRAME_HEIGHT,
  imageUri = null,
}: IDefaultTopFrameProps) {
  const IMAGE_SECTION_WIDTH = width * (156 / FRAME_WIDTH);
  const IMAGE_SECTION_HEIGHT = height * ((156 * 5) / 4 / TOP_FRAME_HEIGHT);

  return (
    <View
      className="items-center justify-center"
      style={{
        width,
        height,
      }}
    >
      <DefaultTopFrameSVG
        width={width}
        height={height}
        color={frameColor}
        style={StyleSheet.absoluteFill}
      />

      {/* 상단 프레임 content */}
      <View
        className="items-center justify-center absolute w-full h-full flex"
        style={{
          paddingHorizontal: width * (12 / FRAME_WIDTH),
          gap: height * (28 / TOP_FRAME_HEIGHT),
        }}
      >
        {/* 이미지 섹션 */}
        <View
          className="border-dashed border rounded-xl overflow-hidden"
          style={{
            borderColor: imageSectionBorderColor,
            width: IMAGE_SECTION_WIDTH,
            height: IMAGE_SECTION_HEIGHT,
          }}
        >
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={{
                width: "100%",
                height: "100%",
              }}
              contentFit="cover"
            />
          )}
        </View>
        {/* 타이틀 섹션 */}
        <View>
          <AppText
            className="text-center font-kbiz-heavy"
            numberOfLines={2}
            style={{
              color: titleColor,
              fontSize: width * (16 / FRAME_WIDTH),
            }}
          >
            {title.replace(/\(br\)/g, "\n")}
          </AppText>
        </View>
      </View>
    </View>
  );
}
