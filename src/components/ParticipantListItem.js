/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, Text } from "react-native";
import Avatar from "./Avatar";
import { convertRFValue } from "../styles/spacing";
import { Colors } from "../styles";
import {
  RaiseHand,
  MicOn,
  VideoEnable,
  MicOff,
  VideoDisable,
} from "../assets/icons";
import { useParticipant } from "@videosdk.live/react-native-sdk";

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.participantId === nextProps.participantId &&
    prevProps.raisedHand === nextProps.raisedHand
  );
};
function ParticipantListItem({ participantId, raisedHand }) {
  const onStreamEnabled = (stream) => {};
  const onStreamDisabled = (stream) => {};

  const { displayName, webcamOn, micOn, isLocal } = useParticipant(
    participantId,
    {
      onStreamEnabled,
      onStreamDisabled,
    }
  );

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        marginTop: 8,
        borderRadius: 6,
        backgroundColor: "#3D3C4E",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          fullName={displayName}
          style={{
            height: 40,
            aspectRatio: 1,
            borderRadius: 3,
          }}
        />
        <View
          style={{
            height: 40,
            marginLeft: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: convertRFValue(14), color: Colors.WHITE }}>
            {isLocal ? "You" : displayName || ""}
          </Text>
          {isLocal ? (
            <Text
              style={{
                fontSize: convertRFValue(10),
                color: "#9FA0A7",
              }}
            >
              Host 
            </Text>
          ) : null}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {raisedHand ? (
          <View
            style={{
              height: 30,
              aspectRatio: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RaiseHand width={20} height={20} fill={Colors.WHITE} />
          </View>
        ) : null}
        {/* <View
          style={{
            height: 30,
            aspectRatio: 1,
            borderWidth: 1,
            borderColor: "rgba(245,245,245, 0.2)",
            marginLeft: 8,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 16,
          }}
        >
          <Pin />
        </View> */}
        <View
          style={{
            height: 30,
            aspectRatio: 1,
            borderWidth: micOn ? 1 : 0,
            backgroundColor: micOn ? "transparent" : Colors.RED,
            borderColor: "rgba(245,245,245, 0.2)",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 8,
            borderRadius: 16,
          }}
        >
          {micOn ? (
            <MicOn width={16} height={16} />
          ) : (
            <MicOff width={16} height={16} fill={Colors.WHITE} />
          )}
        </View>
        <View
          style={{
            height: 30,
            aspectRatio: 1,
            borderWidth: webcamOn ? 1 : 0,
            borderColor: "rgba(245,245,245, 0.2)",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 8,
            borderRadius: 16,
            backgroundColor: webcamOn ? "transparent" : Colors.RED,
          }}
        >
          {webcamOn ? (
            <VideoEnable height={16} width={16} fill={Colors.WHITE} />
          ) : (
            <VideoDisable width={22} height={22} fill={Colors.WHITE} />
          )}
        </View>
      </View>
    </View>
  );
}
export default React.memo(ParticipantListItem, areEqual);
