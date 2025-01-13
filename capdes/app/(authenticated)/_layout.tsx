import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { Stack } from "expo-router";

export default function UserTabLayout() {

     return (
          <Tabs screenOptions={{
               tabBarShowLabel: false,
               tabBarStyle: {
                    backgroundColor: "#111",
               },
          }}>
               <Tabs.Screen name="index" options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <Ionicons size={25} name="home" color={"white"} />,
               }} />
               <Tabs.Screen name="phone/index" options={{
                    title: "Call",
                    tabBarIcon: ({ color }) => <Ionicons size={25} name="call" color={"white"} />,
               }} />
          </Tabs>
     )
}


// export default function UserLayout() {
//      return (
//           <Stack>
//                <Stack.Screen name="index" />
//                <Stack.Screen name="phone" />
//           </Stack>
//      )
// }