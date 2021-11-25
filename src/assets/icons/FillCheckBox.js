import * as React from "react";
import Svg, { G, Rect, Path } from "react-native-svg";

function FillCheckBox(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      {...props}
    >
      <G fill="#1178f8" stroke="#1178f8" strokeWidth="2.5px">
        <Rect width={20} height={20} rx={5} stroke="none" />
        <Rect
          x={1.25}
          y={1.25}
          width={17.5}
          height={17.5}
          rx={3.75}
          fill="none"
        />
      </G>
      <Path
        d="M13.526 6.009l-4.821 4.82-1.874-1.873-1.474 1.473 3.348 3.347 6.3-6.294z"
        fill="#fff"
      />
    </Svg>
  );
}

export default FillCheckBox;
