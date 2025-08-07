// clamp
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

// 이미지 프레임 fit
export function getFitSizeWithRotation(
  originWidth: number,
  originHeight: number,
  frameWidth: number,
  frameHeight: number
) {
  // 각각 fit했을 때 scale
  const scaleW = frameWidth / originWidth;
  const scaleH = frameHeight / originHeight;
  // cover: 더 큰 쪽(=프레임에 빈공간 없는 쪽)을 선택
  const scale = Math.max(scaleW, scaleH);
  return {
    width: Math.round(originWidth * scale),
    height: Math.round(originHeight * scale),
  };
}

// pan bound
export function getPanBound(
  axis: "x" | "y",
  imgSize: { width: number; height: number },
  frameSize: { width: number; height: number },
  scale: number
) {
  if (!imgSize || !frameSize) return 0;
  const bound =
    (axis === "x"
      ? imgSize.width * scale - frameSize.width
      : imgSize.height * scale - frameSize.height) / 2;
  return bound > 0 ? bound : 0;
}

// damping
export function applyDamping(offset: number, bound: number, factor = 0.4) {
  if (Math.abs(offset) <= bound) return offset;
  const exceeded = Math.abs(offset) - bound;
  return bound * Math.sign(offset) + exceeded * factor * Math.sign(offset);
}
