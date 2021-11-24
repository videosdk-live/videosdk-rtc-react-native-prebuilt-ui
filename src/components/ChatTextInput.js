import React from "react";
import { Button } from "react-native-ui-lib";
import { Emoji, Send } from "../assets/icons";
import { Colors } from "../styles";
import { View, TextInput } from "react-native";
import { useStandardHeight } from "../styles/spacing";

export default function ChatTextInput({ sendMessage, setMessage, message }) {
  const vertical_40 = useStandardHeight(40);
  const textInput = () => {
    return (
      <View
        style={{
          height: vertical_40,
          flexDirection: "row",
          backgroundColor: Colors.BLUE_MAGENTA,
        }}
      >
        <View style={{ flexDirection: "row", flex: 2 }}>
          {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Button
              size={Button.sizes.small}
              avoidMinWidth
              avoidInnerPadding
              borderRadius={6}
              onPress={() => {}}
              style={{
                height: 30,
                aspectRatio: 1,
                marginHorizontal: 4,
                backgroundColor: Colors.BLUE_MAGENTA,
              }}
            >
              <Emoji fill="#FFF" />
            </Button>
          </View> */}
          <TextInput
            multiline
            value={message}
            placeholder={"Write your Message"}
            style={{ flex: 1, color: Colors.WHITE, marginLeft: 12 }}
            numberOfLines={2}
            onChangeText={setMessage}
            selectionColor={Colors.CYAN_BLUE}
            placeholderTextColor={"#9FA0A7"}
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Button
            size={Button.sizes.small}
            avoidMinWidth
            avoidInnerPadding
            borderRadius={6}
            onPress={sendMessage}
            style={{
              height: 30,
              aspectRatio: 1,
              marginHorizontal: 8,
              backgroundColor: Colors.CYAN_BLUE,
            }}
          >
            <Send fill="#FFF" />
          </Button>
        </View>
      </View>
    );
  };

  return <>{textInput()}</>;
}
