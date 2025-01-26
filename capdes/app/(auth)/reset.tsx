import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '../styles/style'
import { SafeAreaView } from 'react-native-safe-area-context'

const reset = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     
     return (
          <SafeAreaView style={[allStyles.allPages, styles.container]}>
               <Image source={require('@/assets/images/Design3.png')} resizeMode='contain' style={styles.image} />
                              
               <View style={styles.intro}>
                    <Text style={allStyles.headings}>Password Reset</Text>
                    <Text style={[allStyles.normalText, { paddingHorizontal: 60, textAlign: 'center' }]}>Reset your Password</Text>
               </View>

               <View style={{ gap: 10 }}>
                    <TextInput placeholder='New Password' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
                    <TextInput placeholder='Confirm Password' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
               </View>

               <View style={styles.interations}>
                    <Pressable style={allStyles.buttons}>
                         <Text style={allStyles.buttonText}>Reset Password</Text>
                    </Pressable>
               </View>
          </SafeAreaView>
     )
}

export default reset

const styles = StyleSheet.create({
     container: {
          paddingVertical: 20,
          paddingHorizontal: 30,
          justifyContent: 'center',
          gap: 40,
     },
     image: {
          width: 80,
          height: 80,
          alignSelf: 'center'
     },
     intro: {
          gap: 2,
          alignItems: 'center',
     },
     interations: {
          gap: 15,
     },
})