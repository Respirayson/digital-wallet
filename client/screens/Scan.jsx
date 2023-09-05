import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Camera, CameraType } from "expo-camera";

const Scan = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === "granted");
    })();
  })

    if (permission === null) {
        return <View />;
    }
    if (permission === false) {
        return <Text>No access to camera</Text>;
    }

  return (
    <View style={{
        flex: 1,
    }}>
      <Camera type={type} style={{ flex: 1 }}>
        <Text>Scan the QR CODE</Text>
      </Camera>
    </View>
  );
};

export default Scan;
