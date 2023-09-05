import { createStackNavigator } from "@react-navigation/stack";

import Tabs from "../navigation/Tabs";

const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }} initialRouteName="Tabs">

      <Stack.Screen name="Tabs" component={Tabs} />
    </Stack.Navigator>
  );
};

export default App;
