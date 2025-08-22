import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { AppText } from "@/components/common/AppText";
import type { TTicketInfoInput } from "@/types/createTicketContext";

import PrimaryButton from "@/components/common/PrimaryButton";
import DefaultTicket from "@/components/ticket/DefaultTicket";
import { useState } from "react";
import FieldInputModal from "@/components/ticket/modal/FieldInputModal/FieldInputModal";

import SingleDatePicker from "@/components/ticket/modal/FieldInputModal/DateSection/SingleDatePicker";
import ColorPickerField from "@/components/ticket/ColorPicker/ColorPickerField";

import { TICKET_FRAME_COLOR_PRESET } from "@/constants/ticketFrame";

interface ITicketInfoScreenProps {
  onBack: () => void;
  context: TTicketInfoInput;
}

export default function TicketInfoScreen({
  onBack,
  context,
}: ITicketInfoScreenProps) {
  const [input, setInput] = useState(context);

  const [selectedPreset, setSelectedPreset] =
    useState<keyof typeof TICKET_FRAME_COLOR_PRESET>("default");

  const [modal, setModal] = useState<null | "title" | "location">(null);

  const preset = TICKET_FRAME_COLOR_PRESET[selectedPreset];

  return (
    <View className="flex-1">
      <View className="px-5 py-4 flex-row items-center">
        <PrimaryButton onPress={onBack}>
          <AppText className="text-xl text-white">뒤로</AppText>
        </PrimaryButton>
      </View>
      <View className="flex-1">
        <View className=" items-center justify-center mb-4">
          <DefaultTicket
            ticket={{
              top: {
                imageUri: context.editImage,
                title: input.title,
                topFrameColor: input.topFrameColor || preset.topFrameColor,
                titleColor: input.titleColor || preset.titleColor,
              },
              bottom: {
                location: input.location,
                startDate: input.startDate,
                endDate: input.endDate,
                bottomFrameColor:
                  input.bottomFrameColor || preset.bottomFrameColor,
                locationTxtColor:
                  input.locationTxtColor || preset.locationTxtColor,
                dateTxtColor: input.dateTxtColor || preset.dateTxtColor,
                QRSectionColor: input.QRSectionColor || preset.QRSectionColor,
              },
              line: {
                lineColor: input.lineColor,
              },
            }}
            width={146}
            height={313}
          />
        </View>
        <ScrollView
          className="flex-1 px-5"
          contentContainerStyle={{
            paddingVertical: 10,
          }}
        >
          <AppText className="font-kbiz-bold text-xl text-white">
            티켓 기본 정보
          </AppText>
          <AppText className=" text-sm text-gray-400">
            Tip. (br)을 넣으면 줄바꿈을 지원합니다.
          </AppText>
          <View className="h-0.5 my-1 bg-gray-600" />

          <PrimaryButton classname="my-2" onPress={() => setModal("title")}>
            <AppText
              className={`bg-gray-800 rounded-lg p-3 text-sm ${
                input.title ? "text-white" : "text-gray-400"
              }`}
            >
              {input.title || "페스티벌..."}
            </AppText>
          </PrimaryButton>
          <PrimaryButton classname="my-2" onPress={() => setModal("location")}>
            <AppText
              className={`bg-gray-800 rounded-lg p-3 text-sm ${
                input.location ? "text-white" : "text-gray-400"
              }`}
            >
              {input.location || "장소..."}
            </AppText>
          </PrimaryButton>

          <View className="flex-row items-center my-2">
            <AppText className="text-white px-3  text-sm">첫날</AppText>
            <SingleDatePicker
              date={input.startDate ? new Date(input.startDate) : new Date()}
              onChange={(v) => {
                setInput((prev) => ({ ...prev, startDate: v }));
              }}
            />
          </View>
          <View className="flex-row items-center my-2">
            <AppText className="text-white px-3  text-sm">마지막 날</AppText>
            <SingleDatePicker
              date={input.endDate ? new Date(input.endDate) : undefined}
              onChange={(v) => {
                setInput((prev) => ({ ...prev, endDate: v }));
              }}
              clearable={true}
            />
          </View>

          {/* 색상 설정 탭 */}
          <AppText className="font-kbiz-bold text-xl text-white mt-3">
            색상 설정
          </AppText>
          <View className="h-0.5 my-1 bg-gray-600" />

          <View className="mt-4 bg-gray-800 p-3 rounded-lg">
            <AppText className=" text-white">프레임 색상</AppText>
            <View className="h-0.5 my-2 bg-gray-600" />

            <View className="flex-row justify-between flex-wrap gap-y-3">
              <View className="items-center" style={{ width: "48%" }}>
                <ColorPickerField
                  label="상단 프레임"
                  value={input.topFrameColor || "#FFFFFF"}
                  onChange={(v) => {
                    setInput((prev) => ({ ...prev, topFrameColor: v }));
                  }}
                />
              </View>
              <View className="items-center" style={{ width: "48%" }}>
                <ColorPickerField
                  label="하단 프레임"
                  value={input.bottomFrameColor || "#FFFFFF"}
                  onChange={(v) => {
                    setInput((prev) => ({ ...prev, bottomFrameColor: v }));
                  }}
                />
              </View>
              <View className="items-center" style={{ width: "48%" }}>
                <ColorPickerField
                  label="절취선"
                  value={input.lineColor || "#fCA5A5"}
                  onChange={(v) => {
                    setInput((prev) => ({ ...prev, lineColor: v }));
                  }}
                />
              </View>
              <View className="items-center" style={{ width: "48%" }}>
                <ColorPickerField
                  label="이미지 테두리"
                  value={input.imageSectionBorderColor || "#000000"}
                  onChange={(v) => {
                    setInput((prev) => ({
                      ...prev,
                      imageSectionBorderColor: v,
                    }));
                  }}
                />
              </View>
              <View className="items-center" style={{ width: "48%" }}>
                <ColorPickerField
                  label="Qr코드 배경"
                  value={input.QRSectionColor || "#FFFFFF"}
                  onChange={(v) => {
                    setInput((prev) => ({ ...prev, QRSectionColor: v }));
                  }}
                />
              </View>
            </View>
          </View>

          <View className="mt-4 bg-gray-800 p-3 rounded-lg">
            <AppText className=" text-white">글자 색상</AppText>
            <View className="h-0.5 my-2 bg-gray-600" />

            <View className="flex-row flex-wrap justify-between gap-y-3 px-8">
              <ColorPickerField
                label="페스티벌"
                value={input.titleColor || "#000000"}
                onChange={(v) => {
                  setInput((prev) => ({ ...prev, titleColor: v }));
                }}
              />
              <ColorPickerField
                label="장소"
                value={input.locationTxtColor || "#000000"}
                onChange={(v) => {
                  setInput((prev) => ({ ...prev, locationTxtColor: v }));
                }}
              />
              <ColorPickerField
                label="기간"
                value={input.dateTxtColor || "#000000"}
                onChange={(v) => {
                  setInput((prev) => ({ ...prev, dateTxtColor: v }));
                }}
              />
            </View>
          </View>
        </ScrollView>

        <FieldInputModal
          visible={modal === "title"}
          onClose={() => setModal(null)}
          onSubmit={(v) => {
            setInput((prev) => ({ ...prev, title: v }));
            setModal(null);
          }}
          field="페스티벌"
          placeholder="페스티벌 이름을 입력하세요"
          defaultValue={input.title}
          maxLength={40}
        />
        <FieldInputModal
          visible={modal === "location"}
          onClose={() => setModal(null)}
          onSubmit={(v) => {
            setInput((prev) => ({ ...prev, location: v }));
            setModal(null);
          }}
          field="장소"
          placeholder="장소를 입력하세요"
          defaultValue={input.location}
          maxLength={40}
        />
      </View>
    </View>
  );
}
