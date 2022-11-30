const API_BASE_URL = "https://api.videosdk.live/v2";

export const getToken = async () => {
  try {
    const response = await fetch(`${HOST_URL}/get-token`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const { token } = await response.json();
    return token;
  } catch (e) {
    console.log(e);
  }
};

export const createMeeting = async (token) => {
  try {
    const VIDEOSDK_API_ENDPOINT = `${API_BASE_URL}/rooms`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    };
    const response = await fetch(VIDEOSDK_API_ENDPOINT, options)
      .then(async (result) => {
        const { meetingId } = await result.json();
        return meetingId;
      })
      .catch((error) => console.log("error", error));
    return response;
  } catch (e) {
    console.log(e);
  }
};
