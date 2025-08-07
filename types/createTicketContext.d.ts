export type TSelectImageURIInput = {
  originImage?: { uri: string; width: number; height: number };
  editImage?: string;
  titleColor?: string;
  frameColor?: string;
  imageSectionBorderColor?: string;
  frameColor?: string;
  QRSectionColor?: string;
  locationTxtColor?: string;
  dateTxtColor?: string;
  lineColor?: string;
};

export type TEditImageInput = {
  originImage: { uri: string; width: number; height: number };
  editImage?: string;
  titleColor?: string;
  frameColor?: string;
  imageSectionBorderColor?: string;
  frameColor?: string;
  QRSectionColor?: string;
  locationTxtColor?: string;
  dateTxtColor?: string;
  lineColor?: string;
};

export type TTicketInfoInput = {
  originImage: { uri: string; width: number; height: number };
  editImage: string;
  titleColor?: string;
  frameColor?: string;
  imageSectionBorderColor?: string;
  frameColor?: string;
  QRSectionColor?: string;
  locationTxtColor?: string;
  dateTxtColor?: string;
  lineColor?: string;
};

export type TCreateTicketFunnelSteps = {
  SelectImage: TSelectImageURIInput;
  EditImage: TEditImageInput;
  TicketInfo: TTicketInfoInput;
};
