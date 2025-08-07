import { View } from "react-native";

import { AppText } from "@/components/common/AppText";
import { Image } from "expo-image";
import type { TTicketInfoInput } from "@/types/createTicketContext";
import { Dimensions } from "react-native";
import PrimaryButton from "@/components/common/PrimaryButton";
const SCREEN_WIDTH = Dimensions.get("window").width;
const IMAGE_FRAME_WIDTH = SCREEN_WIDTH;
const IMAGE_FRAME_HEIGHT = (SCREEN_WIDTH * 5) / 4;

interface ITicketInfoScreenProps {
  onBack: () => void;
  context: TTicketInfoInput;
}

export default function TicketInfoScreen({
  onBack,
  context,
}: ITicketInfoScreenProps) {
  return (
    <View className="flex-1">
      <View className="px-5 py-4 flex-row items-center ">
        <PrimaryButton onPress={onBack}>
          <AppText className="text-xl text-white">뒤로</AppText>
        </PrimaryButton>
      </View>
      <View className="flex-1">
        <View
          className={`rounded-md overflow-hidden border border-dashed border-white`}
          style={{
            width: IMAGE_FRAME_WIDTH,
            height: IMAGE_FRAME_HEIGHT,
            marginBottom: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {context.editImage && (
            <Image
              source={{ uri: context.editImage }}
              style={{
                width: "100%",
                height: "100%",
              }}
              contentFit="cover"
            />
          )}
        </View>
      </View>
    </View>
  );
}
