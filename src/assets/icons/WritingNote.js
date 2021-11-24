import * as React from "react";
import Svg, { Defs, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */

function WritingNote(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 17.1 19.08"
      {...props}
    >
      <Defs></Defs>
      <Path
        className="a"
        d="M10.759 8.19a.7.7 0 00-.7-.7H2.833a.7.7 0 100 1.4h7.226a.7.7 0 00.7-.7zM3.777 10.486a.7.7 0 100 1.4h4.389a.7.7 0 100-1.4z"
      />
      <Path
        className="a"
        d="M5.516 17.59H3.004a1.5 1.5 0 01-1.5-1.491V2.981a1.5 1.5 0 011.5-1.491h9.234a1.5 1.5 0 011.5 1.491v4.584a.751.751 0 001.5 0V2.981a3 3 0 00-3-2.981H3.004a3 3 0 00-3 2.981V16.1a3 3 0 003 2.981h2.512a.746.746 0 100-1.491zM16.484 11.278a2.107 2.107 0 00-2.976 0l-3.852 3.843a.7.7 0 00-.176.293l-.839 2.761a.7.7 0 00.859.88l2.832-.784a.7.7 0 00.308-.18l3.844-3.836a2.107 2.107 0 000-2.977zm-4.7 5.689l-1.425.395.417-1.373 2.6-2.593.992.992zm3.713-3.706l-.136.136-.992-.992.135-.135a.702.702 0 01.993.992z"
      />
      <Path
        className="a"
        d="M10.058 4.494H2.832a.7.7 0 100 1.4h7.226a.7.7 0 100-1.4z"
      />
    </Svg>
  );
}

export default WritingNote;
