import { createStackNavigator } from "@react-navigation/stack";

import Tabs from "../navigation/Tabs";
import { MyQR, SignUp, TopUp, Welcome, Payment, Withdraw } from "../screens";


const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Welcome"
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      
      <Stack.Screen name="SignUp" component={SignUp} />

      <Stack.Screen name="MyQR" component={MyQR} />

      <Stack.Screen name="Tabs" component={Tabs} />

      <Stack.Screen name="TopUp" component={TopUp} />

      <Stack.Screen name="Payment" component={Payment} />

      <Stack.Screen name="Withdraw" component={Withdraw} />

    </Stack.Navigator>
  );
};

export default App;
