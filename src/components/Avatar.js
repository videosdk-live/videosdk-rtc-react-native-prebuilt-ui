/* eslint-disable react-native/no-inline-styles */
import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { getRandomColor, invertColor } from "../utils/getRandomColors";
import { convertRFValue } from "../styles/spacing";

export default function Avatar({ fullName, style }) {
  const participantAccentColor = useMemo(() => getRandomColor("light"), []);

  return (
    <View
      style={{
        ...style,
        backgroundColor: participantAccentColor,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      <Text
        style={{
          fontSize: convertRFValue(16),
          color: invertColor(participantAccentColor),
          fontWeight: "bold",
        }}
      >
        {fullName && fullName.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
}
