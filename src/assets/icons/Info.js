import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Info(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 14 14"
      {...props}
    >
      <Path
        d="M11.667 0H2.333A2.333 2.333 0 000 2.333v9.333A2.333 2.333 0 002.333 14h9.333A2.333 2.333 0 0014 11.667V2.333A2.333 2.333 0 0011.667 0zM7.584 9.718a.584.584 0 01-1.167 0V6.656a.584.584 0 110-1.167H7a.583.583 0 01.583.583zM7 4.865a.583.583 0 11.583-.583.583.583 0 01-.583.583z"
        fill="#fff"
      />
    </Svg>
  );
}

export default Info;
