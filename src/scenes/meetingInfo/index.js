import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  ToastAndroid,
  Clipboard,
} from "react-native";
import { Colors } from "../../styles";
import {
  convertRFValue,
  useStandardHeight,
  useStandardWidth,
} from "../../styles/spacing";
import {
  MicOn,
  VideoEnable,
  VideoDisable,
  MicOff,
  CopyContent,
} from "../../assets/icons";
import { ROBOTO_FONTS } from "../../styles/fonts";
import ButtonContainer from "../../components/ButtonContainer";
import { Dots } from "../../assets/icons";
import MeetingControlsTouchable from "../../components/MeetingControlsTouchable";
import { Button } from "react-native-ui-lib";
import { useRoute } from "@react-navigation/native";
import { SCREEN_NAMES } from "../../navigators/screenNames";
import { RTCView, mediaDevices } from "@videosdk.live/react-native-sdk";

export default function MeetingInfo({ navigation }) {
  const route = useRoute();
  const { meetingId, token } = route.params;
  const [micOn, setMicon] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  const vertical_50 = useStandardHeight(50);
  const vertical_20 = useStandardHeight(20);
  const vertical_220 = useStandardHeight(220);
  const horizontal_150 = useStandardWidth(150);

  const [tracks, setTrack] = useState("");

  useEffect(async () => {
    mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        setTrack(stream.toURL());
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.DARK_BACKGROUND,
      }}
    >
      <>
        <View
          style={{
            height: Dimensions.get("screen").height / 2.5,
            width: Dimensions.get("screen").width,
            paddingHorizontal: vertical_50,
            marginTop: 26,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                alignSelf: "flex-start",
              }}
            >
              <Dots />
            </View>
            <View
              style={{
                height: vertical_220,
                width: horizontal_150,
                position: "absolute",
                top: 50,
              }}
            >
              {videoOn ? (
                <RTCView
                  streamURL={tracks}
                  objectFit={"cover"}
                  mirror={true}
                  style={{
                    flex: 1,
                    backgroundColor: Colors.DARK_BACKGROUND,
                  }}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: Colors.GRAYISH_BLUE,
                  }}
                >
                  <Text style={{ color: Colors.WHITE }}>No media</Text>
                </View>
              )}
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 12,
                  justifyContent: "center",
                }}
              >
                <MeetingControlsTouchable
                  outlineWidth={1}
                  outline
                  outlineColor={Colors.WHITE}
                  bgColor={micOn ? Colors.WHITE : "transparent"}
                  onPress={() => {
                    setMicon(!micOn);
                  }}
                  Icon={() => {
                    return micOn ? (
                      <MicOn width={20} height={20} fill={Colors.BLACK} />
                    ) : (
                      <MicOff width={20} height={20} fill={Colors.WHITE} />
                    );
                  }}
                />
                <MeetingControlsTouchable
                  outlineWidth={1}
                  outline
                  outlineColor={Colors.WHITE}
                  bgColor={videoOn ? Colors.WHITE : "transparent"}
                  onPress={() => {
                    setVideoOn(!videoOn);
                  }}
                  Icon={() => {
                    return videoOn ? (
                      <VideoEnable height={20} width={20} fill={Colors.BLACK} />
                    ) : (
                      <VideoDisable
                        width={26}
                        height={26}
                        fill={Colors.WHITE}
                      />
                    );
                  }}
                />
              </View>
            </View>

            <View
              style={{
                alignSelf: "flex-end",
              }}
            >
              <Dots />
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 12,
            }}
          >
            <Text
              numberOfLines={2}
              style={{
                color: Colors.WHITE,
                fontFamily: ROBOTO_FONTS.RobotoBold,
                fontSize: convertRFValue(18),
                flexWrap: "wrap",
                textAlign: "center",
              }}
            >
              {meetingId}
            </Text>
            <Button
              avoidMinWidth
              avoidInnerPadding
              style={{
                justifyContent: "center",
                marginLeft: 10,
                backgroundColor: "transparent",
              }}
              onPress={() => {
                Clipboard.setString(meetingId);
                ToastAndroid.show(
                  "Meeting Id copied successfully",
                  ToastAndroid.SHORT
                );
              }}
            >
              <CopyContent fill={Colors.CYAN_BLUE} />
            </Button>
          </View>
          <ButtonContainer
            containerStyle={{ marginTop: vertical_20 }}
            label={"Join Meeting"}
            labelStyle={{
              fontSize: convertRFValue(14),
              color: Colors.WHITE,
              fontFamily: ROBOTO_FONTS.RobotoMedium,
            }}
            onPress={() => {
              setTrack(null);
              navigation.push(SCREEN_NAMES.MeetingInitializer, {
                meetingConfig: {
                  meetingId: meetingId,
                  token,
                  videoOn,
                  micOn,
                },
              });
            }}
          />
        </View>
      </>
    </SafeAreaView>
  );
}
