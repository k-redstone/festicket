import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "@/components/common/AppText";

export default function TicketScreen() {
  return (
    <SafeAreaView>
      <View>
        <AppText className=" text-gray-300">TicketScreen</AppText>
      </View>
    </SafeAreaView>
  );
}
