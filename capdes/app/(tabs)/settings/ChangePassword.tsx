import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '@/app/styles/style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

const ChangePassword = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     
     return (
          <SafeAreaView style={[styles.container, allStyles.allPages]}>
               <View style={{ justifyContent: 'center', gap: 20 }}>
                    <Image source={require('@/assets/images/Design1.png')} resizeMode='contain' style={styles.profileImage} />
               </View>

               <View style={{ gap: 10, marginVertical: 30 }}>
                    <TextInput placeholder='Current Password' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
                    <TextInput placeholder='New Password' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
                    <TextInput placeholder='Confirm Password' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
               </View>

               <Pressable style={[allStyles.buttons]}>
                    <Text style={allStyles.buttonText}>Update Password</Text>
               </Pressable>
          </SafeAreaView>
     )
}

export default ChangePassword

const styles = StyleSheet.create({
     container: {
          paddingVertical: 20,
          paddingHorizontal: 30,
          gap: 10,
          justifyContent: 'center',
     },
     profileImage: {
          width: 150,
          height: 150,
          borderRadius: 30,
          alignSelf: 'center',
     },
})