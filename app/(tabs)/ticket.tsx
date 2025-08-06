import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "@/components/common/AppText";

import DefaultTicket from "@/components/ticket/DefaultTicket";
export default function TicketScreen() {
  return (
    <SafeAreaView>
      <View className="gap-y-2 items-center">
        <AppText className=" text-gray-300">TicketScreen</AppText>
        <DefaultTicket />
        <DefaultTicket width={146} height={313} />
        <DefaultTicket />
        <AppText className=" text-gray-300">TicketScreen</AppText>
      </View>
    </SafeAreaView>
  );
}
