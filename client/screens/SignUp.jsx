import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient";

import { COLORS, SIZES, FONTS } from "../constants/theme";
import icons from "../constants/icons";
import images from "../constants/images";

const SignUp = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [isModelVisible, setIsModelVisible] = useState(false);

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState("");


  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca3,idd")
      .then((response) => response.json())
      .then((data) => {
        const areaData = data.map((item) => ({
          code: item.cca3,
          name: item.name?.common,
          flag: item.flags.png,
          callingCode: item.idd?.root + item.idd?.suffixes[0],
        }));
        setAreas(areaData.sort((a, b) => a.name.localeCompare(b.name)));

        if (areaData.length > 0) {
          const defaultData = areaData.filter((a) => a.name == "Singapore");

          if (defaultData.length > 0) {
            setSelectedArea(defaultData[0]);
          }
        }
      });
  }, []);

  function renderHeader() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: SIZES.padding * 3,
          paddingHorizontal: SIZES.padding * 2,
        }}
        onPress={() => navigation.navigate("Welcome")}
      >
        <Image
          source={icons.back}
          contentFit="contain"
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.white,
          }}
        />

        <Text
          style={{
            marginLeft: SIZES.padding * 1.5,
            color: COLORS.white,
            ...FONTS.h4,
          }}
        >
          Welcome
        </Text>
      </TouchableOpacity>
    );
  }

  function renderLogo() {
    return (
      <View
        style={{
          height: "auto",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={images.logo}
          contentFit="cover"
          style={{
            width: "60%",
            height: "60%",
          }}
        />
      </View>
    );
  }

  function renderForm() {
    return (
      <View
        style={{
          marginHorizontal: SIZES.padding * 3,
        }}
      >
        {/* Full Name */}
        <View style={{ }}>
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
            Full Name
          </Text>
          <TextInput
            style={{
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.white,
              ...FONTS.body3,
            }}
            placeholder="Enter Full Name"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.whitse}
            defaultValue={fullName}
            onChangeText={(text) => setFullName(text)}
          />
        </View>

        {/* Phone Number */}
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
            Phone Number
          </Text>

          <View style={{ flexDirection: "row" }}>
            {/* Country Code */}
            <TouchableOpacity
              style={{
                width: 100,
                height: 50,
                marginHorizontal: 5,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                flexDirection: "row",
                ...FONTS.body2,
              }}
              onPress={() => setIsModelVisible(true)}
            >
              <View style={{ justifyContent: "center" }}>
                <Image
                  source={icons.down}
                  style={{
                    width: 10,
                    height: 10,
                    tintColor: COLORS.white,
                  }}
                />
              </View>
              <View style={{ justifyContent: "center", marginLeft: 5 }}>
                <Image
                  source={{ uri: selectedArea?.flag }}
                  contentFit="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>

              <View style={{ justifyContent: "center", marginLeft: 5 }}>
                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
                  {selectedArea?.callingCode}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Phone Number */}
            <TextInput
              style={{
                flex: 1,
                marginVertical: SIZES.padding,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                height: 40,
                color: COLORS.white,
                ...FONTS.body3,
              }}
              placeholder="Enter Phone Number"
              placeholderTextColor={COLORS.white}
              selectionColor={COLORS.white}
              defaultValue={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
          </View>
        </View>

        {/* Password */}
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
            Password
          </Text>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.white,
              ...FONTS.body3,
            }}
            placeholder="Enter Password"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
            secureTextEntry={!showPassword}
            defaultValue={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 0,
              bottom: 10,
              height: 30,
              width: 30,
            }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={showPassword ? icons.disable_eye : icons.eye}
              style={{
                height: 20,
                width: 20,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={{ margin: SIZES.padding * 3 }}>
        <TouchableOpacity
          style={{
            height: 60,
            backgroundColor: COLORS.primary,
            borderRadius: SIZES.radius / 1.5,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            console.log(fullName, phoneNumber, password);
            navigation.navigate("Tabs")
            }} // TODO: Replace with actual authentication stuff
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderAreaCodesModal() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ padding: SIZES.padding, flexDirection: "row" }}
          onPress={() => {
            setSelectedArea(item);
            setIsModelVisible(false);
          }}
        >
          <Image
            source={{ uri: item.flag }}
            style={{
              width: 30,
              height: 30,
              marginRight: 10,
            }}
          />
          <Text style={{ ...FONTS.body4 }}>{item.name}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <Modal animationType="slide" transparent={true} visible={isModelVisible}>
        <TouchableWithoutFeedback onPress={() => setIsModelVisible(false)}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View
              style={{
                height: 400,
                width: "80%",
                backgroundColor: COLORS.lightGreen,
                borderRadius: SIZES.radius,
              }}
            >
              <FlatList
                data={areas}
                renderItem={renderItem}
                keyExtractor={(item) => item.code}
                showsVerticalScrollIndicator={false}
                style={{
                  padding: SIZES.padding * 2,
                  marginBottom: SIZES.padding * 2,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={[COLORS.secondaryBlack, "#1d3360"]}
        style={{ flex: 1 }}
      >
        <ScrollView>
          {renderHeader()}
          {renderLogo()}
          {renderForm()}
          {renderButton()}
        </ScrollView>
      </LinearGradient>
      {renderAreaCodesModal()}
    </KeyboardAvoidingView>
  );
};

export default SignUp;
