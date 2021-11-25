import * as React from "react";
import Svg, { Defs, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

function Link(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 15.166 15.162"
      {...props}
    >
      <Defs></Defs>
      <Path
        className="a"
        d="M8.163 10.518l-2.321 2.321a2.461 2.461 0 01-3.481-3.481l2.321-2.321a.82.82 0 00-1.16-1.16L1.2 8.197a4.101 4.101 0 005.8 5.8l2.321-2.321a.82.82 0 00-1.16-1.16zM15.167 4.136a4.1 4.1 0 00-7-2.9l-2.32 2.32a.82.82 0 101.16 1.16l2.32-2.32a2.461 2.461 0 013.481 3.481L10.484 8.2a.82.82 0 101.16 1.16l2.321-2.321a4.075 4.075 0 001.202-2.903z"
        transform="translate(0 -.036)"
      />
      <Path
        className="a"
        d="M4.683 10.518a.82.82 0 001.16 0l4.641-4.641a.82.82 0 00-1.16-1.16L4.683 9.358a.82.82 0 000 1.16z"
        transform="translate(0 -.036)"
      />
    </Svg>
  );
}

export default Link;
