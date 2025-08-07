import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";
import { View, Alert } from "react-native";
import { Image } from "expo-image";
import { useState } from "react";

import PrimaryButton from "@/components/common/PrimaryButton";
import { AppText } from "@/components/common/AppText";
import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const IMAGE_WIDTH = SCREEN_WIDTH;
const IMAGE_HEIGHT = (SCREEN_WIDTH * 5) / 4;

interface ISelectImageScreenProps {
  onNext: (value: { uri: string; width: number; height: number }) => void;
}

export default function SelectImageScreen({ onNext }: ISelectImageScreenProps) {
  const [image, setImage] = useState<{
    uri: string;
    width: number;
    height: number;
  } | null>(null);

  const requestPermission = async (): Promise<boolean> => {
    const { status, canAskAgain } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      return true;
    }
    if (canAskAgain) {
      Alert.alert(
        "권한 필요",
        "사진을 선택하려면 이미지 접근 권한이 필요합니다.",
        [
          {
            text: "다시 시도",
            onPress: requestPermission,
          },
          {
            text: "취소",
            style: "cancel",
          },
        ]
      );
    } else {
      Alert.alert(
        "권한 필요",
        "이미지 접근 권한이 꺼져 있습니다.\n설정에서 허용해주세요.",
        [
          {
            text: "설정으로 이동",
            onPress: () => Linking.openSettings(),
          },
          {
            text: "취소",
            style: "cancel",
          },
        ]
      );
    }
    return false;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;
    // 이미지 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 1,
      selectionLimit: 1,
      exif: true,
    });
    if (!result.canceled) {
      const selected = result.assets[0];

      setImage({
        uri: selected.uri,
        width: selected.width,
        height: selected.height,
      });
    }
  };

  return (
    <View className="flex-1">
      <View className="px-5 py-4 flex-row justify-between items-center border-b border-b-gray-700">
        <PrimaryButton>
          <AppText className="text-xl text-white">뒤로</AppText>
        </PrimaryButton>
        <AppText className="text-xl text-white">새로운 티켓</AppText>
        <PrimaryButton
          onPress={() => {
            if (image) {
              onNext(image);
            }
          }}
          disabled={!image}
        >
          <AppText
            className={`text-xl font-kbiz-bold ${
              image ? "text-purple-500" : "text-gray-500"
            }`}
          >
            다음
          </AppText>
        </PrimaryButton>
      </View>
      <View className="flex-1">
        <View
          className={`rounded-md overflow-hidden border border-dashed border-white`}
          style={{
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
            marginBottom: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {image && (
            <Image
              source={{ uri: image.uri }}
              style={{
                width: "100%",
                height: "100%",
              }}
              contentFit="cover"
            />
          )}
        </View>
        <View className="items-center justify-center flex-1">
          <PrimaryButton
            onPress={pickImage}
            classname="px-4 py-3 bg-[#c084fc26] rounded-lg"
          >
            <AppText className="text-purple-300">이미지 선택</AppText>
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
}
