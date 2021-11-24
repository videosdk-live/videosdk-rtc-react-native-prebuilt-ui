import React from "react";
import { convertRFValue } from "../../../styles/spacing";
import { ROBOTO_FONTS } from "../../../styles/fonts";
import { View, Text } from "react-native";
import { Colors } from "../../../styles";
import { AnimatableManager, Button } from "react-native-ui-lib";
import * as Animatable from "react-native-animatable";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../../navigators/screenNames";

export default function UpcomingMeetingListItem({
  title,
  sTime,
  eTime,
  meetingId,
  domainName,
}) {
  const navigation = useNavigation();
  const animationProps = AnimatableManager.presets.slideInUp;
  const formatedStime = moment(sTime).format("DD/MMM/YY");
  const splitStime = formatedStime.split("/");
  const startTime = moment(sTime).format("hh:mm A");
  const endTime = moment(eTime).format("hh:mm A");
  return (
    <Animatable.View
      {...animationProps}
      style={{
        marginHorizontal: 14,
        backgroundColor: Colors.WHITE,
        flexDirection: "row",
        padding: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 8,
        marginVertical: 8,
      }}
    >
      <Button
        avoidInnerPadding
        avoidMinWidth
        style={{ flex: 1, backgroundColor: "transparent" }}
        borderRadius={0}
        onPress={() => {
          navigation.navigate(SCREEN_NAMES.MeetingInfo, {
            meetingId,
            domain: domainName,
          });
        }}
      >
        <View
          style={{
            borderRadius: 5,
            paddingHorizontal: 16,
            paddingVertical: 10,
            backgroundColor: "#DAE6F5",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: convertRFValue(18),
              color: "#5B84B5",
              fontFamily: ROBOTO_FONTS.RobotoBold,
            }}
          >
            {splitStime[0]}
          </Text>
          <Text
            style={{
              fontSize: convertRFValue(10),
              fontFamily: ROBOTO_FONTS.RobotoBold,
              color: "#5B84B5",
            }}
          >
            {splitStime[1]}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: 6,
            justifyContent: "space-between",
            paddingVertical: 6,
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              fontSize: convertRFValue(14),
              color: Colors.BLACK,
              fontFamily: ROBOTO_FONTS.RobotoBold,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: "#9FB8AD",
              fontSize: convertRFValue(12),
              marginTop: 8,
            }}
          >
            {`${startTime} - ${endTime}`}
          </Text>
        </View>
      </Button>
    </Animatable.View>
  );
}
