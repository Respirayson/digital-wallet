import React from "react";
import { SafeAreaView } from "react-native";
import { Features, Header, Wallet, Transactions } from "../components";
import { SIZES } from "../constants/theme";
import { transactionData } from "../constants";
import { ScrollView } from "react-native-gesture-handler";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={{ margin: SIZES.padding * 2 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <Wallet balance={200} phoneNumber={"84558231"} />
        <Features navigation={navigation} />
        <Transactions transactions={transactionData} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
