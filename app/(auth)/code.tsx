import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '../styles/style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserContect } from '@/Contexts/UserContext'
import { ROOT_API } from '@/Contexts/API'
import { router } from 'expo-router'

const code = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     const { resetEmail } = useContext(UserContect);

     const [loadingCode, setLoadingCode] = useState(false)
     const [verifyCodeError, setverifyCodeError] = useState('')

     const [resetCode, setResetCode] = useState('')
     const [goodResponse, setGoodResponse] = useState(false)

     const handleGetCode = async () => {
          setLoadingCode(true)
          setverifyCodeError('')

          const requestCode = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ resetEmail })
          }

          try {
               const response = await fetch(`${ROOT_API}/getResetCode`, requestCode)
               if (!response.ok) {
                    const errorResponse = await response.json()
                    console.log(errorResponse)
                    setverifyCodeError(errorResponse.message)
                    return
               }

               const responseJson = await response.json()
               console.log(responseJson)
          } catch (error) {
               setverifyCodeError('An unexpected error occured' + error)
               console.error("Unexpected error", error)
          } finally {
               setLoadingCode(false)
          }
     }

     const handleVerifyCode = async () => {
          setLoadingCode(true)
          setverifyCodeError('')

          const verifyCode = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ resetCode })
          }


          try {
               const response = await fetch(`${ROOT_API}/checkResetCode`, verifyCode)
               if (!response.ok) {
                    const errorResponse = await response.json()
                    console.log(errorResponse)
                    setverifyCodeError(errorResponse.message)
                    return
               }

               const responseJson = await response.json()
               console.log(responseJson)
               setResetCode(responseJson)
          } catch (error) {
               setverifyCodeError('An unexpected error occured' + error)
               console.error("Unexpected error", error)
          } finally {
               setLoadingCode(false)
          }
     }

     const ActivityContainer = () => {
          if (loadingCode) return <ActivityIndicator />

          return (
               <>
                    <Pressable style={allStyles.buttons} onPress={handleVerifyCode}>
                         <Text style={allStyles.buttonText}>Verify Code</Text>
                    </Pressable>
                    <Pressable style={allStyles.buttons} onPress={handleGetCode}>
                         <Text style={allStyles.buttonText}>Resend Code</Text>
                    </Pressable>
               </>
          );
     }

     return (
          <SafeAreaView style={[allStyles.allPages, styles.container]}>
               <Image source={require('@/assets/images/Design3.png')} resizeMode='contain' style={styles.image} />
                              
               <View style={styles.intro}>
                    <Text style={allStyles.headings}>Verify Code</Text>
                    <Text style={[allStyles.normalText, { paddingHorizontal: 60, textAlign: 'center' }]}>Enter the verification code from your email</Text>
                    <Text style={[allStyles.normalText, { paddingHorizontal: 60, textAlign: 'center', paddingVertical: 10, color: 'red', fontWeight: 500 }]}>{ verifyCodeError }</Text>
               </View>

               <View style={{ gap: 10 }}>
                    <TextInput placeholder='Code' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} value={resetCode} onChangeText={setResetCode} />
               </View>

               <View style={styles.interations}>
                    <ActivityContainer />
               </View>
          </SafeAreaView>
     )
}

export default code

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