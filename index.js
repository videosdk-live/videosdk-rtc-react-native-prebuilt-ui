import { AppRegistry, StatusBar } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { register } from "@videosdk.live/react-native-sdk";
import { Colors } from "./src/styles";
StatusBar.setBackgroundColor(Colors.DARK_BACKGROUND);
register();

AppRegistry.registerComponent(appName, () => App);
