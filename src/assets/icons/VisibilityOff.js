import * as React from "react";
import Svg, { Path } from "react-native-svg";

function VisibilityOff(props) {
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
      <Path
        d="M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z"
        fill="none"
      />
      <Path
        d="M12 7c2.8 0 5 2.2 5 5 0 .6-.1 1.3-.4 1.8l2.9 2.9c1.5-1.3 2.7-2.9 3.4-4.8-1.7-4.4-6-7.5-11-7.5-1.4 0-2.7.3-4 .7l2.2 2.2c.6-.2 1.3-.3 1.9-.3zM2 4.3l2.3 2.3.4.4C3 8.3 1.7 10 1 12c1.7 4.4 6 7.5 11 7.5 1.6 0 3-.3 4.4-.8l.4.4 2.9 2.9 1.3-1.3L3.3 3 2 4.3zm5.5 5.5L9 11.4v.6c0 1.7 1.3 3 3 3 .2 0 .4 0 .6-.1l1.6 1.5c-.7.4-1.4.6-2.2.6-2.8 0-5-2.2-5-5 0-.8.2-1.5.5-2.2zm4.3-.8l3.1 3.1v-.2c0-1.7-1.3-3-3-3l-.1.1z"
        fill="#9fa0a7"
      />
    </Svg>
  );
}

export default VisibilityOff;
