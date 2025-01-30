import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext';
import AllStyles from '@/app/styles/style';

const Menu = () => {
     const { colorScheme, theme } = useContext(ThemeContext);
     const allStyles = AllStyles({ theme, colorScheme });
     
     return (
          <View style={[styles.menuDisplay, { backgroundColor: theme.background }]}>
               <Text style={[styles.menuText, { color: theme.text }]} >Call</Text>
               <Text style={[styles.menuText, { color: theme.text }]} >Chat</Text>
               <Text style={[styles.menuText, { color: theme.text }]} >Profile</Text>
               <Text style={[styles.menuText, { color: theme.text }]} >Report</Text>
          </View>
     )
}

export default Menu

const styles = StyleSheet.create({
     menuDisplay: {
          position: 'absolute',
          borderWidth: 1,
          borderColor: '#aaa',
          paddingVertical: 5,
          paddingHorizontal: 10,
          right: 25,
          zIndex: 1,
     },
     menuText: {
          color: '#333', // Adjust according to your theme
          fontSize: 12,
          paddingVertical: 2,
     },
})