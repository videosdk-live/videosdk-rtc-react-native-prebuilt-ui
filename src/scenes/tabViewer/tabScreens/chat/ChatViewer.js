import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  KeyboardAvoidingView,
  useWindowDimensions,
  Platform,
  Keyboard,
  Linking,
  Dimensions,
} from "react-native";
import { Colors } from "../../../../styles";
import { ROBOTO_FONTS } from "../../../../styles/fonts";
import { convertRFValue, useStandardHeight } from "../../../../styles/spacing";
import ChatTextInput from "../../../../components/ChatTextInput";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import Hyperlink from "react-native-hyperlink";
import moment from "moment";
const ChatViewer = ({ containerStyle }) => {
  const mMeeting = useMeeting({
    onChatMessage: scrollToBottom,
  });
  const localParticipantId = mMeeting?.localParticipant?.id;
  const messages = mMeeting?.messages;
  const sendChatMessage = mMeeting?.sendChatMessage;

  const [message, setMessage] = useState("");

  const flatListRef = React.useRef();
  // const isChatVisible = messages && messages.length > 0;
  const [isSending, setIsSending] = useState(false);
  // const [keyboardVisible, setKeyboardVisible] = useState(false);

  // const orientationHeight = isLandscape
  //   ? useStandardHeight(30)
  //   : useStandardHeight(5);

  const sendMessage = () => {
    const data = {
      type: "CHAT",
      data: {
        message,
      },
    };
    sendChatMessage(JSON.stringify(data));
    setMessage("");
    scrollToBottom();
  };

  const scrollToBottom = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     "keyboardWillShow",
  //     () => {
  //       setKeyboardVisible(true); // or some other action
  //     }
  //   );
  //   const keyboardDidHideListener = Keyboard.addListener(
  //     "keyboardWillHide",
  //     () => {
  //       setKeyboardVisible(false); // or some other action
  //     }
  //   );

  //   return () => {
  //     keyboardDidHideListener.remove();
  //     keyboardDidShowListener.remove();
  //   };
  // }, []);

  return (
    <View
      style={{
        ...containerStyle,
        backgroundColor: Colors.BLUE_MAGENTA,
      }}
    >
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "android" ? undefined : "position"}
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => {
            const { senderId, senderName, text, timestamp } = item;
            const localSender = localParticipantId === senderId;
            const message = JSON.parse(text)?.data.message;
            const type = JSON.parse(text)?.type;
            const time = moment(timestamp).format("hh:mm a");
            if (type === "CHAT") {
              return (
                <View
                  key={i}
                  style={{
                    alignItems: localSender ? "flex-end" : "flex-start",
                    paddingHorizontal: 12,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#3D3C4E",
                      padding: 12,
                      marginVertical: 6,
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: convertRFValue(12),
                        fontFamily: ROBOTO_FONTS.RobotoRegular,
                        color: Colors.WHITE_OPACITY_50,
                        fontWeight: "bold",
                      }}
                    >
                      {localSender ? "You" : senderName}
                    </Text>
                    <Hyperlink
                      linkDefault={true}
                      onPress={(url) => Linking.openURL(url)}
                      linkStyle={{ color: Colors.CYAN_BLUE }}
                    >
                      <Text
                        style={{
                          fontSize: convertRFValue(14),
                          color: Colors.WHITE,
                          fontFamily: ROBOTO_FONTS.RobotoRegular,
                        }}
                      >
                        {message}
                      </Text>
                    </Hyperlink>
                    <Text
                      style={{
                        color: "grey",
                        fontSize: convertRFValue(8),
                        fontFamily: ROBOTO_FONTS.RobotoItalic,
                        alignSelf: "flex-end",
                        marginTop: 4,
                      }}
                    >
                      {time}
                    </Text>
                  </View>
                </View>
              );
            } else {
              return <></>;
            }
          }}
          keyExtractor={(item, index) => `${index}_message_list`}
          style={{
            marginVertical: 5,
          }}
        />
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: Colors.GREY_OPACITY_20,
            // marginBottom:
            //   keyboardVisible && Platform.OS == "ios"
            //     ? vertical_140
            //     : orientationHeight,
          }}
        >
          <ChatTextInput
            message={message}
            setMessage={setMessage}
            isSending={isSending}
            sendMessage={sendMessage}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default ChatViewer;
