import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants/theme";
import icons from "../constants/icons";

const Payment = ({ navigation }) => {
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSmsAvailable, setIsSmsAvailable] = useState(false); // TODO: Replace with function that checks if SMS is available

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
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <Text style={{ color: COLORS.white, ...FONTS.body1 }}>
            Send Money
          </Text>
        </View>
      </View>
    );
  }

  function renderPaymentScreen() {
    return (
      <View
        style={{
          position: "absolute",
          bottom: "3%",
          left: 0,
          right: 0,
          height: "83%",
          marginHorizontal: SIZES.padding * 3,
          padding: SIZES.padding * 2,
          paddingHorizontal: SIZES.padding * 3,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.white,
        }}
      >
        <Text
          style={{
            marginLeft: SIZES.padding,
            marginBottom: SIZES.padding,
            color: COLORS.black,
            ...FONTS.body2,
          }}
        >
          Enter Phone Number
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 10,
            paddingLeft: SIZES.padding,
          }}
          keyboardType="numeric"
          placeholder="123-456-7890"
          placeholderTextColor={COLORS.black}
          selectionColor={COLORS.black}
          textAlign="left"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9]/g, ""))}
        />
        <Text
          style={{
            marginLeft: SIZES.padding,
            marginVertical: SIZES.padding,
            color: COLORS.black,
            ...FONTS.body2,
          }}
        >
          Enter Amount
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 10,
            paddingLeft: SIZES.padding,
          }}
          keyboardType="numeric"
          placeholder="$0.00"
          placeholderTextColor={COLORS.black}
          selectionColor={COLORS.black}
          textAlign="left"
          value={amount}
          onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ""))}
        />

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            padding: 15,
            borderRadius: 30,
            backgroundColor: COLORS.secondary,
            position: "absolute",
            bottom: "4%",
            left: "10%",
          }}
          onPress={() => console.log(amount)}
        >
          <Text style={{ ...FONTS.body2, color: "white" }}>Send</Text>
        </TouchableOpacity>
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
      {renderPaymentScreen()}
    </View>
  );
};

export default Payment;
