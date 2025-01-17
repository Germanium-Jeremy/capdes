import { ThemeContext } from "@/context/ThemeContext";
import React, { ReactNode, useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import globalStyles from "./MainStyles";
import { Colors } from "@/constants/Colors";

interface CustomCheckboxProps {
     isChecked: boolean;
     onToogle: () => void;
     label: ReactNode; // Accepts any React node
}

interface StyleProps {
     theme: typeof Colors.light | typeof Colors.dark | typeof Colors.custom;
     colorScheme: "light" | "dark" | "custom";
}


const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, onToogle, isChecked }) => {
     const { colorScheme, theme } = useContext(ThemeContext);
     const styles = createStyles({ theme, colorScheme });
     const globalStyle = globalStyles({ theme, colorScheme })
     return (
          <TouchableOpacity
               style={styles.container}
               onPress={onToogle}
          >
               <View style={[styles.checkbox, isChecked && styles.checked]}>
               {isChecked && <Text style={styles.checkmark}>✔</Text>}
               </View>
              { label }
          </TouchableOpacity>
     );
};

function createStyles({ theme, colorScheme }: StyleProps) {
     return StyleSheet.create({
          container: {
               flexDirection: "row",
               alignItems: "center",
               marginBottom: 10,
               gap: 5,
          },
          checkbox: {
               width: 20,
               height: 20,
               borderWidth: 1,
               borderColor: colorScheme !== "dark" ? "#111" : "white",
               backgroundColor: "white",
               justifyContent: "center",
               alignItems: "center",
               borderRadius: 4,
          },
          checked: {
               backgroundColor: theme.mainColor,
          },
          checkmark: {
               color: "white",
               fontSize: 18,
          },
          label: {
               marginLeft: 8,
               fontSize: 16,
          },
     });
}

export default CustomCheckbox;
