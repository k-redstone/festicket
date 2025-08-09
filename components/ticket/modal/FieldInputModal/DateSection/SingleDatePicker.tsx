import { Platform, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useMemo, useState } from "react";
import PrimaryButton from "@/components/common/PrimaryButton";
import { AppText } from "@/components/common/AppText";

const formatYMD = (d?: Date) =>
  d
    ? new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10)
    : undefined;

const clampToRange = (d: Date, min?: Date, max?: Date) => {
  if (min && d < min) return min;
  if (max && d > max) return max;
  return d;
};

interface Props {
  date?: Date;
  onChange: (d?: string) => void;
  placeholder?: string;
  clearable?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
}

export default function SingleDatePicker({
  date,
  onChange,
  minimumDate,
  placeholder = "날짜 선택",
  maximumDate,
  clearable = false,
}: Props) {
  const [showAndroid, setShowAndroid] = useState(false);

  const fallback = useMemo(
    () => clampToRange(new Date(), minimumDate, maximumDate),
    [minimumDate, maximumDate, date]
  );
  const pickerValue = date ?? fallback;

  return Platform.OS === "ios" ? (
    <View className="flex-row items-center gap-x-2">
      <DateTimePicker
        value={pickerValue}
        mode="date"
        display="compact"
        onChange={(_, d) => d && onChange(formatYMD(d))}
        locale="ko-KR"
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        style={{
          transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
          marginLeft: -10,
        }}
      />

      {clearable && date && (
        <PrimaryButton
          classname="bg-transparent"
          onPress={() => onChange(undefined)}
        >
          <AppText className="text-red-400 text-xs">지우기</AppText>
        </PrimaryButton>
      )}
    </View>
  ) : (
    <View className="flex-row items-center">
      <PrimaryButton
        classname="bg-gray-800 rounded-lg p-3"
        onPress={() => setShowAndroid(true)}
      >
        <AppText className="text-white text-sm">
          {date ? formatYMD(date) : placeholder}
        </AppText>
      </PrimaryButton>
      {clearable && date && (
        <PrimaryButton
          classname="ml-2 bg-transparent px-2 py-1"
          onPress={() => onChange(undefined)}
        >
          <AppText className="text-red-400 text-xs">지우기</AppText>
        </PrimaryButton>
      )}

      {showAndroid && (
        <DateTimePicker
          value={pickerValue}
          mode="date"
          display="calendar"
          onChange={(_, d) => {
            setShowAndroid(false);
            if (d) onChange(formatYMD(d));
          }}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
}
