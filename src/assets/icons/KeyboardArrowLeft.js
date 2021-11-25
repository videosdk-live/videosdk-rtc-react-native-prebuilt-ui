import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "../../styles";

function KeyboardArrowLeft(props) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill={Colors.WHITE}
      {...props}>
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
    </Svg>
  );
}

export default KeyboardArrowLeft;
