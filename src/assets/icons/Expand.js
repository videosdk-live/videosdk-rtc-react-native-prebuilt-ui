import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Expand(props) {
  return (
    <Svg width={16} height={16} viewBox="0 0 14 14" {...props}>
      <Path
        d="M.778 5.553A.778.778 0 010 4.776v-4A.778.778 0 01.778 0h4a.778.778 0 110 1.556H1.556v3.22a.778.778 0 01-.778.778zm4 8.447h-4A.778.778 0 010 13.222v-4a.778.778 0 111.556 0v3.22h3.22a.778.778 0 010 1.556zm8.447 0h-4a.778.778 0 110-1.556h3.22v-3.22a.778.778 0 011.556 0v4a.778.778 0 01-.778.778zm0-8.447a.778.778 0 01-.778-.778V1.556h-3.22a.778.778 0 110-1.556h4a.778.778 0 01.778.778v4a.778.778 0 01-.778.778z"
        fill="#fff"
      />
    </Svg>
  );
}

export default Expand;
