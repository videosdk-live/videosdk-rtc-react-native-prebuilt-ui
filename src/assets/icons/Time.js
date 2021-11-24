import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Time(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 16 16"
      {...props}
    >
      <Path
        d="M8.003 0a8 8 0 108 8 8.014 8.014 0 00-8-8zm0 1.454a6.546 6.546 0 11-6.549 6.544 6.532 6.532 0 016.549-6.544zm-.011 1.444a.727.727 0 00-.72.741v4.359a.727.727 0 00.731.73h4.357a.728.728 0 000-1.456H8.727V3.636a.727.727 0 00-.736-.741z"
        fill="#9fa0a7"
        fillRule="evenodd"
      />
    </Svg>
  );
}

export default Time;
