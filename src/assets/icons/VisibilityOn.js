import * as React from "react";
import Svg, { Path } from "react-native-svg";

function VisibilityOn(props) {
  return (
    <Svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      enableBackground="new 0 0 24 24"
      {...props}
    >
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path
        d="M12 4.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5c-1.7-4.4-6-7.5-11-7.5zM12 17c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"
        fill="#1178f8"
      />
    </Svg>
  );
}

export default VisibilityOn;
