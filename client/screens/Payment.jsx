import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { SIZES, COLORS, FONTS, TWILIO_NUMBER } from "../constants/theme";
import { Image } from "expo-image";
import icons from "../constants/icons";
import * as SMS from "expo-sms";

const Payment = ({ navigation }) => {
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSmsAvailable, setIsSmsAvailable] = useState(false); // TODO: Replace with function that checks if SMS is available

  const onComposeSms = useCallback(async () => {

    if (!phoneNumber || !amount) {
      alert("Please enter a valid phone number and amount");
      return;
    }
    
    if (isSmsAvailable) {
      console.log("Successfully opened SMS app");
      await SMS.sendSMSAsync(TWILIO_NUMBER, `Send ${phoneNumber} ${amount}`);
    }
  }, [isSmsAvailable, phoneNumber, amount]);

  useEffect(() => {
    SMS.isAvailableAsync().then((isAvailable) =>
      setIsSmsAvailable(isAvailable)
    );
  }, []);

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
          flexDirection: "column",
          paddingHorizontal: SIZES.padding * 3,
        }}
      >
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <Text
            style={{ color: COLORS.white, ...FONTS.h1, fontWeight: "bold" }}
          >
            Send Money
          </Text>
          <Text style={{ ...FONTS.body5, color: COLORS.white }}>
            SMS charges may apply.
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
          bottom: "43%",
          left: 0,
          right: 0,
          height: "auto",
          marginHorizontal: SIZES.padding * 3,
          padding: SIZES.padding * 3,
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
          Enter Recipient Phone No.
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
          returnKeyType="done"
          placeholder="123-456-7890"
          placeholderTextColor={COLORS.black}
          selectionColor={COLORS.black}
          textAlign="left"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
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
          returnKeyType="done"
          placeholderTextColor={COLORS.black}
          selectionColor={COLORS.black}
          textAlign="left"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
        <View
          style={{
            flex: 1,
          }}
        >
          <TouchableOpacity onPress={onComposeSms}>
            <View
              style={{
                marginTop: SIZES.padding * 2,
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: 50,
                borderRadius: 30,
                backgroundColor: COLORS.secondary,
                zIndex: 1,
              }}
            >
              <Text style={{ ...FONTS.body2, color: "white" }}>Send</Text>
            </View>
          </TouchableOpacity>
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
      {renderPaymentScreen()}
    </View>
  );
};

export default Payment;
