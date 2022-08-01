import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Animated,
  useWindowDimensions,
  BackHandler,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Colors } from "../../styles";
import { Button, ActionSheet, LoaderScreen } from "react-native-ui-lib";
import { convertRFValue } from "../../styles/spacing";
import { Close, KeyboardArrowUp } from "../../assets/icons";
import { ROBOTO_FONTS } from "../../styles/fonts";
import {
  useMeeting,
  ReactNativeForegroundService,
} from "@videosdk.live/react-native-sdk";
import ParticipantPresenter from "../../components/ParticipantPresenter";
import LocalParticipantPresenter from "../../components/LocalParticipantPresenter";
import ModalViewer from "../tabViewer/ModalViewer";
import BottomMeetingViewer from "../../components/BottomMeetingViewer";
import ParticipantsViewer from "../tabViewer/tabScreens/participants/ParticipantsViewer";
import ChatViewer from "../tabViewer/tabScreens/chat/ChatViewer";
import HeaderMeetingViewer from "../../components/HeaderMeetingViewer";
import Snackbar from "react-native-snackbar";
import { json_verify } from "../../utils/common";
import useSortActiveParticipants from "../../utils/useSortActiveParticipants";
import ActiveParticipantsGrid from "../../components/ActiveParticipantsGrid";
import { useNavigation, CommonActions } from "@react-navigation/native";
import useRaisedHandParticipants from "../../utils/useRaisedHandParticipants";
import { useMeetingAppContext } from "../../context/MeetingAppContextDef";
import { SCREEN_NAMES } from "../../navigators/screenNames";

export const TAB_COMPONENT_MODES = {
  CHAT: "CHAT",
  PARTICIPANTS: "PARTICIPANTS",
};

export default function MeetingViewer({ videoOn }) {
  const [visibleTabViewerModal, setvisibleTabViewerModal] = useState(false);
  const [tabIndex, settabIndex] = useState(0);

  const [currentTabModes, setCurrentTabModes] = useState("");
  const [bottomVisible, setBottomVisible] = useState(false);
  const [localParticipantAllowedJoin, setLocalParticipantAllowedJoin] =
    useState(null);

  const bottomVisibleRef = useRef();
  const visibleTabViewerModalRef = useRef();
  const mMeetingRef = useRef();

  bottomVisibleRef.current = bottomVisible;
  visibleTabViewerModalRef.current = visibleTabViewerModal;

  const { isLandscape } = useMeetingAppContext();

  const navigation = useNavigation();

  useSortActiveParticipants();

  const { participantRaisedHand } = useRaisedHandParticipants();

  const bottomRef = useRef();

  const _handleChatMessage = (data, localParticipantId) => {
    const { senderId, senderName, text } = data;
    const isLocal = senderId === localParticipantId;

    const isVisible =
      bottomVisibleRef.current || visibleTabViewerModalRef.current;

    if (json_verify(text)) {
      const { type, data } = JSON.parse(text);
      if (type === "CHAT") {
        if (!isVisible) {
          const text = `${senderName} says: ${data.message}`;
          showSnackBar({ text });
        }
      }
      if (type === "RAISE_HAND") {
        const text = `${isLocal ? "You" : senderName} raised hand 🖐🏼`;
        showSnackBar({ text });
        participantRaisedHand(senderId);
      }
    }
  };

  function onEntryResponded(participantId, decision) {
    if (mMeetingRef.current?.localParticipant?.id === participantId) {
      if (decision === "allowed") {
        setLocalParticipantAllowedJoin(true);
      } else {
        setLocalParticipantAllowedJoin(false);
        setTimeout(() => {
          exitMeeting();
        }, 3000);
      }
    }
  }

  const mMeeting = useMeeting({
    onChatMessage: (d) =>
      _handleChatMessage(d, mMeetingRef.current?.localParticipant?.id),
    onEntryResponded: (participantId, decision) =>
      onEntryResponded(participantId, decision),
  });

  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  const disableScreenShare = mMeeting?.disableScreenShare;
  const join = mMeeting?.join;
  const leave = mMeeting?.leave;
  const changeWebcam = mMeeting?.changeWebcam;
  const localScreenShareOn = mMeeting?.localScreenShareOn;
  const presenterId = mMeeting?.presenterId;
  const participants = mMeeting?.participants;

  const animeVal = new Animated.Value(1);

  const exitMeeting = () => {
    leave();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: SCREEN_NAMES.UpcomingMeeting }],
      })
    );
  };

  const backAlert = () => {
    Alert.alert("Confirm Exit", "Are you sure you want to exit ? ", [
      {
        style: "cancel",
        onPress: () => {
          exitMeeting();
        },
        text: "Yes",
      },
      {
        style: "default",
        text: "No",
        onPress: () => {},
      },
    ]);
  };

  const onHardwareBackPress = () => {
    backAlert();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onHardwareBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onHardwareBackPress);
    };
  }, []);

  useEffect(() => {
    if (currentTabModes.length > 0) {
      setBottomVisible(true);
    }
  }, [currentTabModes]);

  const participantsArrId = [...participants.keys()];

  const partiCipantLength =
    participantsArrId && participantsArrId.length
      ? participantsArrId.length
      : 1;

  const actionSheetTitle =
    currentTabModes === TAB_COMPONENT_MODES.PARTICIPANTS
      ? `Participants (${partiCipantLength})`
      : "Chats";

  const showSnackBar = ({ text }) => {
    Snackbar.show({
      text,
      duration: Snackbar.LENGTH_LONG,
      action: {
        text: "OK",
        textColor: "green",
        onPress: () => {
          Snackbar.dismiss();
        },
      },
    });
  };

  const partCipantIDArr = [...participants.keys()];
  const filterPartCipantIDArr = partCipantIDArr.filter((item, index) => {
    return index <= 1;
  });

  useEffect(() => {
    setTimeout(() => {
      StatusBar.setHidden(true);
      join();
      videoOn && changeWebcam();
    }, 1000);

    return () => {
      StatusBar.setHidden(false);
      ReactNativeForegroundService.stop();
      leave();
    };
  }, []);

  const isBarsVisible = useRef();

  const hideBars = () => {
    Animated.timing(animeVal, {
      toValue: 0,
      duration: 250,
    }).start(() => {
      isBarsVisible.current = false;
    });
  };

  const showBars = () => {
    Animated.timing(animeVal, {
      toValue: 1,
      duration: 250,
    }).start(() => {
      isBarsVisible.current = true;
    });
  };
  const toggleBars = () => {
    if (isBarsVisible.current) {
      hideBars();
    } else {
      showBars();
    }
    bottomRef.current.hideMoreIcons();
  };

  const dismissSheet = () => {
    setBottomVisible(false);
    setCurrentTabModes("");
  };

  const height = useWindowDimensions().height / 2;

  return typeof localParticipantAllowedJoin === "boolean" ? (
    localParticipantAllowedJoin ? (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.DARK_BACKGROUND,
        }}
      >
        {presenterId && isLandscape ? null : (
          <HeaderMeetingViewer
            setCurrentTabModes={setCurrentTabModes}
            animeVal={animeVal}
            exitMeeting={exitMeeting}
          />
        )}
        {presenterId && !localScreenShareOn ? (
          <ParticipantPresenter
            presenterId={presenterId}
            partCipantIDArr={filterPartCipantIDArr}
            presstoHide={toggleBars}
          />
        ) : presenterId && localScreenShareOn ? (
          <LocalParticipantPresenter
            toggleBars={toggleBars}
            localPresenterId={presenterId}
            disableScreenShare={disableScreenShare}
          />
        ) : (
          <ActiveParticipantsGrid
            toggleBars={toggleBars}
            isLandscape={isLandscape}
          />
        )}
        {presenterId && isLandscape ? null : (
          <BottomMeetingViewer
            setCurrentTabModes={setCurrentTabModes}
            currentTabModes={currentTabModes}
            isLandscape={isLandscape}
            showSnackBar={showSnackBar}
            animeVal={animeVal}
            ref={bottomRef}
            exitMeeting={exitMeeting}
          />
        )}

        <ModalViewer
          visibleTabViewerModal={visibleTabViewerModal}
          setvisibleTabViewerModal={setvisibleTabViewerModal}
          tabIndex={tabIndex}
          partCipantIDArr={partCipantIDArr}
          currentTabModes={currentTabModes}
          setCurrentTabModes={setCurrentTabModes}
        />

        <ActionSheet
          containerStyle={{
            backgroundColor: Colors.BLUE_MAGENTA,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
          dialogStyle={{ backgroundColor: "transparent" }}
          renderTitle={() => (
            <View
              style={{
                justifyContent: "space-between",
                height: 50,
                borderBottomWidth: 1,
                borderBottomColor: Colors.GREY_OPACITY_20,
              }}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  padding: 14,
                }}
              >
                <Button
                  size={Button.sizes.small}
                  avoidMinWidth
                  avoidInnerPadding
                  onPress={() => {
                    settabIndex(
                      currentTabModes === TAB_COMPONENT_MODES.CHAT ? 1 : 0
                    );
                    setvisibleTabViewerModal(true);
                    setTimeout(() => {
                      dismissSheet();
                    }, 500);
                  }}
                  style={{
                    height: 25,
                    aspectRatio: 1,
                    marginHorizontal: 4,
                    backgroundColor: Colors.GREY_OPACITY_20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <KeyboardArrowUp fill={Colors.WHITE} />
                </Button>
                <Text
                  style={{
                    fontSize: convertRFValue(14),
                    color: Colors.WHITE,
                    fontFamily: ROBOTO_FONTS.RobotoMedium,
                  }}
                >
                  {actionSheetTitle}
                </Text>

                <Button
                  size={Button.sizes.small}
                  avoidMinWidth
                  avoidInnerPadding
                  borderRadius={6}
                  onPress={dismissSheet}
                  style={{
                    height: 30,
                    aspectRatio: 1,
                    backgroundColor: Colors.BLUE_MAGENTA,
                  }}
                >
                  <Close fill={"#9FA0A7"} />
                </Button>
              </View>
            </View>
          )}
          renderAction={() => {
            return currentTabModes === TAB_COMPONENT_MODES.PARTICIPANTS ? (
              <ParticipantsViewer height={height} />
            ) : (
              <ChatViewer
                isLandscape={isLandscape}
                containerStyle={{ height }}
              />
            );
          }}
          visible={bottomVisible}
          options={[{}]}
          onDismiss={dismissSheet}
        />
      </SafeAreaView>
    ) : (
      <LoaderScreen
        color={Colors.WHITE}
        message="Entry denied!"
        messageStyle={{ color: Colors.WHITE }}
      />
    )
  ) : (
    <LoaderScreen
      color={Colors.WHITE}
      message="Waiting to join..."
      messageStyle={{ color: Colors.WHITE }}
    />
  );
}
