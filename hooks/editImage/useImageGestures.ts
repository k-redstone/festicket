import { Gesture } from "react-native-gesture-handler";
import { SharedValue, withTiming } from "react-native-reanimated";
import { clamp, getPanBound, applyDamping } from "@/utils/imageHelpers";
import type { IImageTransformProps } from "@/hooks/editImage/useImageTransform";

interface IUseImageGesturesProps {
  size: { width: number; height: number };
  IMAGE_FRAME_WIDTH: number;
  IMAGE_FRAME_HEIGHT: number;
  transform: IImageTransformProps;
}
export function useImageGestures({
  size,
  IMAGE_FRAME_WIDTH,
  IMAGE_FRAME_HEIGHT,
  transform,
}: IUseImageGesturesProps) {
  const {
    scale,
    savedScale,
    translateX,
    savedTranslateX,
    translateY,
    savedTranslateY,
  } = transform;

  const pan = Gesture.Pan()
    .onBegin(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate((e) => {
      const s = scale.value;
      const boundX = getPanBound(
        "x",
        size,
        { width: IMAGE_FRAME_WIDTH, height: IMAGE_FRAME_HEIGHT },
        s
      );
      const boundY = getPanBound(
        "y",
        size,
        { width: IMAGE_FRAME_WIDTH, height: IMAGE_FRAME_HEIGHT },
        s
      );
      let nextX = savedTranslateX.value + e.translationX;
      let nextY = savedTranslateY.value + e.translationY;
      translateX.value = applyDamping(nextX, boundX, 0.3);
      translateY.value = applyDamping(nextY, boundY, 0.3);
    })
    .onEnd(() => {
      const s = scale.value;
      const boundX = getPanBound(
        "x",
        size,
        { width: IMAGE_FRAME_WIDTH, height: IMAGE_FRAME_HEIGHT },
        s
      );
      const boundY = getPanBound(
        "y",
        size,
        { width: IMAGE_FRAME_WIDTH, height: IMAGE_FRAME_HEIGHT },
        s
      );
      translateX.value = withTiming(clamp(translateX.value, -boundX, boundX), {
        duration: 180,
      });
      translateY.value = withTiming(clamp(translateY.value, -boundY, boundY), {
        duration: 180,
      });
    })
    .runOnJS(true);

  const pinch = Gesture.Pinch()
    .onBegin(() => {
      savedScale.value = scale.value;
    })
    .onUpdate((e) => {
      scale.value = Math.max(1, Math.min(savedScale.value * e.scale, 4));
    });

  return Gesture.Simultaneous(pan, pinch);
}
