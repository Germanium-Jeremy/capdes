import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '@/app/styles/style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

const updateUser = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     
     return (
          <SafeAreaView style={[styles.container, allStyles.allPages]}>
               <View style={{ justifyContent: 'center', gap: 20 }}>
                    <Image source={require('@/assets/images/Design1.png')} resizeMode='contain' style={styles.profileImage} />
                    <Pressable style={[allStyles.buttons]} onPress={() => router.push('/(tabs)/settings/ChangePassword')}>
                         <Text style={allStyles.buttonText}>Change your Password</Text>
                    </Pressable>
               </View>

               <View style={{ gap: 10, marginVertical: 30 }}>
                    <TextInput placeholder='Username' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
                    <TextInput placeholder='Email Address' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
                    <TextInput placeholder='Password' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
               </View>

               <Pressable style={[allStyles.buttons]}>
                    <Text style={allStyles.buttonText}>Update Information</Text>
               </Pressable>
          </SafeAreaView>
     )
}

export default updateUser

const styles = StyleSheet.create({
     container: {
          paddingVertical: 20,
          paddingHorizontal: 30,
          gap: 10,
          justifyContent: 'center',
     },
     profileImage: {
          width: 120,
          height: 120,
          borderRadius: 30,
          alignSelf: 'center',
     },
})