import AsyncStorage from "@react-native-community/async-storage";

export const LOCAL_STORAGE_LABLES = {
  USER_TOKEN: "USER_TOKEN",
  WORKSPACE_INFO: "WORKSPACE_INFO",
};

class LocalStorage {
  static storeToken = async (token) => {
    await AsyncStorage.setItem(LOCAL_STORAGE_LABLES.USER_TOKEN, token);
  };

  static getToken = async () => {
    return await AsyncStorage.getItem(LOCAL_STORAGE_LABLES.USER_TOKEN);
  };

  static clearToken = async () => {
    return await AsyncStorage.removeItem(LOCAL_STORAGE_LABLES.USER_TOKEN);
  };

  static storeWorkspaceInfo = async (data) => {
    await AsyncStorage.setItem(LOCAL_STORAGE_LABLES.WORKSPACE_INFO, data);
  };

  static getWorkspaceInfo = async () => {
    return await AsyncStorage.getItem(LOCAL_STORAGE_LABLES.WORKSPACE_INFO);
  };

  static clearWorkspaceInfo = async () => {
    return await AsyncStorage.removeItem(LOCAL_STORAGE_LABLES.WORKSPACE_INFO);
  };
}

export { LocalStorage };
