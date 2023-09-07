import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import icons from "../constants/icons";
import focus from "../assets/focus.png";

const Scan = ({ navigation }) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === "granted");
    })();
  });

  if (permission === null) {
    return <View />;
  }
  if (permission === false) {
    return <Text>No access to camera</Text>;
  }

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.padding * 4,
          paddingHorizontal: SIZES.padding * 3,
        }}
      >
        <TouchableOpacity
          style={{
            width: 45,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.close}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
            Scan seller's QR Code
          </Text>
        </View>

        <TouchableOpacity
          style={{
            height: 45,
            width: 45,
            backgroundColor: COLORS.green,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => console.log("Info")}
        >
          <Image
            source={icons.info}
            style={{
              height: 25,
              width: 25,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderScanFocus() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={focus}
          resizeMode="stretch"
          style={{
            marginTop: "-55%",
            width: 200,
            height: 300,
          }}
        />
      </View>
    );
  }

  function renderPaymentMethods() {
    return (
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 220,
          padding: SIZES.padding * 3,
          borderTopLeftRadius: SIZES.radius,
          borderTopRightRadius: SIZES.radius,
          backgroundColor: COLORS.white,
        }}
      >
        <Text style={{ ...FONTS.h4 }}>Opt for a different payment</Text>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-start",
            marginTop: SIZES.padding * 2,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => console.log("Phone Number")} // change to navigation to sms screen
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: COLORS.lightpurple,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
              }}
            >
              <Image
                source={icons.phone}
                resizeMode="cover"
                style={{
                  height: 25,
                  width: 25,
                  tintColor: COLORS.purple,
                }}
              />
            </View>
            <Text style={{ marginLeft: SIZES.padding, ...FONTS.body4 }}>
              Phone Number
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }


  // TODO: Replace the function with the actual function to read the QR Code
  function onQrScanRead(result) {
    console.log(result.data);
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.transparent,
      }}
    >
      <Camera
        ref={(ref) => {
          this.camera = ref;
        }}
        style={{ flex: 1 }}
        captureAudio={false}
        type={type}
        flashMode={Camera.Constants.FlashMode.off}
        onBarCodeScanned={onQrScanRead}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "Camera is required for barcode scanning",
          buttonPositive: "OK",
          buttonNegative: "Cancel",
        }}
      >
        {renderHeader()}
        {renderScanFocus()}
        {renderPaymentMethods()}
      </Camera>
    </View>
  );
};

export default Scan;
