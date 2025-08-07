export type TSelectImageURIInput = {
  originImageUri?: string;
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
  originImageUri: string;
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
  originImageUri: string;
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
