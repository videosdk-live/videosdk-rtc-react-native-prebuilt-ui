import React from "react";
import { StatusBar, SafeAreaView } from "react-native";
import { MeetingProvider } from "@videosdk.live/react-native-sdk";
import MeetingViewer from "../meetingViewer";
import { MeetingAppProvider } from "../../context/MeetingAppContextDef";
import { Colors } from "../../styles";
import { LoaderScreen } from "react-native-ui-lib";
import { useRoute } from "@react-navigation/native";

export default function MeetingInitializer() {
  const route = useRoute();
  const { meetingId, videoOn, micOn, token } = route?.params?.meetingConfig;

  return token ? (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.DARK_BACKGROUND }}>
      <StatusBar
        backgroundColor={Colors.DARK_BACKGROUND}
        barStyle="dark-content"
      />
      <MeetingAppProvider {...{ redirectOnLeave: "" }}>
        <MeetingProvider
          config={{
            meetingId,
            micEnabled: micOn,
            webcamEnabled: videoOn,
            name: "Demo User",
            notification: {
              title: "Video SDK Meeting",
              message: "Meeting is running.",
            },
          }}
          token={token}
        >
          <MeetingViewer videoOn={videoOn} />
        </MeetingProvider>
      </MeetingAppProvider>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.DARK_BACKGROUND }}>
      <LoaderScreen
        color={Colors.WHITE}
        message="Joining..."
        messageStyle={{ color: Colors.WHITE }}
      />
    </SafeAreaView>
  );
}
