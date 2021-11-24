import React, { useMemo } from "react";
import ParticipantListItem from "../../../../components/ParticipantListItem";
import { FlatList, View } from "react-native";
import { useMeeting } from "@videosdk.live/react-native-sdk";
import { LoaderScreen } from "react-native-ui-lib";
import { Colors } from "../../../../styles";
import { useMeetingAppContext } from "../../../../context/MeetingAppContextDef";
function ParticipantsViewer({ height }) {
  const { participants } = useMeeting();
  const { raisedHandsParticipants } = useMeetingAppContext();

  const sortedRaisedHandsParticipants = useMemo(() => {
    const participantIds = [...participants.keys()];
    const notRaised = participantIds.filter(
      (pID) =>
        raisedHandsParticipants.findIndex(
          ({ participantId: rPID }) => rPID === pID
        ) === -1
    );
    const raisedSorted = raisedHandsParticipants.sort((a, b) => {
      if (a.raisedHandOn > b.raisedHandOn) {
        return -1;
      }
      if (a.raisedHandOn < b.raisedHandOn) {
        return 1;
      }
      return 0;
    });
    const combined = [
      ...raisedSorted.map(({ participantId: p }) => ({
        raisedHand: true,
        participantId: p,
      })),
      ...notRaised.map((p) => ({ raisedHand: false, participantId: p })),
    ];
    return combined;
  }, [raisedHandsParticipants, participants]);

  return (
    <View
      style={{
        paddingHorizontal: 12,
        height: height,
        backgroundColor: Colors.BLUE_MAGENTA,
      }}
    >
      {sortedRaisedHandsParticipants &&
      sortedRaisedHandsParticipants.length > 0 ? (
        <FlatList
          data={sortedRaisedHandsParticipants}
          keyExtractor={(item) => `${item.participantId}_participant`}
          style={{ marginBottom: 4 }}
          renderItem={({ item }) => {
            return (
              <ParticipantListItem
                participantId={item.participantId}
                raisedHand={item.raisedHand}
              />
            );
          }}
        />
      ) : (
        <LoaderScreen
          color={Colors.WHITE}
          message="Loading Participants..."
          messageStyle={{ color: Colors.WHITE }}
        />
      )}
    </View>
  );
}

export default ParticipantsViewer;
