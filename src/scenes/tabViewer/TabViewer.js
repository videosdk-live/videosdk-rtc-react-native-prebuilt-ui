import React, { useEffect } from "react";
import { Colors } from "../../styles";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { useStandardHeight } from "../../styles/spacing";
import { View, SafeAreaView, useWindowDimensions } from "react-native";
import { Button, LoaderScreen } from "react-native-ui-lib";
import { KeyboardArrowLeft } from "../../assets/icons";
import ChatViewer from "./tabScreens/chat/ChatViewer";
import { ROBOTO_FONTS } from "../../styles/fonts";
import ParticipantsViewer from "./tabScreens/participants/ParticipantsViewer";

export default function TabViewer({ setvisibleTabViewerModal, tabIndex }) {
  const layout = useWindowDimensions();

  const vertical_46 = useStandardHeight(42);

  const ChatRoute = () => <ChatViewer containerStyle={{ flex: 1 }} />;

  const ParticipantListRoute = () => (
    <ParticipantsViewer height={layout.height} />
  );

  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    setIndex(tabIndex);
  }, [tabIndex]);

  const [routes] = React.useState([
    { key: "participants", title: "Participants" },
    { key: "chat", title: "Chat" },
  ]);

  const renderScene = SceneMap({
    participants: ParticipantListRoute,
    chat: ChatRoute,
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabView
        renderTabBar={(tabBarProps) => {
          return (
            <View
              style={{
                height: vertical_46,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  height: vertical_46,
                  backgroundColor: Colors.BLUE_MAGENTA,
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 10,
                }}
              >
                <Button
                  round
                  size={Button.sizes.large}
                  onPress={() => {
                    setvisibleTabViewerModal(false);
                  }}
                  backgroundColor={Colors.BLUE_MAGENTA}
                >
                  <KeyboardArrowLeft />
                </Button>
              </View>
              <TabBar
                {...tabBarProps}
                activeColor={Colors.WHITE}
                inactiveColor={"#9FA0A7"}
                labelStyle={{
                  textTransform: "capitalize",
                  fontFamily: ROBOTO_FONTS.RobotoMedium,
                }}
                style={{
                  height: vertical_46,
                  width: layout.width - 40,
                  backgroundColor: Colors.BLUE_MAGENTA,
                  justifyContent: "center",
                  elevation: 10,
                }}
                indicatorStyle={{
                  backgroundColor: Colors.CYAN_BLUE,
                  height: 4,
                  borderRadius: 12,
                }}
              />
            </View>
          );
        }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        lazy
        renderLazyPlaceholder={() => (
          <LoaderScreen
            color={Colors.WHITE}
            message="Loading..."
            messageStyle={{ color: Colors.WHITE }}
          />
        )}
      />
    </SafeAreaView>
  );
}
