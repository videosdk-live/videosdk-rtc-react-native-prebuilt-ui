/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import {
  useParticipant,
  RTCView,
  MediaStream,
} from "@videosdk.live/react-native-sdk";
import { Colors } from "../styles";
import { convertRFValue } from "../styles/spacing";
import { MicOff } from "../assets/icons";
import Avatar from "./Avatar";
import LottieView from "lottie-react-native";
import { AnimatableManager } from "react-native-ui-lib";
import * as Animatable from "react-native-animatable";

export default function ParticipantView({
  quality,
  presstoHide,
  participantId,
}) {
  const onStreamEnabled = (stream) => { };
  const onStreamDisabled = (stream) => { };

  const {
    displayName,
    webcamStream,
    webcamOn,
    micOn,
    isLocal,
    setQuality,
    isActiveSpeaker,
    setViewPort
  } = useParticipant(participantId, {
    onStreamEnabled,
    onStreamDisabled,
  });

  // useEffect(() => {
  //   if (!quality) return;
  //   setQuality(quality);
  // }, [quality]);

  useEffect(() => {
    typeof webcamStream?.resume === "function" && webcamStream?.resume();
    return () => {
      typeof webcamStream?.pause === "function" && webcamStream?.pause();
    };
  }, []);

  const MicStatusComponent = () => {
    return (
      <View
        style={{
          alignItems: "center",
          position: "absolute",
          top: 10,
          padding: 8,
          right: 10,
          height: 26,
          aspectRatio: 1,
          backgroundColor: Colors.DARK_BLUE_OPACITY_30,
          flexDirection: "row",
          borderRadius: 12,
          justifyContent: "center",
        }}
      >
        <MicOff width={16} height={16} fill={Colors.DARK_BLUE} />
      </View>
    );
  };

  const DisplayNameComponent = () => {
    return (
      <View
        style={{
          alignItems: "center",
          position: "absolute",
          bottom: 8,
          padding: 8,
          left: 6,
          backgroundColor: "rgba(0,0,0,0.3)",
          flexDirection: "row",
          borderRadius: 5,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: Colors.WHITE,
            fontSize: convertRFValue(10),
          }}
        >
          {isLocal ? "You" : displayName || ""}
        </Text>
      </View>
    );
  };

  const animationProps = AnimatableManager.presets.slideInUp;

  return (
    <Animatable.View
      {...animationProps}
      key={participantId}
      style={{
        borderRadius: 8,
        overflow: "hidden",
        flex: 1,
        marginHorizontal: 4,
        marginVertical: 4,
      }}
    >
      <TouchableOpacity
        onPress={presstoHide}
        activeOpacity={1}
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        {webcamOn ? (
          <>
            <RTCView
              onLayout={(event) => {
                const { width, height } = event.nativeEvent.layout;
                if (!isLocal && webcamStream) {
                  setViewPort(width, height);
                }
              }}
              streamURL={new MediaStream([webcamStream.track]).toURL()}
              objectFit={"cover"}
              mirror={isLocal ? true : false}
              style={{
                flex: 1,
                backgroundColor: Colors.DARK_BACKGROUND,
              }}
            />
            <DisplayNameComponent />
            {micOn && isActiveSpeaker ? (
              <View
                style={{
                  backgroundColor: "#00000066",
                  position: "absolute",
                  top: 10,
                  right: 10,
                  borderRadius: 16,
                }}
              >
                <LottieView
                  autoPlay={true}
                  loop={true}
                  style={{ height: 30, aspectRatio: 1 }}
                  source={require("../assets/audioAnalyzer.json")}
                />
              </View>
            ) : !micOn ? (
              <MicStatusComponent />
            ) : null}
          </>
        ) : (
          <View
            style={{
              backgroundColor: Colors.GRAYISH_BLUE,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: "50%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                fullName={displayName}
                style={{
                  height: 60,
                  aspectRatio: 1,
                  borderRadius: 40,
                }}
              />
              {micOn ? (
                <LottieView
                  autoPlay={true}
                  loop={true}
                  source={require("../assets/audioPower.json")}
                />
              ) : null}
            </View>

            <DisplayNameComponent />
            {!micOn ? <MicStatusComponent /> : null}
          </View>
        )}
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            borderWidth: isActiveSpeaker ? 2 : 0,
            borderColor: "#a4a5f1",
            borderRadius: 8,
          }}
        />
      </TouchableOpacity>
    </Animatable.View>
  );
}
