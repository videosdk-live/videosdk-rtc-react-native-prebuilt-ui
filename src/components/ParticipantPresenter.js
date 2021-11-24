/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  useParticipant,
  RTCView,
  MediaStream,
} from "@videosdk.live/react-native-sdk";
import { Colors } from "../styles";
import { ScreenShare } from "../assets/icons";
import { ROBOTO_FONTS } from "../styles/fonts";
import { convertRFValue } from "../styles/spacing";
import ParticipantView from "./ParticipantView";
import { useMeetingAppContext } from "../context/MeetingAppContextDef";

export default function ParticipantPresenter({
  presenterId,
  partCipantIDArr,
  presstoHide,
}) {
  const { isLandscape } = useMeetingAppContext();

  const onStreamEnabled = (stream) => {};
  const onStreamDisabled = (stream) => {};
  const {
    displayName,
    participant,
    webcamStream,
    micStream,
    screenShareStream,
    webcamOn,
    micOn,
    screenShareOn,
    isLocal,
    isActiveSpeaker,
    // isMainParticipant,
    setQuality,
    enableMic,
    disableMic,
    enableWebcam,
    disableWebcam,
  } = useParticipant(presenterId, {
    onStreamEnabled,
    onStreamDisabled,
  });

  const presentingText = displayName || "";
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        flex: 1,
        borderTopColor: Colors.GREY_OPACITY_20,
        borderTopWidth: 1,
      }}
    >
      <View
        style={{
          flex: isLandscape ? 1 : 2,
          paddingHorizontal: isLandscape ? 0 : 12,
          backgroundColor: Colors.DARK_BLUE,
          justifyContent: "space-between",
        }}
      >
        {screenShareOn ? (
          <RTCView
            streamURL={new MediaStream([screenShareStream.track]).toURL()}
            objectFit={"contain"}
            style={{
              flex: 1,
              backgroundColor: Colors.DARK_BLUE,
            }}
          />
        ) : null}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 8,
            justifyContent: "space-between",
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: isLandscape
                ? Colors.DARK_BACKGROUND_50
                : Colors.DARK_BACKGROUND,
              padding: 6,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
            }}
          >
            <ScreenShare width={30} height={30} fill={"#FFF"} />
            <Text
              style={{
                color: "white",
                fontFamily: ROBOTO_FONTS.RobotoRegular,
                fontSize: convertRFValue(12),
                marginLeft: 4,
              }}
            >
              {`${presentingText} is Presenting`}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (!isLandscape) {
              presstoHide();
            }
          }}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            // backgroundColor: "red",
          }}
        />
      </View>
      {!isLandscape ? (
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.DARK_BACKGROUND,
            borderTopColor: Colors.GREY_OPACITY_20,
            borderTopWidth: 1,
            flexDirection: "row",
            justifyContent: "center",
            paddingHorizontal: 12,
          }}
        >
          {partCipantIDArr.map((participantId) => {
            return (
              <View
                style={{
                  flex: 2,
                  marginHorizontal: 2,
                  marginVertical: 12,
                }}
              >
                <ParticipantView
                  participantId={participantId}
                  presstoHide={presstoHide}
                />
              </View>
            );
          })}
        </View>
      ) : null}
    </TouchableOpacity>
  );
}
