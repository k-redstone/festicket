import { Pressable, PressableProps, Text, View } from "react-native";
import TicketSVG from "@/assets/svg/TicketSVG.svg";
import UserSVG from "@/assets/svg/UserSVG.svg";
import AddSVG from "@/assets/svg/AddSVG.svg";
import { TabLabel } from "@/types";
import { usePathname } from "expo-router";

const labelIconMap = {
  ticket: TicketSVG,
  create: AddSVG,
  user: UserSVG,
} as const;

const labelTextMap = {
  ticket: "티켓",
  create: "만들기",
  user: "마이",
} as const;

interface INavButtonProps extends PressableProps {
  label: TabLabel;
  routeName: string;
}

export default function NavButton({
  label,
  routeName,
  accessibilityState,
  ...pressableProps
}: INavButtonProps) {
  const pathname = usePathname();
  const focused = pathname === routeName || pathname.startsWith(routeName);

  const iconColor = focused ? "#c084fc" : "#a3a3a3";
  const IconComponent = labelIconMap[label];

  return (
    <View className="flex items-center">
      <Pressable
        {...pressableProps}
        style={{
          padding: 8,
          width: 56,
          height: 56,
          backgroundColor: focused ? "#c084fc26" : "transparent",
          borderRadius: 4,
        }}
      >
        <View className="flex items-center justify-center">
          <IconComponent color={iconColor} />
          <View>
            <Text
              className={`text-xs ${
                focused ? "text-purple-300" : "text-gray-500"
              }`}
            >
              {labelTextMap[label]}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
