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
  prefixes: ["https://call.videosdk.live/", "call.videosdk.live/"],
  config,
};
export default linking;
