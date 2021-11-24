import React from "react";
import { ActionSheet, Button } from "react-native-ui-lib";
import { Colors, Spacing } from "../../../styles";
import { View, TextInput } from "react-native";
import { ROBOTO_FONTS } from "../../../styles/fonts";
import { useStandardHeight } from "../../../styles/spacing";
import { VideoEnable, Keyboard } from "../../../assets/icons";
import { createMeeting, getToken } from "../../../config/api";
import { SCREEN_NAMES } from "../../../navigators/screenNames";
import { useNavigation } from "@react-navigation/native";
export default function StartorJoinMeetingActionSheet({
  setvisible,
  visible,
  navigateToMeeting,
  setmeetingId,
  meetingId,
}) {
  const vertical_16 = useStandardHeight(12);
  const vertical_36 = useStandardHeight(36);
  const navigation = useNavigation();

  const VideoEnableIcon = () => {
    return <VideoEnable fill={Colors.WHITE} height={22} width={22} />;
  };

  const startMeeting = async () => {
    const token = await getToken();
    const meetingId = await createMeeting(token);
    if (meetingId) {
      setvisible(false);
      navigation.navigate(SCREEN_NAMES.MeetingInfo, {
        meetingId,
        token,
      });
    }
  };
  return (
    <ActionSheet
      containerStyle={{
        backgroundColor: Colors.WHITE,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 20,
      }}
      dialogStyle={{ backgroundColor: "transparent" }}
      renderAction={() => {
        return (
          <View>
            <Button
              iconSource={VideoEnableIcon}
              borderRadius={4}
              size={Button.sizes.large}
              label={"Start an instant meeting"}
              style={{
                height: vertical_36,
                marginVertical: 12,
                justifyContent: "flex-start",
              }}
              labelStyle={{
                fontSize: Spacing.convertRFValue(14),
                color: Colors.WHITE,
                fontFamily: ROBOTO_FONTS.RobotoMedium,
                marginLeft: vertical_16,
              }}
              onPress={startMeeting}
              backgroundColor={Colors.CYAN_BLUE}
            />
          </View>
        );
      }}
      visible={visible}
      options={[{}]}
      onDismiss={() => {
        setvisible(false);
      }}
    />
  );
}
