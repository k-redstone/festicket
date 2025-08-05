import { Text, TextProps } from "react-native";

export function AppText(props: TextProps) {
  return <Text {...props} className={`font-kbiz ${props.className || ""}`} />;
}
