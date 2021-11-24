import * as React from "react";
import Svg, { Defs, G, Rect } from "react-native-svg";

function Plus(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 12 12"
      {...props}
    >
      <Defs></Defs>
      <G transform="translate(-.333 -.333) translate(.333 .333)">
        <Rect
          className="a"
          width={2}
          height={12}
          rx={1}
          transform="translate(5)"
        />
        <Rect
          className="a"
          width={12}
          height={2}
          rx={1}
          transform="translate(0 5)"
        />
      </G>
    </Svg>
  );
}

export default Plus;
