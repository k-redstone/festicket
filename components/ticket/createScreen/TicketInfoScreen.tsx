import { View } from "react-native";

import { AppText } from "@/components/common/AppText";

import type { TEditImageInput } from "@/types/createTicketContext";

interface ITicketInfoScreenProps {
  onBack: () => void;
  context: TEditImageInput;
}

export default function TicketInfoScreen({
  onBack,
  context,
}: ITicketInfoScreenProps) {
  return (
    <View>
      <AppText>ticket info screen</AppText>
    </View>
  );
}
