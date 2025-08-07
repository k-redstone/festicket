import { useAnimatedStyle } from "react-native-reanimated";
import type { IImageTransformProps } from "@/hooks/editImage/useImageTransform";
import type { ViewStyle } from "react-native";

export function useAnimatedImageStyle(transform: IImageTransformProps) {
  return useAnimatedStyle(() => {
    const tx = isNaN(transform.translateX.value)
      ? 0
      : transform.translateX.value;
    const ty = isNaN(transform.translateY.value)
      ? 0
      : transform.translateY.value;
    const sc = isNaN(transform.scale.value) ? 1 : transform.scale.value;

    let transforms: ViewStyle["transform"] = [
      { translateX: tx },
      { translateY: ty },
      { scale: sc },
    ];

    return { transform: transforms };
  });
}
