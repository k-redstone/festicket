import DefaultTopFrameSVG from "@/assets/svg/frame/defaultTopFrame.svg";
import { View, StyleSheet } from "react-native";
import { AppText } from "@/components/common/AppText";

interface IDefaultTopFrameProps {
  title: string;
  width?: number;
  height?: number;
  titleColor?: string;
  imageSectionBorderColor?: string;
  frameColor?: string;
}

export default function DefaultTopFrame({
  title,
  titleColor = "#000000",
  imageSectionBorderColor = "#000000",
  frameColor = "#ffffff",
  width = 232,
  height = 338,
}: IDefaultTopFrameProps) {
  const IMAGE_SECTION_WIDTH = width * (156 / 232);
  const IMAGE_SECTION_HEIGHT = height * (212 / 338);

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
          paddingHorizontal: width * (12 / 232),
          gap: height * (28 / 338),
        }}
      >
        {/* 이미지 섹션 */}
        <View
          className="border-dashed border rounded-xl"
          style={{
            borderColor: imageSectionBorderColor,
            width: IMAGE_SECTION_WIDTH,
            height: IMAGE_SECTION_HEIGHT,
          }}
        ></View>
        {/* 타이틀 섹션 */}
        <View>
          <AppText
            className="text-center font-kbiz-heavy"
            numberOfLines={2}
            style={{
              color: titleColor,
              fontSize: width * (16 / 232),
            }}
          >
            {title}
          </AppText>
        </View>
      </View>
    </View>
  );
}
