import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "티켓",
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "만들기",
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: "마이",
        }}
      />
    </Tabs>
  );
}
