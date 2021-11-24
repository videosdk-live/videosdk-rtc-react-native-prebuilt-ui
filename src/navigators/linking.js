const config = {
  screens: {
    MeetingInfo_Screen: {
      path: "MeetingInfo_Screen/:id",
      parse: {
        id: (id) => `${id}`,
      },
    },
  },
};

const linking = {
  prefixes: ["https://*.zujonow.com/meeting/"],
  config,
};

export default linking;
