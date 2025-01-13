import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

interface StyleProps {
     theme: typeof Colors.light | typeof Colors.dark | typeof Colors.custom;
     colorScheme: "light" | "dark" | "custom";
}

export default function globalStyles({ theme, colorScheme}: StyleProps) {
     return StyleSheet.create({
          formInputs: {
               fontSize: 18,
               padding: 5,
               paddingHorizontal: 10,
               color: theme.textColor,
               width: '100%',
               borderWidth: 0,
               outlineColor: theme.mainColor,
               marginHorizontal: 2,
               marginBottom: 2,
          },
          darkThemeColor: {
               color: theme.mainColor
          },
     })
}