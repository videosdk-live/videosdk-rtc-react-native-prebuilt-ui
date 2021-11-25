import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ToastAndroid,
  AlertIOS,
  Platform,
  Animated,
} from "react-native";
import { Button } from "react-native-ui-lib";
import { Colors } from "../styles";
import { KeyboardArrowLeft, CameraSwitch, People } from "../assets/icons";
import { ROBOTO_FONTS } from "../styles/fonts";
import { convertRFValue } from "../styles/spacing";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import { TAB_COMPONENT_MODES } from "../scenes/meetingViewer";
const HeaderMeetingViewer = ({ setCurrentTabModes, animeVal, exitMeeting }) => {
  const { changeWebcam, meetingId, participants, localWebcamOn } = useMeeting(
    {}
  );
  const participantsArrId = [...participants.keys()];

  const title = meetingId;

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: animeVal.interpolate({
              inputRange: [0, 1],
              outputRange: [-50, 0],
            }),
          },
        ],
        height: animeVal.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 50],
        }),
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 50,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Button
            round
            size={Button.sizes.small}
            onPress={exitMeeting}
            backgroundColor={Colors.DARK_BACKGROUND}
          >
            <KeyboardArrowLeft />
          </Button>
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                fontFamily: ROBOTO_FONTS.RobotoMedium,
                fontSize: convertRFValue(14),
                color: Colors.WHITE,
              }}
            >
              {title}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Button
            round
            size={Button.sizes.small}
            onPress={() => {
              if (localWebcamOn) {
                changeWebcam();
              } else {
                const message = "First, you should have to on video cam";
                if (Platform.OS === "android") {
                  ToastAndroid.show(message, ToastAndroid.SHORT);
                } else {
                  AlertIOS.alert(message);
                }
              }
            }}
            backgroundColor={Colors.DARK_BACKGROUND}
          >
            <CameraSwitch height={22} width={22} fill={Colors.WHITE} />
          </Button>

          <TouchableOpacity
            onPress={() => {
              setCurrentTabModes(TAB_COMPONENT_MODES.PARTICIPANTS);
            }}
            activeOpacity={1}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 8,
            }}
          >
            <People height={24} width={24} fill={Colors.WHITE} />
            <Text
              style={{
                fontSize: convertRFValue(14),
                color: Colors.WHITE,
                marginLeft: 4,
                fontFamily: ROBOTO_FONTS.RobotoMedium,
              }}
            >
              {participantsArrId && participantsArrId.length
                ? participantsArrId.length
                : 1}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default HeaderMeetingViewer;
