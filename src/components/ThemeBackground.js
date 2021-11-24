import React from "react";
import { ImageBackground } from "react-native";

export default function ThemeBackground(props) {
  const bgImage = require("../assets/backgroundImage/backgroundImage.png");

  return (
    <ImageBackground source={bgImage} style={{ flex: 1 }}>
      {props.children}
    </ImageBackground>
  );
}
