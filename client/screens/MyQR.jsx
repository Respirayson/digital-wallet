import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { COLORS, SIZES, FONTS } from "../constants/theme";
import icons from "../constants/icons";
import logo from "../assets/logo.png";
import sample from "../assets/sample.png";
import wallet from "../assets/wallet.jpg";
import { Ionicons } from "@expo/vector-icons";

const MyQR = ({ navigation }) => {
  const [date, setDate] = useState(
    new Date().toLocaleString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  );

  function renderNavigator() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginTop: SIZES.padding / 2,
          paddingHorizontal: SIZES.padding,
        }}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: COLORS.white,
          }}
        />
      </TouchableOpacity>
    );
  }

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: SIZES.padding * 3,
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.body1 }}>
            My QR Code
          </Text>
        </View>
      </View>
    );
  }

  function renderQR() {
    return (
      <View
        style={{
          position: "absolute",
          bottom: "3%",
          left: 0,
          right: 0,
          height: "88%",
          marginHorizontal: SIZES.padding * 3,
          padding: SIZES.padding * 2,
          paddingHorizontal: SIZES.padding * 3,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              height: 50,
              width: 50,
              borderRadius: 10,
              backgroundColor: COLORS.lightRed,
            }}
            source={logo}
          ></Image>
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: SIZES.padding * 1.5,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Your Name</Text>
            <Text style={{ ...FONTS.body4 }}>Updated Today, {date}</Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            marginVertical: SIZES.padding,
          }}
        >
          <Image
            style={{
              height: 300,
              backgroundColor: COLORS.lightGray,
              width: 300,
              borderRadius: SIZES.radius / 2,
            }}
            source={sample}
          ></Image>
          <ImageBackground
            style={{
              height: 100,
              marginTop: 15,
            }}
            imageStyle={{ borderRadius: 20 }}
            source={wallet}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
            ></View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                paddingHorizontal: 20,
                alignItems: "flex-end",
                borderRadius: SIZES.radius / 2,
              }}
            >
              <View style={{ flex: 3 }}>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: "white",
                  }}
                >
                  Balance
                </Text>
                <Text
                  style={{
                    paddingTop: 10,
                    ...FONTS.body2,
                    color: "white",
                    fontSize: 36,
                  }}
                >
                  $800
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: SIZES.padding * 2,
        backgroundColor: COLORS.primary,
      }}
    >
      {renderNavigator()}

      {renderHeader()}
      {renderQR()}
    </View>
  );
};

export default MyQR;
