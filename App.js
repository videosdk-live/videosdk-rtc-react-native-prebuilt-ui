import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import linking from "./src/navigators/linking";
import SplashScreen from "./src/scenes/splash/SplashScreen";
import { SCREEN_NAMES } from "./src/navigators/screenNames";

import MeetingInfoScreen from "./src/scenes/meetingInfo";
import MeetingInitializerScreen from "./src/scenes/meetingInitializer";
import UpcomingMeetingScreen from "./src/scenes/upcomingMeeting";

import { Colors } from "./src/styles";
import { convertRFValue } from "./src/styles/spacing";
import { ROBOTO_FONTS } from "./src/styles/fonts";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

const RootStack = createStackNavigator();

export default function App() {
  const [splashVisible, setsplashVisible] = useState(true);

  useEffect(async () => {
    setTimeout(() => {
      setsplashVisible(false);
    }, 1000);
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <RootStack.Navigator
        mode="modal"
        screenOptions={{
          animationEnabled: false,
        }}
        initialRouteName={SCREEN_NAMES.MeetingInfo}
      >
        <RootStack.Screen
          name={SCREEN_NAMES.UpcomingMeeting}
          component={UpcomingMeetingScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name={SCREEN_NAMES.MeetingInfo}
          component={MeetingInfoScreen}
          options={{
            headerStyle: {
              backgroundColor: Colors.BLUE_MAGENTA,
            },
            title: "Meeting",
            headerTitleStyle: {
              fontSize: convertRFValue(16),
              fontFamily: ROBOTO_FONTS.RobotoMedium,
              color: Colors.WHITE,
            },
            headerTintColor: "white",
          }}
        />

        <RootStack.Screen
          name={SCREEN_NAMES.MeetingInitializer}
          component={MeetingInitializerScreen}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
