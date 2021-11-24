import React from "react";
import { View } from "react-native";
import ParticipantView from "./ParticipantView";
import {
  getGridRowsAndColumns,
  getGridForMainParticipants,
  calcQuality,
} from "../utils/common";
import { useMeetingAppContext } from "../context/MeetingAppContextDef";
import { useMeeting } from "@videosdk.live/react-native-sdk";

const ActiveParticipantsGrid = ({ toggleBars, isLandscape }) => {
  const isMobile = true;
  const isTab = false;

  const mMeeting = useMeeting();

  const participants = mMeeting?.participants;

  const { mainViewParticipants } = useMeetingAppContext();

  const { singleRow } = React.useMemo(() => {
    const participants = [...mainViewParticipants];

    const participantsCount = participants?.length || 1;

    const gridInfo = getGridRowsAndColumns({
      participantsCount,
      isMobile,
      isTab,
      isLandscape: isLandscape,
    });

    return getGridForMainParticipants({ participants, gridInfo });
  }, [mainViewParticipants, isLandscape, isMobile, isTab]);

  return (
    <View
      style={{
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 8,
        marginBottom: 12,
      }}
    >
      {singleRow.map(({ participantId, left, top, height, width }) => (
        <View
          key={participantId}
          style={{
            borderRadius: 4,
            overflow: "hidden",
            position: "absolute",
            left: `${left}%`,
            top: `${top}%`,
            height: `${height}%`,
            width: `${width}%`,
          }}
        >
          <ParticipantView
            quality={calcQuality(participants?.size || 1)}
            participantId={participantId}
            presstoHide={() => {
              toggleBars();
            }}
          />
        </View>
      ))}
    </View>
  );
};

export default ActiveParticipantsGrid;
