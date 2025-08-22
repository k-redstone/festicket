import type { ITicketPalette } from "@/types/createTicketContext";

export const FRAME_WIDTH = 232;
export const FRAME_HEIGHT = 508;
export const TOP_FRAME_HEIGHT = 338;
export const BOTTOM_FRAME_HEIGHT = 170;
export const DOTTED_LINE_WIDTH = 205;

export const TICKET_FRAME_COLOR_PRESET = {
  default: {
    topFrameColor: "#FFFFFF",
    titleColor: "#000000",
    bottomFrameColor: "#FFFFFF",
    locationTxtColor: "#000000",
    dateTxtColor: "#000000",
    QRSectionColor: "#9CA3AF",
    lineColor: "#FCA5A5",
  },
  festival: {
    topFrameColor: "#FF6B6B", // 강렬한 코랄 레드
    titleColor: "#FFFFFF", // 화이트
    bottomFrameColor: "#FFE66D", // 밝은 옐로우
    locationTxtColor: "#2D3436", // 다크 그레이
    dateTxtColor: "#2D3436", // 다크 그레이
    QRSectionColor: "#FFA41B", // 오렌지 톤
    lineColor: "#FF9F1C", // 오렌지 옐로우
  },

  neon: {
    topFrameColor: "#0F3460", // 딥 블루
    titleColor: "#F5F5F5", // 연한 화이트
    bottomFrameColor: "#1A1A2E", // 짙은 네이비
    locationTxtColor: "#E94560", // 네온 핑크
    dateTxtColor: "#FFD369", // 네온 옐로우
    QRSectionColor: "#16213E", // 네이비 블루
    lineColor: "#E94560", // 네온 핑크
  },

  mint_modern: {
    topFrameColor: "#06D6A0", // 민트 그린
    titleColor: "#FFFFFF", // 화이트
    bottomFrameColor: "#1B9AAA", // 청록
    locationTxtColor: "#FFFFFF", // 화이트
    dateTxtColor: "#F0F3BD", // 파스텔 옐로우
    QRSectionColor: "#118AB2", // 블루톤
    lineColor: "#FFD166", // 파스텔 옐로우
  },

  sunset_glow: {
    topFrameColor: "#FF7E5F", // 선셋 오렌지
    titleColor: "#FFFFFF", // 화이트
    bottomFrameColor: "#FEB47B", // 코랄 옐로우
    locationTxtColor: "#4B3832", // 브라운
    dateTxtColor: "#4B3832", // 브라운
    QRSectionColor: "#FF6F61", // 코랄 레드
    lineColor: "#FFD166", // 파스텔 옐로우
  },

  purple_dream: {
    topFrameColor: "#6A0572", // 진한 퍼플
    titleColor: "#E0E0E0", // 연한 그레이
    bottomFrameColor: "#AB83A1", // 라일락
    locationTxtColor: "#FFFFFF", // 화이트
    dateTxtColor: "#FFE6E6", // 연핑크
    QRSectionColor: "#78244C", // 와인 퍼플
    lineColor: "#FF9F1C", // 오렌지 옐로우
  },
  modern_navy_mint: {
    topFrameColor: "#0B3C5D", // 딥 네이비
    titleColor: "#FFFFFF", // 화이트
    bottomFrameColor: "#1D2731", // 다크 네이비
    locationTxtColor: "#A2DED0", // 민트
    dateTxtColor: "#A2DED0", // 민트
    QRSectionColor: "#328CC1", // 블루
    lineColor: "#328CC1", // 블루
  },

  sand_brown: {
    topFrameColor: "#C2B280", // 샌드
    titleColor: "#3E2723", // 다크 브라운
    bottomFrameColor: "#8D6E63", // 브라운
    locationTxtColor: "#FFF3E0", // 아이보리
    dateTxtColor: "#FFF3E0", // 아이보리
    QRSectionColor: "#6D4C41", // 초콜릿 브라운
    lineColor: "#D7CCC8", // 라이트 브라운
  },

  pastel_mint_coral: {
    topFrameColor: "#A8E6CF", // 파스텔 민트
    titleColor: "#2E2E2E", // 다크 그레이
    bottomFrameColor: "#DCEDC1", // 라이트 민트
    locationTxtColor: "#FF8B94", // 코랄 핑크
    dateTxtColor: "#FF8B94", // 코랄 핑크
    QRSectionColor: "#FFD3B6", // 라이트 오렌지
    lineColor: "#FFAAA5", // 소프트 핑크
  },

  classic_black_gold: {
    topFrameColor: "#000000", // 블랙
    titleColor: "#FFD700", // 골드
    bottomFrameColor: "#1C1C1C", // 다크 블랙
    locationTxtColor: "#FFD700", // 골드
    dateTxtColor: "#FFD700", // 골드
    QRSectionColor: "#B8860B", // 다크 골드
    lineColor: "#FFD700", // 골드
  },

  lilac_skyblue: {
    topFrameColor: "#CBAACB", // 라일락
    titleColor: "#2E2E2E", // 다크 그레이
    bottomFrameColor: "#FFCCE5", // 라이트 핑크
    locationTxtColor: "#A3C4F3", // 스카이 블루
    dateTxtColor: "#A3C4F3", // 스카이 블루
    QRSectionColor: "#B5EAD7", // 민트 톤
    lineColor: "#A3C4F3", // 스카이 블루
  },
} as const satisfies Record<string, ITicketPalette>;
