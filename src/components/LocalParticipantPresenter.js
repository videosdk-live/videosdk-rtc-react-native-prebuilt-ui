/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Colors } from "../styles";
import ParticipantView from "./ParticipantView";
import { ScreenShare } from "../assets/icons";
import { ROBOTO_FONTS } from "../styles/fonts";
import { convertRFValue } from "../styles/spacing";
import { calcQuality } from "../utils/common";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import ButtonContainer from "./ButtonContainer";
export default function LocalParticipantPresenter({
  toggleBars,
  localPresenterId,
  disableScreenShare,
  
}) {
  const mMeeting = useMeeting();

  const participants = mMeeting?.participants;

  return (
    <TouchableOpacity
      onPress={toggleBars}
      activeOpacity={1}
      style={{
        flex: 1,
        backgroundColor: Colors.DARK_BACKGROUND,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          height: 150,
          width: 100,
          position: "absolute",
          top: 8,
          left: 10,
        }}
      >
        <ParticipantView
          quality={calcQuality(participants?.size || 1)}
          participantId={localPresenterId}
          presstoHide={toggleBars}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScreenShare width={54} height={54} fill={"#FFF"} />
        <Text
          style={{
            fontFamily: ROBOTO_FONTS.RobotoMedium,
            fontSize: convertRFValue(14),
            color: Colors.WHITE,
            marginVertical: 12,
          }}
        >
          You are presenting to everyone
        </Text>
        <ButtonContainer
          label={"Stop Presenting"}
          labelStyle={{
            fontSize: convertRFValue(14),
            color: Colors.WHITE,
            fontFamily: ROBOTO_FONTS.RobotoMedium,
          }}
          onPress={disableScreenShare}
        />
      </View>
    </TouchableOpacity>
  );
}
