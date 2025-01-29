import React, { ReactNode, useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/Contexts/ThemeContext";

interface CustomCheckboxProps {
     isChecked: boolean;
     onToogle: () => void;
     label: ReactNode;
}

const Checkbox: React.FC<CustomCheckboxProps> = ({ label, onToogle, isChecked }) => {
     const { colorScheme, theme } = useContext(ThemeContext);
     return (
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 20, paddingLeft: 20 }} onPress={onToogle} >
               <View style={[styles.checkbox, isChecked && { backgroundColor: theme.links }]}>
               {isChecked && <Text style={styles.checkmark}>✔</Text>}
               </View>
              { label }
          </TouchableOpacity>
     );
};

export default Checkbox

const styles = StyleSheet.create({
     container: {
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
          gap: 5,
          // paddingLeft: 20,
     },
     checkbox: {
          width: 20,
          height: 20,
          borderWidth: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
     },
     checkmark: {
          color: "white",
          fontSize: 18,
     },
     label: {
          marginLeft: 8,
          fontSize: 16,
     },
})