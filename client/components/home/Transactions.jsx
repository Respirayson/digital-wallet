import React from "react";
import { View, Text, FlatList } from "react-native";
import { FONTS, SIZES, COLORS } from "../../constants/theme";

import { Ionicons } from "@expo/vector-icons";

const Transactions = ({ transactions }) => {
  const renderTransaction = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: SIZES.padding * 2,
        width: "100%",
      }}
    >
      {/* left side */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          height: "100%",
          alignItems: "center",
          flex: 2,
        }}
      >
        <View
          style={{
            height: 45,
            width: 45,
            borderRadius: 10,
            justifyContent: "center",
            backgroundColor: item.color,
            alignItems: "center",
          }}
        >
          <Ionicons name={item.icon} size={25} color="white" justifyContent="center" />
        </View>
        <View>
          <Text
            style={{
              marginLeft: SIZES.padding,
              ...FONTS.body2,
              textAlign: "left",
            }}
          >
            {item.type}
          </Text>
          <Text
            style={{
              marginLeft: SIZES.padding,
              ...FONTS.body3,
              textAlign: "left",
            }}
          >
            {item.description}
          </Text>
        </View>
      </View>

      {/* right side */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          height: "100%",
          alignItems: "center",
          flex: 1,
        }}
      >
        <View>
          <Text
            style={{
              ...FONTS.h4,
              textAlign: "right",
            }}
          >
            {item.amount}
          </Text>
          <Text
            style={{
              ...FONTS.body5,
              textAlign: "right",
            }}
          >
            {item.date}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View
      style={{
        width: "100%",
        paddingTop: SIZES.padding * 2,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: 25,
        }}
      >
        <Text style={{ ...FONTS.h3 }}>Transactions</Text>
        <Text style={{ ...FONTS.body4, color: COLORS.secondary }}>Recent</Text>
      </View>
      <FlatList
        data={transactions}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderTransaction}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      />
    </View>
  );
};

export default Transactions;
