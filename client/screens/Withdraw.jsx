import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Image } from "expo-image";
import { SIZES, COLORS, FONTS } from "../constants/theme";
import icons from "../constants/icons";

const Withdraw = ({ navigation }) => {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);

  /**
   * TODO: IMPLEMENT THE WITHDRAW FUNCTIONALITY
   */
  const withdraw = async () => {
    const accNumber = "acct_1NoPJDFRaaU652pz";

    const res = await fetch(
      "https://transact-pals.onrender.com/api/v1/transactions/transfer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          destination: accNumber,
        }),
      }
    );
    const data = await res.json();

    if (data.error) {
      console.log(data.error);
    }
    navigation.navigate("Tabs");
  };

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
          contentFit="contain"
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
          <Text style={{ color: COLORS.white, ...FONTS.body1 }}>Withdraw</Text>
          <Text style={{ ...FONTS.body5, color: COLORS.white }}>
            Transfer funds to your account
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
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginTop: SIZES.padding * 2,
          height: "auto",
          padding: SIZES.padding * 3,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text
            style={{
              paddingLeft: SIZES.padding,
              color: COLORS.black,
              ...FONTS.body2,
            }}
          >
            Enter Amount
          </Text>
          <Text
            style={{
              marginTop: SIZES.padding / 2,
              paddingRight: SIZES.padding,
              color: COLORS.black,
              ...FONTS.body5,
            }}
          >
            Balance: ${balance}
          </Text>
        </View>

        <TextInput
          style={{
            height: 60,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 10,
            width: "100%",
            marginTop: SIZES.padding,
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
          onPress={withdraw}
        >
          <Text style={{ ...FONTS.body2, color: "white" }}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Withdraw;
