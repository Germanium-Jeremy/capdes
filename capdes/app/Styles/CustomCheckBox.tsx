import React, { ReactNode, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface CustomCheckboxProps {
     isChecked: boolean;
     onToogle: () => void;
     label: ReactNode; // Accepts any React node
}


const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, onToogle, isChecked }) => {
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

const styles = StyleSheet.create({
     container: {
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10, // Add some spacing
          gap: 5,
     },
     checkbox: {
          width: 20,
          height: 20,
          borderWidth: 1,
          borderColor: "111",
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4, // Optional: rounded corners
     },
     checked: {
          backgroundColor: "#FFB300", // Color when checked
     },
     checkmark: {
          color: "white", // Color of the checkmark
          fontSize: 18,
     },
     label: {
          marginLeft: 8,
          fontSize: 16,
     },
});

export default CustomCheckbox;
