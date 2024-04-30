//import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../Screens/WelcomeScreen";
import SignupScreen from "../Screens/SignupScreen";
import PersonalInfoScreen from "../Screens/PersonalInfoScreen";
import ChronicDiseasesScreen from "../Screens/ChronicDiseasesScreen";
import EditPersonalInfoScreen from "../Screens/EditPersonalInfoScreen";
import ViewBloodTestsScreen from "../Screens/ViewBloodTestsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import HealthSummaryScreen from "../Screens/HealthSummaryScreen";
import BloodTestResultScreen from "../Screens/BloodTestResultScreen";

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
      <Stack.Screen
        name="EditPersonalInfoScreen"
        component={EditPersonalInfoScreen}
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="ViewBloodTestScreen"
        component={ViewBloodTestsScreen}
        options={{
          title: "Blood tests",
        }}
      />
      <Stack.Screen
        name="HealthSummaryScreen"
        component={HealthSummaryScreen}
        options={{
          title: "Health summary",
        }}
      />
      <Stack.Screen
        name="BloodTestResultScreen"
        component={BloodTestResultScreen}
        options={{
          title: "Health summary",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
