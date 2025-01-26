import { Stack } from "expo-router"

const NotificationLayout = () => {
     return (
          <Stack>
               <Stack.Screen name="index" options={{ headerTitle: "Notifications", headerShown: false }} />
          </Stack>
     )
}

export default NotificationLayout