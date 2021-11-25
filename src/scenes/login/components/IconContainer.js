import React from "react";
import { View, Image, Text } from "react-native";
import { Colors } from "../../../styles";
import { ROBOTO_FONTS } from "../../../styles/fonts";
import { convertRFValue, useStandardHeight } from "../../../styles/spacing";

export default function IconContainer({ title, subTitle, pic }) {
  const prism = require("../../../assets/icons/prism.png");
  const vertical_64 = useStandardHeight(64);

  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      {pic ? (
        <Image
          source={{ uri: pic }}
          resizeMode={"center"}
          style={{ height: 50, aspectRatio: 1 }}
        />
      ) : (
        <Image source={prism} style={{ height: vertical_64, aspectRatio: 1 }} />
      )}
      <Text
        style={{
          color: Colors.BLACK,
          fontFamily: ROBOTO_FONTS.RobotoBold,
          fontSize: convertRFValue(16),
          marginTop: 16,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: Colors.BLACK,
          fontFamily: ROBOTO_FONTS.RobotoRegular,
          fontSize: convertRFValue(12),
          marginTop: 6,
        }}
      >
        {subTitle}
      </Text>
    </View>
  );
}
