import { useColorScheme } from "@/hooks/useColorScheme";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import NavButton from "@/components/navigation/NavButton";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: "#1F2937",
            borderTopColor: "#374151",
            borderTopWidth: 1,
            paddingHorizontal: 16,
            paddingTop: 4,
            minHeight: 80,
          },
          default: {
            backgroundColor: "#1F2937",
            borderTopWidth: 1,
            borderTopColor: "#374151",
            paddingHorizontal: 16,
            paddingTop: 4,
            minHeight: 80,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="ticket"
        options={{
          title: "티켓",
          tabBarButton: (props) => (
            <NavButton label="ticket" routeName="/ticket" {...props} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "만들기",
          tabBarButton: (props) => (
            <NavButton label="create" routeName="/create" {...props} />
          ),
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: "마이",
          tabBarButton: (props) => (
            <NavButton label="user" routeName="/my" {...props} />
          ),
        }}
      />
    </Tabs>
  );
}
