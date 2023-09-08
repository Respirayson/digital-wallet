import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image"
import { StatusBar } from "expo-status-bar";
import { COLORS, FONTS } from "../constants/theme";
import background from "../assets/shape.jpg";

const Welcome = ({ navigation }) => {
  return (
    <>
      <StatusBar style="auto" />
      <View
        style={{
          backgroundColor: "#f7f8fa",
          flex: 1,
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
        }}
      >
        {/* <a href="https://www.vecteezy.com/free-png/pastel-shapes">Pastel Shapes PNGs by Vecteezy</a> */}
        <Image
          style={{
            height: "100%",
            width: "100%",
            contentFit: "cover",
          }}
          source={background}
        ></Image>

        <View
          style={{
            width: "100%",
            padding: 25,
            position: "absolute",
            bottom: "5%",
          }} // bottom section
        >
          <Text
            style={{
              ...FONTS.h1,
              color: COLORS.secondaryBlack,
              fontSize: 36,
              fontWeight: "bold",
              width: "70%",
            }}
          >
            Best way to send money
          </Text>
          <Text
            style={{
              ...FONTS.body2,
              color: COLORS.secondaryBlack,
              marginVertical: 15,
              width: "75%",
            }}
          >
            Send money to your friends and family anytime anywhere.
          </Text>

          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              padding: 15,
              borderRadius: 20,
              backgroundColor: COLORS.primary,
            }}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={{ ...FONTS.body2, color: "white" }}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Welcome;
