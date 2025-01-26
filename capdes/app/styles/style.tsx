import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

interface StyleProps {
     theme: typeof Colors.light | typeof Colors.dark;
     colorScheme: "light" | "dark";
}

export default function AllStyles({ theme, colorScheme }: StyleProps) {
     return StyleSheet.create({
          buttons: {
               backgroundColor: theme.buttonsBg,
               paddingVertical: 12,
               paddingHorizontal: 20,
               justifyContent: 'center',
               alignItems: 'center',
               borderRadius: 200,
          },
          buttonText: {
               color: theme.buttonTxt,
               fontSize: 20,
               fontWeight: "semibold",
          },
          normalText: {
               color: theme.text,
               fontSize: 16,
               fontWeight: 400,
          },
          headings: {
               color: theme.headings,
               fontSize: 28,
               fontWeight: 'semibold',
          },
          allPages: {
               backgroundColor: theme.background,
               flex: 1,
          },
          inputs: {
               backgroundColor: theme.formInputsBg,
               paddingVertical: 12,
               paddingHorizontal: 20,
               alignItems: 'center',
               borderRadius: 200,
               borderColor: theme.formInputsBorder,
               borderWidth: 1,
          }
     })
}