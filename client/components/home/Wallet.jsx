import React from "react";
import wallet from "../../assets/wallet.jpg";
import { ImageBackground, View } from "react-native";
import { Text } from "react-native";
import { COLORS, FONTS } from "../../constants/theme";

const Wallet = ({ balance, phoneNumber }) => {
  return (
    <ImageBackground
      style={{
        height: 140,
        marginTop: 10,
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
      >
        <Text
          style={{
            ...FONTS.h2,
            color: "white",
          }}
        >
          {"**** " + (phoneNumber ? phoneNumber.slice(4) : "0000")}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginTop: 25,
          paddingHorizontal: 20,
          alignItems: "flex-end",
          display: "flex",
        }}
      >
        <View style={{ flex: 3 }}>
          <Text
            style={{
              ...FONTS.body3,
              color: "white",
            }}
          >
            Total balance
          </Text>
          <Text
            style={{
              ...FONTS.h2,
              color: "white",
            }}
          >
            ${balance}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Wallet;
