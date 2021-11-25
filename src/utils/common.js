export const maxParticipantGridCount_mobile = 6;
export const maxParticipantGridCount_tab = 9;

export const getGridRowsAndColumns = ({
  participantsCount,
  isMobile,
  isTab,
  isLandscape,
}) => {
  const mobilePortrait = {
    1: { r: 1, c: 1, r0: 1 },
    2: { r: 2, c: 1, r0: 1, r1: 1 },
    3: { r: 3, c: 1, r0: 1, r1: 1, r2: 1 },
    4: { r: 2, c: 2, r0: 2, r1: 2 },
    5: { r: 3, c: 2, r0: 2, r1: 1, r2: 2 },
    6: { r: 3, c: 2, r0: 2, r1: 2, r2: 2 },
  };
  const mobileLandscape = {
    1: { r: 1, c: 1, r0: 1 },
    2: { r: 1, c: 2, r0: 2 },
    3: { r: 1, c: 3, r0: 3 },
    4: { r: 2, c: 2, r0: 2, r1: 2 },
    5: { r: 2, c: 3, r0: 3, r1: 2 },
    6: { r: 2, c: 3, r0: 3, r1: 3 },
  };
  const tabPortrait = {
    ...mobilePortrait,
    7: { r: 3, c: 3, r0: 2, r1: 3, r2: 2 },
    8: { r: 3, c: 3, r0: 3, r1: 2, r2: 3 },
    9: { r: 3, c: 3, r0: 3, r1: 3, r2: 3 },
    10: { r: 4, c: 3, r0: 2, r1: 3, r2: 3, r3: 2 },
    11: { r: 4, c: 3, r0: 3, r1: 3, r2: 2, r3: 3 },
    12: { r: 4, c: 3, r0: 3, r1: 3, r2: 3, r3: 3 },
  };
  const tabLandscape = {
    ...mobileLandscape,
    7: { r: 3, c: 3, r0: 2, r1: 3, r2: 2 },
    8: { r: 3, c: 3, r0: 3, r1: 2, r2: 3 },
    9: { r: 3, c: 3, r0: 3, r1: 3, r2: 3 },
    10: { r: 3, c: 4, r0: 3, r1: 4, r2: 3 },
    11: { r: 3, c: 4, r0: 4, r1: 3, r2: 4 },
    12: { r: 3, c: 4, r0: 4, r1: 4, r2: 4 },
  };

  const { grid, maxCount } = isMobile
    ? isLandscape
      ? { grid: mobileLandscape, maxCount: 6 }
      : { grid: mobilePortrait, maxCount: 6 }
    : isTab
    ? isLandscape
      ? { grid: tabLandscape, maxCount: 12 }
      : { grid: tabPortrait, maxCount: 12 }
    : {};

  const myGrid =
    grid[
      participantsCount
        ? participantsCount > maxCount
          ? maxCount
          : participantsCount
        : 1
    ];

  return myGrid;
};

export const getGridForMainParticipants = ({ participants, gridInfo }) => {
  const grid = [];
  const singleRow = [];
  for (let index = 0; index < gridInfo.r; index++) {
    const columnForCurrentRow = gridInfo[`r${index}`];
    const columns = participants.splice(0, columnForCurrentRow);
    grid.push(
      columns.map((participantId, i) => {
        const diff = gridInfo.c - columnForCurrentRow;
        const relativeWidth = 100 / gridInfo.c;
        const relativeLeft = (i * 100) / gridInfo.c;
        const relativeShiftedLeft =
          relativeLeft + (diff > 0 ? relativeWidth / 2 : 0);
        const item = {
          participantId,
          height: 100 / gridInfo.r,
          width: relativeWidth,
          top: (100 * index) / gridInfo.r,
          left: relativeShiftedLeft,
        };
        singleRow.push(item);
        return item;
      })
    );
  }
  return { grid, singleRow };
};
export const json_verify = (s) => {
  try {
    JSON.parse(s);
    return true;
  } catch (e) {
    return false;
  }
};

export function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

export function calcQuality(participantsCount) {
  if (participantsCount <= 1) {
    return "s2t2";
  } else if (participantsCount <= 2) {
    return "s2t1";
  } else if (participantsCount <= 3) {
    return "s1t2";
  } else if (participantsCount <= 4) {
    return "s1t1";
  } else if (participantsCount <= 5) {
    return "s0t2";
  } else if (participantsCount <= 6) {
    return "s0t1";
  } else {
    return "s0t0";
  }
}

export const handleLinking = ({ url }) => {
  const splitURLArr = url && url.split("/");
  const meetingId = splitURLArr[4];
  const domain = splitURLArr[2].split(".")[0];
  return {
    meetingId,
    domain,
  };
};
