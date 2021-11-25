import React, { useContext, createContext, useState } from "react";
import getScreenOrientation from "../utils/getScreenOrientation";

export const MeetingAppContext = createContext();

export const useMeetingAppContext = () => useContext(MeetingAppContext);

export const MeetingAppProvider = ({ children, redirectOnLeave }) => {
  const [activeSortedParticipants, setActiveSortedParticipants] = useState([]);
  const [mainViewParticipants, setMainViewParticipants] = useState([]);
  const [raisedHandsParticipants, setRaisedHandsParticipants] = useState([]);
  const { isLandscape } = getScreenOrientation();
  return (
    <MeetingAppContext.Provider
      value={{
        redirectOnLeave,
        activeSortedParticipants,
        setActiveSortedParticipants,
        mainViewParticipants,
        setMainViewParticipants,
        raisedHandsParticipants,
        setRaisedHandsParticipants,
        isLandscape,
      }}
    >
      {children}
    </MeetingAppContext.Provider>
  );
};
