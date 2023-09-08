import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Image } from "expo-image"
import { SIZES, COLORS, FONTS } from "../constants/theme";
import icons from "../constants/icons";

const TopUp = ({ navigation }) => {
  const [amount, setAmount] = useState("");

  function renderNavigator() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginTop: SIZES.padding / 2,
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
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ color: COLORS.white, ...FONTS.body1 }}>Add Money</Text>
          <Text style={{ ...FONTS.body5, color: COLORS.white }}>
            Fund your wallet with money
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: COLORS.primary,
        padding: SIZES.padding * 3,
      }}
    >
      {renderNavigator()}
      {renderHeader()}
      <View
        style={{
          width: "100%",
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius / 2,
          alignItems: "center",
          justifyContent: "flexstart",
          marginTop: SIZES.padding * 4,
          height: "auto",
          padding: SIZES.padding * 3,
        }}
      >
        <TextInput
          style={{
            height: 60,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 10,
            width: "100%",
            marginTop: SIZES.padding * 2,
            paddingRight: SIZES.padding,
            fontSize: 32,
          }}
          keyboardType="numeric"
          returnKeyType="done"
          placeholder="$0.00"
          placeholderTextColor={COLORS.black}
          selectionColor={COLORS.black}
          textAlign="right"
          value={amount}
          onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ""))}
        />
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            borderRadius: 30,
            height: 50,
            backgroundColor: COLORS.secondary,
            marginTop: SIZES.padding * 2,
          }}
          onPress={() => console.log(amount)} // TODO: Replace with function that connects to stripe
        >
          <Text style={{ ...FONTS.body2, color: "white" }}>Top Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopUp;
