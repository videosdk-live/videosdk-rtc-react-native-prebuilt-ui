import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../styles";
import { convertRFValue } from "../../styles/spacing";
import { ROBOTO_FONTS } from "../../styles/fonts";
import UpcomingMeetingList from "./components/UpcomingMeetingList";
import moment from "moment";
import StartorJoinMeetingActionSheet from "./components/StartorJoinMeetingActionSheet";
import { SCREEN_NAMES } from "../../navigators/screenNames";
import Avatar from "../../components/Avatar";
import { handleLinking } from "../../utils/common";

export default function UpComingMeeting({ navigation }) {
  const [visible, setvisible] = useState(false);
  const [meetingId, setmeetingId] = useState("");

  const currTS = new Date();
  const currTime = moment(currTS).format("hh:mm A");
  const currDate = moment(currTS).format("dddd, D MMMM  YYYY");

  const _handleLinkingListner = ({ url }) => {
    const { meetingId, domain } = handleLinking({ url });
    navigation.navigate(SCREEN_NAMES.MeetingInfo, {
      meetingId,
      domain,
    });
  };

  useEffect(() => {
    Linking.addEventListener("url", _handleLinkingListner);
    return () => {
      Linking.removeEventListener("url", _handleLinkingListner);
    };
  }, []);

  const navigateToMeeting = () => {
    setvisible(false);
    let meetingID = "";
    if (meetingId.includes("/")) {
      meetingID = meetingId.split("/")[4];
    } else {
      meetingID = meetingId;
    }

    navigation.push(SCREEN_NAMES.MeetingInfo, {
      meetingId: meetingID,
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F6FF" }}>
      <View
        style={{
          padding: 16,
          paddingHorizontal: 12,
          backgroundColor: Colors.WHITE,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          elevation: 8,
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: convertRFValue(16),
            fontFamily: ROBOTO_FONTS.RobotoRegular,
          }}
        >
          Hi, VideoSDK.Live
        </Text>
        <TouchableOpacity>
          <Avatar
            fullName={"VideoSDK"}
            style={{
              height: 36,
              aspectRatio: 1,
              borderRadius: 4,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, marginTop: 16 }}>
        <View
          style={{
            marginHorizontal: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: Colors.WHITE,
              padding: 12,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 8,
              borderRadius: 10,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: convertRFValue(20),
                  color: Colors.BLACK,
                  fontFamily: ROBOTO_FONTS.RobotoBold,
                }}
              >
                {currTime}
              </Text>
              <Text
                style={{
                  fontSize: convertRFValue(10),
                  color: Colors.DARK_BLUE_OPACITY_30,
                  fontFamily: ROBOTO_FONTS.RobotoBold,
                }}
              >
                {currDate}
              </Text>
            </View>

            <Image
              source={require("../../assets/icons/abstract-illustration.png")}
            />
          </View>
        </View>
        <UpcomingMeetingList setvisible={setvisible} />
      </View>
      <StartorJoinMeetingActionSheet
        visible={visible}
        setvisible={setvisible}
        setmeetingId={setmeetingId}
        meetingId={meetingId}
        navigateToMeeting={navigateToMeeting}
      />
    </SafeAreaView>
  );
}
