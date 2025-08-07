import { GestureResponderEvent, ViewStyle, Pressable } from "react-native";

interface IPrimaryButtonProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  classname?: string;
}

export default function PrimaryButton({
  children,
  onPress,
  disabled = false,
  style,
  classname,
  ...props
}: IPrimaryButtonProps) {
  return (
    <Pressable
      className={classname}
      onPress={onPress}
      disabled={disabled}
      style={[style]}
      {...props}
    >
      {children}
    </Pressable>
  );
}
