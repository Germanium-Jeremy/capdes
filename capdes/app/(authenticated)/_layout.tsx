// import { ThemeContext } from "@/context/ThemeContext";
// import { Ionicons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";

import { Stack } from "expo-router";
// import { useContext } from "react";

// export default function UserTabLayout() {
//      const { theme } = useContext(ThemeContext);

//      return (
//           <Tabs screenOptions={{
//                tabBarShowLabel: false,
//                tabBarStyle: {
//                     backgroundColor: theme.footerBg,
//                },
//           }}>
//                <Tabs.Screen name="index" options={{
//                     title: "Home",
//                     tabBarIcon: ({ color }) => <Ionicons size={25} name="home" color={"white"} />,
//                }} />
//                <Tabs.Screen name="phone/index" options={{
//                     title: "Call",
//                     tabBarIcon: ({ color }) => <Ionicons size={25} name="call" color={"white"} />,
//                }} />
//           </Tabs>
//      )
// }


export default function UserLayout() {
     return (
          <Stack screenOptions={{ headerShown: true }}>
               <Stack.Screen name="index" />
               <Stack.Screen name="settings" />
               <Stack.Screen name="notifications" />
               <Stack.Screen name="chat" />
               <Stack.Screen name="listMechanins" />
               {/* <Stack.Screen name="mechanicD" /> */}
          </Stack>
     )
}