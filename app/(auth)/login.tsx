import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AllStyles from '../styles/style'
import { ThemeContext } from '@/Contexts/ThemeContext'
import { Link, router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { ROOT_API } from '@/Contexts/API'
import AsyncStorage from '@react-native-async-storage/async-storage'

const login = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })

     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const [loginError, setLoginError] = useState('')
     const [loginLoading, setLoginLoading] = useState(false)
     const [goodRes, setGoodRes] = useState(false)

     const ActivityContainer = () => {
          if (loginLoading) return <ActivityIndicator />

          return (
               <Pressable style={allStyles.buttons} onPress={handleLogin}>
                    <Text style={allStyles.buttonText}>Log In</Text>
               </Pressable>
          );
     }

     const getUserDetails = async (userToken: string) => {
          const requestUserData = {
               method: 'GET',
               headers: {
                    'Content-Type': 'application/json',
                    'token': userToken
               },
          }

          try {
               const response = await fetch(`${ROOT_API}/currentUser`, requestUserData);
               if (!response.ok) {
                    const errorResponse = await response.json()
                    setLoginError(errorResponse.message)
                    console.log("Unable to get user Data", errorResponse)
                    return
               }

               const responseJson = await response.json()
               await AsyncStorage.setItem("User Data", JSON.stringify(responseJson))
               console.log("User Data: ", responseJson)
               return true
          } catch (error) {
               console.log("Unable to get user Data: ", error)
               return false
          }
     }

     const handleLogin = async () => {
          setLoginLoading(true)

          const requestLogin = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ email, password })
          }

          try {
               const response = await fetch(`${ROOT_API}/signIn`, requestLogin)

               if (!response.ok) {
                    const errorResponse = await response.json();
                    setLoginError(errorResponse.message)
                    return
               }

               const responseJson = await response.json()
               await AsyncStorage.setItem("User Token", JSON.stringify(responseJson.accessToken))
               await AsyncStorage.setItem("User role", JSON.stringify(responseJson.role))

               if (await getUserDetails(responseJson.accessToken)) {
                    setGoodRes(true)
                    router.push('/(tabs)/home')
               } else {
                    console.error("Unable to get user data")
                    setGoodRes(false)
               }
          } catch (error) {
               setLoginError('An unexpected Error')
               console.error("Error login: ", error)
          } finally {
               setLoginLoading(false)
               if (goodRes) {
                    router.push('/(tabs)/home')
               }
          }
     }
     
     return (
          <SafeAreaView style={[allStyles.allPages, styles.container]}>
               <Image source={require('@/assets/images/Design3.png')} resizeMode='contain' style={styles.image} />
               
               <View style={styles.intro}>
                    <Text style={allStyles.headings}>Log In Now</Text>
                    <Text style={[allStyles.normalText, { paddingHorizontal: 60, textAlign: 'center' }]}>Please login to continue using our app</Text>
                    <Text style={[allStyles.normalText, { paddingHorizontal: 60, textAlign: 'center', color: 'red', fontWeight: 500, paddingVertical: 10 }]}>{ loginError }</Text>
               </View>

               <View style={{ gap: 10 }}>
                    <TextInput placeholder='Email' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} value={email} onChangeText={setEmail} />
                    <TextInput placeholder='Password' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} value={password} onChangeText={setPassword} />
                    <Link style={{ color: theme.links, alignSelf: 'flex-end', paddingRight: 20 }} href={'/(auth)/getCode'}>Forgot Password</Link>
               </View>

               <View style={styles.interations}>
                    <ActivityContainer />
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