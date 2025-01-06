// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import SignupScreen from "./signup";
// import LoginScreen from "./login";
// import { Ionicons } from "@expo/vector-icons";
// import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

// const Tab = createBottomTabNavigator()

export default function LandingLayout() {
     return (
          // <Tab.Navigator screenOptions={{ headerShown: false }}>
          //      <Tab.Screen name="login" component={LoginScreen} options={{
          //           tabBarIcon: ({ color, size }) => (
          //           <Ionicons name="log-in" size={size} color={color} />
          //      )}} />
          //      <Tab.Screen name="signup" component={SignupScreen} options={{
          //           tabBarIcon: ({ color, size }) => (
          //           <Ionicons name="add-circle" size={size} color={color} />
          //      ) }} />
          // </Tab.Navigator>

          <Stack screenOptions={{ headerShown: false }}>
               <Stack.Screen name="login" />
               <Stack.Screen name="signup" />
               <Stack.Screen name="forgot" />
               <Stack.Screen name="passwordReset" />
               <Stack.Screen name="choose" />
               <Stack.Screen name="garage" />
               <Stack.Screen name="mechanic" />
          </Stack>
     );
}


