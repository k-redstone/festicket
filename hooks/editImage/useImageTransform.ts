import { useSharedValue, SharedValue } from "react-native-reanimated";

export interface IImageTransformProps {
  scale: SharedValue<number>;
  savedScale: SharedValue<number>;
  translateX: SharedValue<number>;
  savedTranslateX: SharedValue<number>;
  translateY: SharedValue<number>;
  savedTranslateY: SharedValue<number>;
}

export function useImageTransform(): IImageTransformProps {
  const scale = useSharedValue<number>(1);
  const savedScale = useSharedValue<number>(1);
  const translateX = useSharedValue<number>(0);
  const savedTranslateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);
  const savedTranslateY = useSharedValue<number>(0);

  return {
    scale,
    savedScale,
    translateX,
    savedTranslateX,
    translateY,
    savedTranslateY,
  };
}
