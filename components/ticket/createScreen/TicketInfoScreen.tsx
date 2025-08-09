import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { AppText } from "@/components/common/AppText";
import type { TTicketInfoInput } from "@/types/createTicketContext";

import PrimaryButton from "@/components/common/PrimaryButton";
import DefaultTicket from "@/components/ticket/DefaultTicket";
import { useState } from "react";
import FieldInputModal from "@/components/ticket/modal/FieldInputModal/FieldInputModal";

import SingleDatePicker from "@/components/ticket/modal/FieldInputModal/DateSection/SingleDatePicker";

interface ITicketInfoScreenProps {
  onBack: () => void;
  context: TTicketInfoInput;
}

export default function TicketInfoScreen({
  onBack,
  context,
}: ITicketInfoScreenProps) {
  const [input, setInput] = useState(context);

  const [modal, setModal] = useState<null | "title" | "location">(null);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={20}
    >
      <View className="px-5 py-4 flex-row items-center">
        <PrimaryButton onPress={onBack}>
          <AppText className="text-xl text-white">뒤로</AppText>
        </PrimaryButton>
      </View>
      <ScrollView className="flex-1">
        <View className="flex-1 items-center justify-center">
          <DefaultTicket
            ticket={{
              top: {
                imageUri: context.editImage,
                title: input.title,
              },
              bottom: {
                location: input.location,
                startDate: input.startDate,
                endDate: input.endDate,
              },
            }}
            width={146}
            height={313}
          />
        </View>
        <View className="flex-1 px-5 pt-5">
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

          <AppText className="font-kbiz-bold text-xl text-white mt-3">
            색상 설정
          </AppText>

          <View className="h-0.5 my-1 bg-gray-600" />
        </View>

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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
