import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  View,
  Animated,
  TouchableOpacity,
  AlertIOS,
  Platform,
  ToastAndroid,
} from "react-native";
import { Button } from "react-native-ui-lib";
import { Colors } from "../styles";
import {
  CallEnd,
  MicOn,
  MicOff,
  VideoEnable,
  VideoDisable,
  ChatEnable,
  Close,
  More,
  RaiseHand,
  ScreenShare,
} from "../assets/icons";
import MeetingControlsTouchable from "./MeetingControlsTouchable";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import { TAB_COMPONENT_MODES } from "../scenes/meetingViewer";

const BottomMeetingViewer = forwardRef(
  ({ setCurrentTabModes, currentTabModes, animeVal, exitMeeting }, ref) => {
    const [isVisibleMoreIcons, setisVisibleMoreIcons] = useState(false);

    const {
      localMicOn,
      localWebcamOn,
      sendChatMessage,
      toggleMic,
      toggleWebcam,
      toggleScreenShare,
      presenterId,
    } = useMeeting({});
    const moreIconContainerVal = new Animated.Value(0);
    const moreIconContainerValRef = useRef(moreIconContainerVal);

    const isIconsVisible = useRef();

    const hideIcons = () => {
      Animated.timing(moreIconContainerValRef.current, {
        toValue: 0,
        duration: 300,
      }).start(() => {
        isIconsVisible.current = false;

        setisVisibleMoreIcons(false);
      });
    };

    const showIcons = () => {
      Animated.timing(moreIconContainerValRef.current, {
        toValue: 1,
        duration: 300,
      }).start(() => {
        isIconsVisible.current = true;

        setisVisibleMoreIcons(true);
      });
    };

    const toggleMoreIcons = () => {
      if (isIconsVisible.current) {
        hideIcons();
      } else {
        showIcons();
      }
    };

    useImperativeHandle(ref, () => ({
      hideMoreIcons() {
        if (isIconsVisible.current) {
          hideIcons();
        }
      },
    }));

    const AnimatedIcon = ({ Icon, onPress }) => {
      const height = moreIconContainerValRef.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 40],
      });
      const width = moreIconContainerValRef.current.interpolate({
        inputRange: [0, 0.000001, 1],
        outputRange: [0, 40, 40],
      });
      return (
        <Animated.View
          style={{
            height,
            width,
            backgroundColor: Colors.WHITE,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 6,
            marginVertical: 4,
          }}
        >
          <TouchableOpacity activeOpacity={1} onPress={onPress}>
            <Icon />
          </TouchableOpacity>
        </Animated.View>
      );
    };

    return (
      <>
        <Animated.View
          style={{
            transform: [
              {
                translateY: animeVal.interpolate({
                  inputRange: [0, 1],
                  outputRange: [60, 0],
                }),
              },
            ],
            height: animeVal.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 60],
            }),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              height: 60,
            }}
          >
            <Button
              size={Button.sizes.small}
              avoidMinWidth
              avoidInnerPadding
              borderRadius={8}
              onPress={exitMeeting}
              style={{ height: 46, aspectRatio: 1, marginHorizontal: 8 }}
              backgroundColor={Colors.RED}
            >
              <CallEnd height={30} width={30} fill="#FFF" />
            </Button>
            <MeetingControlsTouchable
              outlineWidth={1}
              outline
              outlineColor={Colors.WHITE_OPACITY_20}
              borderRadius={8}
              bgColor={localMicOn ? Colors.WHITE_OPACITY_20 : "transparent"}
              onPress={toggleMic}
              Icon={() => {
                return localMicOn ? (
                  <MicOn width={20} height={20} />
                ) : (
                  <MicOff width={20} height={20} fill="#FFF" />
                );
              }}
            />
            <MeetingControlsTouchable
              outlineWidth={1}
              outline
              outlineColor={Colors.WHITE_OPACITY_20}
              bgColor={localWebcamOn ? Colors.WHITE_OPACITY_20 : "transparent"}
              onPress={toggleWebcam}
              borderRadius={8}
              Icon={() => {
                return localWebcamOn ? (
                  <VideoEnable height={20} width={20} fill={Colors.WHITE} />
                ) : (
                  <VideoDisable width={28} height={28} fill={Colors.WHITE} />
                );
              }}
            />
            <MeetingControlsTouchable
              outlineWidth={1}
              outline
              outlineColor={Colors.WHITE_OPACITY_20}
              onPress={() => {
                setCurrentTabModes(TAB_COMPONENT_MODES.CHAT);
              }}
              borderRadius={8}
              bgColor={"transparent"}
              Icon={() => {
                return <ChatEnable fill={Colors.WHITE} />;
              }}
            />
            <MeetingControlsTouchable
              outlineWidth={1}
              outline
              outlineColor={Colors.WHITE_OPACITY_20}
              onPress={toggleMoreIcons}
              borderRadius={8}
              bgColor={isVisibleMoreIcons ? Colors.WHITE : "transparent"}
              Icon={() => {
                return isVisibleMoreIcons ? (
                  <Close height={20} width={20} fill={Colors.DARK_BACKGROUND} />
                ) : (
                  <More />
                );
              }}
            />
          </View>
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            height: moreIconContainerValRef.current.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 40],
            }),
            right: 0,
            left: 0,
            bottom: moreIconContainerValRef.current.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 130],
            }),
            flex: 1,
            alignItems: "center",
            paddingLeft: 46 * 5.3,
          }}
        >
          <AnimatedIcon
            onPress={() => {
              sendChatMessage(JSON.stringify({ type: "RAISE_HAND", data: {} }));
              toggleMoreIcons();
            }}
            Icon={() => {
              return (
                <Animated.View
                  style={{
                    height: moreIconContainerValRef.current.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 24],
                    }),
                    aspectRatio: 1,
                  }}
                >
                  <RaiseHand fill={"#212302"} />
                </Animated.View>
              );
            }}
          />
          {Platform.OS === "android" ? <AnimatedIcon
            Icon={() => {
              return (
                <Animated.View
                  style={{
                    height: moreIconContainerValRef.current.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 28],
                    }),
                    aspectRatio: 1,
                  }}
                >
                  <ScreenShare fill={"#212302"} />
                </Animated.View>
              );
            }}
            onPress={() => {
              if (!!presenterId) {
                const message = "Screen share is already running...";
                if (Platform.OS === "android") {
                  ToastAndroid.show(message, ToastAndroid.LONG);
                } else {
                  AlertIOS.alert(message);
                }
              } else {
                if (Platform.OS === "android") {
                  toggleScreenShare();
                  toggleMoreIcons();
                } else {
                  AlertIOS.alert("Currently Screen share feature is not supported in IOS");
                }

              }
            }}
          /> : null}
        </Animated.View>
      </>
    );
  }
);

export default BottomMeetingViewer;
