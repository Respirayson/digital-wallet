import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Image, Text } from "react-native";
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

        <View
          style={{ flex: 1 }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.body1 }}>Add Money</Text>
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
          alignItems: "flex-start",
          justifyContent: "center",
          marginTop: SIZES.padding * 8,
        }}
      >
        <TextInput
          style={{
            marginVertical: SIZES.padding,
            width: "100%",
            height: 50,
            color: COLORS.black,
            ...FONTS.body3,
            fontSize: 24,
            paddingRight: SIZES.padding * 2,
          }}
          placeholder="$0.00"
          placeholderTextColor={COLORS.black}
          selectionColor={COLORS.black}
          keyboardType="number-pad"
          textAlign="right"
          value={amount}
          onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ""))}
        />
      </View>
      <View
        style={{
          width: "100%",
          position: "absolute",
          left: "9%",
          bottom: "10%",
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: 15,
            borderRadius: 30,
            backgroundColor: COLORS.secondary,
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
