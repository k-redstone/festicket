import { AppText } from "@/components/common/AppText";
import PrimaryButton from "@/components/common/PrimaryButton";
import React, { useRef } from "react";
import { View } from "react-native";
import {
  ColorPickerBottomSheet,
  ColorPickerBottomSheetHandle,
} from "@/components/ticket/ColorPicker/ColorPickerBottomSheet";
type Hex = `#${string}`;

const DEFAULT_PALETTE: Readonly<Hex[]> = [
  "#FF5733",
  "#FFC300",
  "#28A745",
  "#007BFF",
  "#6F42C1",
  "#343A40",
] as const;

export type ColorPickerFieldProps = {
  label?: string;
  value: Hex;
  onChange: (hex: Hex) => void;
  palette?: Readonly<Hex[]>;
  disabled?: boolean;
};

const Swatch = ({
  color,
  selected,
  onPress,
}: {
  color: Hex;
  selected?: boolean;
  onPress: () => void;
}) => (
  <PrimaryButton
    onPress={onPress}
    style={{
      width: 36,
      height: 36,
      borderRadius: 8,
      marginRight: 8,
      backgroundColor: color,
      borderWidth: selected ? 2 : 1,
      borderColor: selected ? "#fff" : "#333",
    }}
  >
    <AppText></AppText>
  </PrimaryButton>
);

const PlusTile = ({ onPress }: { onPress: () => void }) => (
  <PrimaryButton
    onPress={onPress}
    style={{
      width: 36,
      height: 36,
      borderRadius: 8,
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: "#6B7280",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <View
      style={{
        width: 16,
        height: 2,
        backgroundColor: "#9CA3AF",
        position: "absolute",
      }}
    />
    <View
      style={{
        width: 2,
        height: 16,
        backgroundColor: "#9CA3AF",
        position: "absolute",
      }}
    />
  </PrimaryButton>
);

export default function ColorPickerField({
  label,
  value,
  onChange,
  palette = DEFAULT_PALETTE,
  disabled,
}: ColorPickerFieldProps) {
  const bottomSheetRef = useRef<ColorPickerBottomSheetHandle>(null);

  return (
    <View>
      {label ? (
        <View className="gap-y-1 items-center self-start">
          <AppText className="text-white">{label}</AppText>
          <PrimaryButton
            classname="flex-row items-center border border-gray-400 rounded-lg px-2.5 py-1.5 gap-x-2 self-start"
            onPress={() => bottomSheetRef.current?.open()}
            disabled={disabled}
          >
            <View
              className="w-5 h-5 rounded border border-[#111827]"
              style={{
                backgroundColor: value,
              }}
            />
            <AppText className="text-white">{value}</AppText>
          </PrimaryButton>
        </View>
      ) : null}

      <ColorPickerBottomSheet
        ref={bottomSheetRef}
        value={value}
        onChange={onChange}
        palette={palette}
      />
    </View>
  );
}
