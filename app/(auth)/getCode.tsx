import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '../styles/style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserContect } from '@/Contexts/UserContext'
import { ROOT_API } from '@/Contexts/API'
import { router } from 'expo-router'

const getCode = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     const { setResetEmail } = useContext(UserContect)

     const [loadingCode, setLoadingCode] = useState(false)
     const [email, setEmail] = useState('')
     const [getCodeError, setGetCodeError] = useState('')

     const handleGetCode = async () => {
          setLoadingCode(true)
          setGetCodeError('')

          const requestCode = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ email })
          }

          try {
               const response = await fetch(`${ROOT_API}/getResetCode`, requestCode)
               if (!response.ok) {
                    const errorResponse = await response.json()
                    console.log(errorResponse)
                    setGetCodeError(errorResponse.message)
                    return
               }

               const responseJson = await response.json()
               console.log(responseJson)
               setResetEmail(email)
               router.push("/(auth)/code");
          } catch (error) {
               setGetCodeError('An unexpected error occured' + error)
               console.error("Unexpected error", error)
          } finally {
               setLoadingCode(false)
          }
     }

     const ActivityContainer = () => {
          if (loadingCode) return <ActivityIndicator />

          return (
               <Pressable style={allStyles.buttons} onPress={handleGetCode}>
                    <Text style={allStyles.buttonText}>Get Code</Text>
               </Pressable>
          );
     }
     
     return (
          <SafeAreaView style={[allStyles.allPages, styles.container]}>
               <Image source={require('@/assets/images/Design3.png')} resizeMode='contain' style={styles.image} />
               
               <View style={styles.intro}>
                    <Text style={allStyles.headings}>Get Reset Code</Text>
                    <Text style={[allStyles.normalText, { paddingHorizontal: 60, textAlign: 'center' }]}>Enter your email and get a verification code</Text>
                    <Text style={[allStyles.normalText, { paddingHorizontal: 60, textAlign: 'center', paddingVertical: 10, color: 'red', fontWeight: 500 }]}>{ getCodeError }</Text>
               </View>

               <View style={{ gap: 10 }}>
                    <TextInput placeholder='Enter Email' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} value={email} onChangeText={setEmail} />
               </View>

               <View style={styles.interations}>
                    <ActivityContainer />
               </View>
          </SafeAreaView>
     )
}

export default getCode

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
})