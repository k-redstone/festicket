import { Modal, View, TextInput, Pressable, Keyboard } from "react-native";

import { useState, useEffect, useRef } from "react";
import PrimaryButton from "@/components/common/PrimaryButton";
import { AppText } from "@/components/common/AppText";

import { SafeAreaView } from "react-native-safe-area-context";

interface IFieldInputModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  field: string;
  placeholder?: string;
  defaultValue?: string;
  maxLength?: number;
}

export default function FieldInputModal({
  visible,
  onClose,
  onSubmit,
  field,
  placeholder,
  defaultValue = "",
  maxLength = 40,
}: IFieldInputModalProps) {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<TextInput>(null);

  const handleComplete = () => {
    onSubmit(value.trim());
    onClose();
    return;
  };

  // 모달 내부 입력 초기화(visible 변경될 때)
  useEffect(() => {
    if (!visible) return;
    setValue(defaultValue ?? "");
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    return () => clearTimeout(t);
  }, [visible, defaultValue]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      presentationStyle="overFullScreen"
    >
      <Pressable
        style={{ flex: 1, backgroundColor: "#000a" }}
        onPress={handleComplete}
      >
        <SafeAreaView edges={["top"]} className=" bg-gray-900">
          <View
            className="px-5 py-4 items-center justify-center relative bg-gray-900 border-b border-b-gray-600"
            onStartShouldSetResponder={() => true}
          >
            <AppText className="font-kbiz-bold text-white text-lg">
              {field}
            </AppText>
            <PrimaryButton
              classname="p-1 absolute bottom-3 right-4"
              disabled={!value.trim()}
              onPress={handleComplete}
            >
              <AppText
                className={`text-lg  ${
                  value.trim() ? "text-purple-500" : "text-gray-500"
                }`}
              >
                확인
              </AppText>
            </PrimaryButton>
          </View>
        </SafeAreaView>

        {/* 입력창 */}
        <View
          className="h-48 bg-gray-900 py-2"
          onStartShouldSetResponder={() => true}
        >
          <TextInput
            ref={inputRef}
            className=" text-white h-44 p-5"
            value={value}
            onChangeText={setValue}
            maxLength={maxLength}
            placeholder={placeholder}
            autoFocus
            multiline
            returnKeyType="done"
            placeholderTextColor="#888"
            textAlignVertical="top"
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Enter") {
                Keyboard.dismiss();
              }
            }}
          />
        </View>
      </Pressable>
    </Modal>
  );
}
