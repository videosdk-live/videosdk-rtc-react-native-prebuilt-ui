import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Emoji(props) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" {...props}>
      <Path
        d="M10 0A10 10 0 110 10 10 10 0 0110 0zm0 1.667A8.333 8.333 0 1018.333 10 8.333 8.333 0 0010 1.667zm3.106 11.111a.834.834 0 111.242 1.112 5.834 5.834 0 01-8.7 0 .834.834 0 111.242-1.112 4.167 4.167 0 006.212 0zM7.083 7.083a1.25 1.25 0 11-1.25 1.25 1.25 1.25 0 011.25-1.25zm5.833 0a1.25 1.25 0 11-1.25 1.25 1.25 1.25 0 011.251-1.25z"
        fill="#fff"
      />
    </Svg>
  );
}

export default Emoji;
