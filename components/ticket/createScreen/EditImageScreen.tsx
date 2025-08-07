import { View } from "react-native";

import { AppText } from "@/components/common/AppText";
import { Image } from "expo-image";
import type { TEditImageInput } from "@/types/createTicketContext";

interface IEditImageScreenProps {
  onNext: (value: string) => void;
  onBack: () => void;
  context: TEditImageInput;
}

export default function EditImageScreen({
  context,
  onNext,
  onBack,
}: IEditImageScreenProps) {
  return (
    <View>
      <AppText>edit image</AppText>
      <View
        className={`rounded-md overflow-hidden border border-dashed border-white`}
        style={{
          width: 156,
          height: 196,
          marginBottom: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {context.originImageUri && (
          <Image
            source={{ uri: context.originImageUri }}
            style={{
              width: "100%",
              height: "100%",
            }}
            contentFit="cover"
          />
        )}
      </View>
    </View>
  );
}
