import React from "react";
import { View } from "react-native";
import { Colors } from "../../../styles";
import { convertRFValue, useStandardHeight } from "../../../styles/spacing";
import { Plus } from "../../../assets/icons";
import { Button } from "react-native-ui-lib";
import { ROBOTO_FONTS } from "../../../styles/fonts";

export default function UpcomingMeetingList({ setvisible }) {
  const vertical_36 = useStandardHeight(36);

  const plusIcon = () => {
    return <Plus fill={Colors.WHITE} />;
  };
  return (
    <View
      style={{
        flex: 1,
        marginTop: 8,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        iconSource={plusIcon}
        borderRadius={4}
        size={Button.sizes.large}
        label={"New Meeting"}
        onPress={() => {
          setvisible(true);
        }}
        style={{
          marginHorizontal: 14,
          height: vertical_36,
          marginVertical: 12,
        }}
        labelStyle={{
          fontSize: convertRFValue(14),
          color: Colors.WHITE,
          fontFamily: ROBOTO_FONTS.RobotoMedium,
          marginLeft: 4,
        }}
        backgroundColor={Colors.CYAN_BLUE}
      />
    </View>
  );
}
