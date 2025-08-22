export type HexColor = `#${string}`;

export interface IImageRef {
  uri: string;
  width: number;
  height: number;
}

export interface ITicketPalette {
  titleColor?: HexColor;
  bottomFrameColor?: HexColor;
  topFrameColor?: HexColor;
  imageSectionBorderColor?: HexColor;
  QRSectionColor?: HexColor;
  locationTxtColor?: HexColor;
  dateTxtColor?: HexColor;
  lineColor?: HexColor;
}

export interface ITicketContent {
  title?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
}

export interface ITicketMediaState {
  originImage?: IImageRef; // 원본
  editImage?: string; // 편집 결과
  imageUri?: string | null;
}

export interface ITicketBaseState
  extends ITicketMediaState,
    ITicketPalette,
    ITicketContent {}

export type MakeRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

/** ---------- 퍼널 단계 상태 ---------- */
/** SelectImage 단계: 전부 선택 전이므로 전부 옵션 */
export type TSelectImageURIInput = ITicketBaseState;

/** EditImage 단계: originImage는 반드시 존재 */
export type TEditImageInput = MakeRequired<ITicketBaseState, "originImage">;

/** TicketInfo 단계: originImage와 editImage 모두 필수 */
export type TTicketInfoInput = MakeRequired<
  ITicketBaseState,
  "originImage" | "editImage"
>;

export type TCreateTicketFunnelSteps = {
  SelectImage: TSelectImageURIInput;
  EditImage: TEditImageInput;
  TicketInfo: TTicketInfoInput;
};

export interface ITicketFrameTopData
  extends Pick<
    ITicketBaseState,
    | "title"
    | "titleColor"
    | "imageSectionBorderColor"
    | "topFrameColor"
    | "imageUri"
  > {}

export interface ITicketLineData extends Pick<ITicketBaseState, "lineColor"> {}

export interface ITicketFrameBottomData
  extends Pick<
    ITicketBaseState,
    | "location"
    | "startDate"
    | "endDate"
    | "bottomFrameColor"
    | "QRSectionColor"
    | "locationTxtColor"
    | "dateTxtColor"
  > {}

export interface ITicketData {
  // 상단
  top?: ITicketFrameTopData;

  // 절취선
  line?: ITicketLineData;

  // 하단
  bottom?: ITicketFrameBottomData;
}
