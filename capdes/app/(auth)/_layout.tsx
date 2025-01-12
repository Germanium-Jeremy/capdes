import { Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

const LandingLayout: React.FC = ({ children }: any) => {
     return (
          // <View>{ children }</View>
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

export default LandingLayout