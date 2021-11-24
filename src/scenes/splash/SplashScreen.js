import React from "react";
import { Colors } from "../../styles";
import { View } from "react-native";
import { LoaderScreen } from "react-native-ui-lib";

export default function SplashScreen({}) {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.DARK_BACKGROUND }}>
      <LoaderScreen
        color={Colors.WHITE}
        message="Loading.."
        messageStyle={{ color: Colors.WHITE }}
      />
    </View>
  );
}
