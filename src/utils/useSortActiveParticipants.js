import { useMeeting } from "@videosdk.live/react-native-sdk";
import { useEffect, useMemo, useRef } from "react";
import { useMeetingAppContext } from "../context/MeetingAppContextDef";

const useSortActiveParticipants = () => {
  const maxParticipantGridCount_mobile = 6; // 6;
  const maxParticipantGridCount_tab = 4;
  const participantsRef = useRef();
  const activeSortedParticipantsRef = useRef();
  const maxParticipantInMainViewRef = useRef();
  const mainViewParticipantsRef = useRef();
  const isTab = false;
  const isMobile = true;
  const maxParticipantInMainView = useMemo(
    () =>
      isTab
        ? maxParticipantGridCount_tab
        : isMobile
        ? maxParticipantGridCount_mobile
        : 0,
    [isTab, isMobile]
  );
  const {
    activeSortedParticipants,
    mainViewParticipants,
    setActiveSortedParticipants,
    setMainViewParticipants,
  } = useMeetingAppContext();
  const sortActiveParticipants = (activeParticipants) => {
    activeParticipants.sort((a, b) => {
      if (a.lastActiveOn > b.lastActiveOn) {
        return -1;
      }
      if (a.lastActiveOn < b.lastActiveOn) {
        return 1;
      }
      return 0;
    });
    return activeParticipants;
  };
  const _handleOnSpeakerChanged = (activeSpeakerId) => {
    if (activeSpeakerId) {
      const mainViewParticipants = mainViewParticipantsRef.current;
      const activeParticipants = activeSortedParticipantsRef.current;
      const lastActiveOn = new Date().getTime();
      const foundIndex = activeParticipants.findIndex(({ participantId }) => {
        return activeSpeakerId === participantId;
      });
      const foundIndexMain = mainViewParticipants.findIndex((participantId) => {
        return activeSpeakerId === participantId;
      });
      const newParticipantObj = {
        participantId: activeSpeakerId,
        lastActiveOn,
      };
      let activeSortedParticipants;
      if (foundIndex !== -1) {
        activeParticipants[foundIndex] = newParticipantObj;
        activeSortedParticipants = sortActiveParticipants(activeParticipants);
      } else {
        activeParticipants.unshift(newParticipantObj);
        activeSortedParticipants = sortActiveParticipants(activeParticipants);
      }
      if (foundIndexMain === -1) {
        // if not space in main then get inactive from active and replace with active into main
        const mainParticipantsLastActive = activeSortedParticipants.filter(
          ({ participantId }) =>
            mainViewParticipants.findIndex((pID) => pID === participantId) !==
            -1
        );
        const notActive =
          mainParticipantsLastActive[mainParticipantsLastActive.length - 1];
        const notActiveMainIndex = mainViewParticipants.findIndex(
          (participantId) => notActive.participantId === participantId
        );
        mainViewParticipants[notActiveMainIndex] = activeSpeakerId;
        setMainViewParticipants(mainViewParticipants);
      }
      setActiveSortedParticipants(activeSortedParticipants);
    }
  };
  const _handleOnParticipantJoined = (participant) => {
    const participantId = participant.id;
    const activeParticipants = activeSortedParticipantsRef.current;
    const mainViewParticipants = mainViewParticipantsRef.current;
    const maxParticipantInMainView = maxParticipantInMainViewRef.current;
    const lastActiveOn = new Date().getTime();
    const foundIndex = activeParticipants.findIndex(
      ({ participantId: pID }) => {
        return pID === participantId;
      }
    );
    const filteredMainViewParticipants = [...mainViewParticipants].filter(
      (pID) => pID !== participantId
    );
    if (foundIndex === -1) {
      activeParticipants.push({ participantId, lastActiveOn });
    } else {
      activeParticipants[foundIndex] = { participantId, lastActiveOn };
    }
    const activeSortedParticipants = sortActiveParticipants(activeParticipants);
    setActiveSortedParticipants(activeSortedParticipants);
    if (filteredMainViewParticipants.length < maxParticipantInMainView) {
      filteredMainViewParticipants.unshift(participantId);
      setMainViewParticipants(filteredMainViewParticipants);
    } else {
    }
  };
  const _handleOnParticipantLeft = (participant) => {
    const participantId = participant.id;
    const mainViewParticipants = mainViewParticipantsRef.current;
    const activeSortedParticipants = activeSortedParticipantsRef.current;
    const filteredActiveParticipants = activeSortedParticipants.filter(
      ({ participantId: pId }) => participantId !== pId
    );
    const index = mainViewParticipants.findIndex(
      (pID) => pID === participantId
    );
    if (index !== -1) {
      const filteredMainViewParticipants = mainViewParticipants.filter(
        (pID) => pID !== participantId
      );
      const inQueue = filteredActiveParticipants.filter(
        ({ participantId }) =>
          filteredMainViewParticipants.findIndex(
            (pID) => pID === participantId
          ) === -1
      );
      if (inQueue.length) {
        filteredMainViewParticipants.unshift(inQueue[0].participantId);
      }
      setMainViewParticipants(filteredMainViewParticipants);
    } else {
    }
    const sortedActive = sortActiveParticipants(filteredActiveParticipants);
    setActiveSortedParticipants(sortedActive);
  };
  const _sortOnModify = ({ maxParticipantInMainView: maxCount } = {}) => {
    const activeSortedParticipants = activeSortedParticipantsRef.current;
    const maxParticipantInMainView =
      maxCount || maxParticipantInMainViewRef.current;
    const slicedParticipantIds = activeSortedParticipants
      .slice(0, maxParticipantInMainView)
      .map(({ participantId }) => participantId);
    setMainViewParticipants(slicedParticipantIds);
  };
  const _sortOnInit = () => {
    const participants = participantsRef.current;
    const maxParticipantInMainView = maxParticipantInMainViewRef.current;
    const participantIds = [...new Map(participants).keys()];
    const activeParticipants = [];
    participantIds.forEach((participantId) => {
      const lastActiveOn = new Date().getTime();
      activeParticipants.push({ participantId, lastActiveOn });
    });
    const activeSortedParticipants = sortActiveParticipants(activeParticipants);
    const slicedParticipantIds = activeSortedParticipants
      .slice(0, maxParticipantInMainView)
      .map(({ participantId }) => participantId);
    setActiveSortedParticipants(activeSortedParticipants);
    setMainViewParticipants(slicedParticipantIds);
  };
  const mMeeting = useMeeting({
    onSpeakerChanged: _handleOnSpeakerChanged,
    onParticipantJoined: _handleOnParticipantJoined,
    onParticipantLeft: _handleOnParticipantLeft,
  });
  const participants = mMeeting?.participants;
  useEffect(() => {
    activeSortedParticipantsRef.current = [...activeSortedParticipants];
  }, [activeSortedParticipants]);
  useEffect(() => {
    mainViewParticipantsRef.current = [...mainViewParticipants];
  }, [mainViewParticipants]);
  useEffect(() => {
    maxParticipantInMainViewRef.current = maxParticipantInMainView;
    _sortOnModify({ maxParticipantInMainView });
  }, [maxParticipantInMainView]);
  useEffect(() => {
    participantsRef.current = participants;
  }, [participants]);
  useEffect(() => {
    setTimeout(_sortOnInit, 2000);
  }, []);
};
export default useSortActiveParticipants;
