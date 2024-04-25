//import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../Screens/WelcomeScreen";
import SignupScreen from "../Screens/SignupScreen";
import PersonalInfoScreen from "../Screens/PersonalInfoScreen";
import ChronicDiseasesScreen from "../Screens/ChronicDiseasesScreen";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="WelcomeScreen">
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="PersonalInfoScreen"
        component={PersonalInfoScreen}
        options={{
          title: "",
        }}
      />
        <Stack.Screen
        name="ChronicDiseasesScreen"
        component={ChronicDiseasesScreen}
        options={{
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
