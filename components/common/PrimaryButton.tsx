import { Text, View } from "react-native";

interface IPrimaryButtonProps {
  children: React.ReactNode;
}

export default function PrimaryButton({ children }: IPrimaryButtonProps) {
  return (
    <View>
      <Text>{children}</Text>
    </View>
  );
}
