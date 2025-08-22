import React, {
  useMemo,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { View, Text } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

import ColorPicker, {
  Panel1,
  Swatches,
  HueCircular,
} from "reanimated-color-picker";

import type { HexColor } from "@/types/createTicketContext";

export type ColorPickerBottomSheetHandle = {
  open: () => void;
  close: () => void;
};

export type ColorPickerBottomSheetProps = {
  value: HexColor;
  onChange: (hex: HexColor) => void;
  palette: Readonly<HexColor[]>;
};

const normalizeHex = (input: string): HexColor | null => {
  const v = input.trim().replace(/^#?/, "").toUpperCase();
  return /^[0-9A-F]{6}$/.test(v) ? (`#${v}` as HexColor) : null;
};

export const ColorPickerBottomSheet = forwardRef<
  ColorPickerBottomSheetHandle,
  ColorPickerBottomSheetProps
>(({ value, onChange, palette }, ref) => {
  const snapPoints = useMemo(() => ["50%", "75%"], []);
  const [tab, setTab] = useState<"HEX" | "PICK">("HEX");
  const [hexInput, setHexInput] = useState<string>(value);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetRef.current?.present(),
    close: () => bottomSheetRef.current?.dismiss(),
  }));

  const onColorChange = useCallback(({ hex }: { hex: string }) => {
    const n = normalizeHex(hex);
    if (n) setHexInput(n);
  }, []);

  const onColorComplete = useCallback(
    ({ hex }: { hex: string }) => {
      const n = normalizeHex(hex);
      if (n) onChange(n);
    },
    [onChange]
  );

  const applyHex = useCallback(() => {
    const n = normalizeHex(hexInput);
    if (n) {
      onChange(n);
      bottomSheetRef.current?.close();
    }
  }, [hexInput, onChange]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      // index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={(p) => (
        <BottomSheetBackdrop {...p} appearsOnIndex={0} disappearsOnIndex={-1} />
      )}
      handleIndicatorStyle={{ backgroundColor: "#6B7280" }}
      backgroundStyle={{ backgroundColor: "#111827" }}
    >
      <BottomSheetView
        className="flex-1 p-4 gap-3"
        // style={{ padding: 16, gap: 12 }}
      >
        <View style={{ gap: 16 }}>
          <ColorPicker
            value={value}
            onChangeJS={onColorChange}
            onCompleteJS={onColorComplete}
            style={{ gap: 16 }}
          >
            <HueCircular
              containerStyle={{
                backgroundColor: "#111827",
                justifyContent: "center",
                alignItems: "center",
              }}
              thumbShape="ring"
            >
              <Panel1
                style={{ borderRadius: 12, width: "70%", height: "70%" }}
              />
            </HueCircular>

            <Swatches colors={palette as string[]} style={{ marginTop: 4 }} />
          </ColorPicker>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});
