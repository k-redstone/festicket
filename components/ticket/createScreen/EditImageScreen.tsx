import { View, Image as RNImage, Dimensions } from "react-native";

import { AppText } from "@/components/common/AppText";
import Animated from "react-native-reanimated";

import {
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import * as ImageManipulator from "expo-image-manipulator";
import Svg, { Rect, Line } from "react-native-svg";
import type { TEditImageInput } from "@/types/createTicketContext";
import PrimaryButton from "@/components/common/PrimaryButton";
import { getFitSizeWithRotation } from "@/utils/imageHelpers";

import { useCallback, useEffect, useState } from "react";
import { useImageTransform } from "@/hooks/editImage/useImageTransform";
import { useImageGestures } from "@/hooks/editImage/useImageGestures";
import { useAnimatedImageStyle } from "@/hooks/editImage/useAnimatedImageStyle";

const SCREEN_WIDTH = Dimensions.get("window").width;
const IMAGE_FRAME_WIDTH = SCREEN_WIDTH;
const IMAGE_FRAME_HEIGHT = (SCREEN_WIDTH * 5) / 4;

interface IEditImageScreenProps {
  onNext: (value: string) => void;
  onBack: () => void;
  context: TEditImageInput;
}

export default function EditImageScreen({
  context,
  onNext,
  onBack,
}: IEditImageScreenProps) {
  // 원본/표시용 이미지 사이즈
  const [displaySize, setDisplaySize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [originSize, setOriginSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // 상태값
  const [imageUri, setImageUri] = useState(context.originImage.uri);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(false);

  // 제스처/애니메이션 관련
  const transform = useImageTransform();
  const animatedImageStyle = useAnimatedImageStyle(transform);
  const composed = useImageGestures({
    size: displaySize!,
    IMAGE_FRAME_WIDTH,
    IMAGE_FRAME_HEIGHT,
    transform,
  });

  useEffect(() => {
    if (imageUri) {
      RNImage.getSize(imageUri, (width, height) => {
        setOriginSize({ width, height });
        setDisplaySize(
          getFitSizeWithRotation(
            width,
            height,
            IMAGE_FRAME_WIDTH,
            IMAGE_FRAME_HEIGHT
          )
        );
      });
    }
  }, [imageUri]);

  const handleRotate = async () => {
    if (!imageUri) return;
    setLoading(true);
    try {
      const result = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ rotate: 90 }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );

      setImageUri(result.uri);
      setRotation((prev) => (prev + 90) % 360);
      transform.translateX.value = 0;
      transform.translateY.value = 0;
    } catch (e) {
      alert("이미지 회전에 실패했습니다. 다시 시도해주세요.");
    }
    setLoading(false);
  };

  const handleCropAndNext = useCallback(async () => {
    if (!imageUri || !originSize || !displaySize) return;

    const scale = transform.scale.value ?? 1;

    // 회전 상태에 따라 실제 크기 계산
    const rotatedWidth =
      rotation % 180 !== 0
        ? context.originImage.height
        : context.originImage.width;
    const rotatedHeight =
      rotation % 180 !== 0
        ? context.originImage.width
        : context.originImage.height;

    // 확대/축소된 이미지 크기
    const scaledWidth = displaySize.width * scale;
    const scaledHeight = displaySize.height * scale;

    // 이미지 실제 표시 위치
    const imgLeft =
      (IMAGE_FRAME_WIDTH - scaledWidth) / 2 + (transform.translateX.value ?? 0);
    const imgTop =
      (IMAGE_FRAME_HEIGHT - scaledHeight) / 2 +
      (transform.translateY.value ?? 0);

    // 크롭 좌표 계산 (scale 고려)
    const cropX = Math.max((-imgLeft / scaledWidth) * rotatedWidth, 0);
    const cropY = Math.max((-imgTop / scaledHeight) * rotatedHeight, 0);
    const cropW = Math.min(
      (IMAGE_FRAME_WIDTH / scaledWidth) * rotatedWidth,
      rotatedWidth - cropX
    );
    const cropH = Math.min(
      (IMAGE_FRAME_HEIGHT / scaledHeight) * rotatedHeight,
      rotatedHeight - cropY
    );

    try {
      setLoading(true);
      const cropped = await ImageManipulator.manipulateAsync(
        imageUri,
        [
          {
            crop: {
              originX: cropX,
              originY: cropY,
              width: Math.max(cropW, 1),
              height: Math.max(cropH, 1),
            },
          },
        ],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
      onNext(cropped.uri);
    } catch (e) {
      alert("이미지 자르기에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  }, [imageUri, originSize, displaySize, rotation, context, transform, onNext]);

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="px-5 py-4 flex-row items-center ">
        <PrimaryButton onPress={onBack}>
          <AppText className="text-xl text-white">뒤로</AppText>
        </PrimaryButton>
      </View>
      <View className=" py-4 gap-y-10 flex-1">
        {/* 사진 섹션 */}
        <View
          className={`rounded-md bg-black`}
          style={{
            overflow: "hidden",
            width: IMAGE_FRAME_WIDTH,
            height: IMAGE_FRAME_HEIGHT,
            marginBottom: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {context.originImage ? (
            <GestureDetector gesture={composed}>
              <Animated.Image
                source={{ uri: imageUri }}
                style={[
                  { width: displaySize?.width, height: displaySize?.height },
                  animatedImageStyle,
                ]}
              />
            </GestureDetector>
          ) : (
            <View style={{ width: "100%", height: "100%" }} />
          )}
        </View>

        {/* 도구 섹션 */}
        <View className="bg-red-400 px-5 flex-row gap-x-3 items-center">
          <PrimaryButton
            onPress={handleRotate}
            classname="p-2 rounded-full bg-white/20"
          >
            <AppText className="text-white font-bold text-base">↻ 90°</AppText>
          </PrimaryButton>
        </View>

        {/* 다음 섹션 */}
        <View className="items-end  px-5">
          <PrimaryButton
            classname="rounded-3xl bg-[#c084fc26] px-5 py-2 "
            onPress={handleCropAndNext}
            disabled={loading}
          >
            <AppText className="text-purple-300">다음</AppText>
          </PrimaryButton>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
