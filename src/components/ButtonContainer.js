import React from "react";
import { Button } from "react-native-ui-lib";
import { useStandardHeight } from "../styles/spacing";
import { Colors } from "../styles";

export default function ButtonContainer(props) {
  const vertical_36 = useStandardHeight(36);
  const { label, onPress, containerStyle, labelStyle } = props;
  return (
    <Button
      {...props}
      borderRadius={4}
      size={Button.sizes.large}
      label={label}
      onPress={onPress}
      style={{
        height: vertical_36,
        ...containerStyle,
      }}
      labelStyle={{
        ...labelStyle,
      }}
      backgroundColor={Colors.CYAN_BLUE}
    />
  );
}
