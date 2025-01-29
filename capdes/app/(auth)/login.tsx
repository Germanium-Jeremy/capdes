import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AllStyles from '../styles/style'
import { ThemeContext } from '@/Contexts/ThemeContext'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const login = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     return (
          <SafeAreaView style={[allStyles.allPages, styles.container]}>
               <Image source={require('@/assets/images/Design3.png')} resizeMode='contain' style={styles.image} />
               
               <View style={styles.intro}>
                    <Text style={allStyles.headings}>Log In Now</Text>
                    <Text style={[allStyles.normalText, { paddingHorizontal: 60, textAlign: 'center' }]}>Please login to continue using our app</Text>
               </View>

               <View style={{ gap: 10 }}>
                    <TextInput placeholder='Email' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
                    <TextInput placeholder='Password' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
                    <Link style={{ color: theme.links, alignSelf: 'flex-end', paddingRight: 20 }} href={'/(auth)/getCode'}>Forgot Password</Link>
               </View>

               <View style={styles.interations}>
                    <Pressable style={allStyles.buttons}>
                         <Text style={allStyles.buttonText}>Log In</Text>
                    </Pressable>
                    <Text style={[allStyles.normalText, { textAlign: 'center' }]}>Don't have an account? <Link href={'/(auth)/signup'} style={{ color: theme.links }}>Sign Up</Link></Text>
               </View>

               <View style={{ alignSelf: 'center' }}>
                    <Text style={[allStyles.normalText, { textAlign: 'center' }]}>Or connect with</Text>
                    <View style={{ flexDirection: 'row', gap: 30, paddingVertical: 10, justifyContent: 'space-evenly' }}>
                         <Pressable style={[styles.signwithIcons, { backgroundColor: theme.links }]}> <Ionicons name='logo-google' size={28} color={'#FFFFFF'} /> </Pressable>
                         <Pressable style={[styles.signwithIcons, { backgroundColor: theme.links }]}> <Ionicons name='logo-apple' size={28} color={'#FFFFFF'} /> </Pressable>
                    </View>
               </View>
          </SafeAreaView>
     )
}

export default login

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
          gap: 10
     },
     signwithIcons: {
          borderRadius: 100,
          padding: 2,
     },
})