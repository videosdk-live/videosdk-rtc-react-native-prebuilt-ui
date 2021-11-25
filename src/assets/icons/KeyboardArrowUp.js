import * as React from "react";
import Svg, { Path } from "react-native-svg";

function KeyboardArrowUp(props) {
  return (
    <Svg width={10} height={10} viewBox="0 0 8.192 4.88" {...props}>
      <Path
        d="M4.647.231L7.96 3.544a.782.782 0 01-1.1 1.109L4.094 1.887 1.328 4.653a.782.782 0 01-1.1-1.109L3.54.231a.781.781 0 011.109 0z"
        fill="#fff"
      />
    </Svg>
  );
}

export default KeyboardArrowUp;
