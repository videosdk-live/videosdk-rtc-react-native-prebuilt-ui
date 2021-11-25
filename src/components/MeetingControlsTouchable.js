/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Colors } from "../styles";
import { Button } from "react-native-ui-lib";

export default function MeetingControlsTouchable(props) {
  const { Icon, onPress, bgColor } = props;
  return (
    <Button
      {...props}
      size={Button.sizes.small}
      avoidMinWidth
     
      avoidInnerPadding
      onPress={onPress}
      style={{
        height: 46,
        aspectRatio: 1,
        marginHorizontal: 8,
        backgroundColor: bgColor,
      }}
    >
      <Icon fill="#FFF" />
    </Button>
  );
}
