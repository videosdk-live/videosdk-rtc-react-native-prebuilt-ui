import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export default function getScreenOrientation() {
  const [isLandscape, setisLandscape] = useState(null);

  const setOrientation = async () => {
    if (Dimensions.get("window").width < Dimensions.get("window").height) {
      await setisLandscape(false);
    } else {
      await setisLandscape(true);
    }
  };
  useEffect(() => {
    const dm = Dimensions.addEventListener("change", setOrientation);
    return () => {
      dm.remove();
    };
  });

  return {
    isLandscape,
  };
}
