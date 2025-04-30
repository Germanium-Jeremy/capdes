import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '../styles/style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import Checkbox from '@/components/Checkbox'
import { Ionicons } from '@expo/vector-icons'
import { CountryPicker } from 'react-native-country-codes-picker'
import { ScrollView } from 'react-native-gesture-handler'
import { UserContect } from '@/Contexts/UserContext'
import { ROOT_API } from '@/Contexts/API'
import AsyncStorage from '@react-native-async-storage/async-storage'

const signup = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const { setUserId } = useContext(UserContect)
     const allStyles = AllStyles({ theme, colorScheme })
     const termsOfServices = <Text style={allStyles.normalText}>Agree to our <Link href={'/(auth)/TermsOfServices'} style={{ color: theme.links }}>terms of services</Link> to continue using our App.</Text>
     const isWorker = <Text style={allStyles.normalText}>Mechanic or own a Garage</Text>

     const [agreeTerms, setAgreeTerms] = useState(false)
     const [workder, setWorker] = useState(false)
     const [signupLoading, setSignupLoading] = useState<boolean>(false)
     const [signupError, setSignupError] = useState<string | undefined>('')
     const [show, setShow] = useState(false)
     const [countryCode, setCountryCode] = useState('+250')

     const [fullnames, setFullnames] = useState<string>('')
     const [email, setEmail] = useState<string>('')
     const [password, setPassword] = useState<string>('')
     const [phoneNumber, setPhoneNumber] = useState<string>()

     const handleTerms = () => {
          setAgreeTerms((prev) => !prev)
     }

     const handleWorker = () => {
          setWorker((prev) => !prev)
     }

     const handleSignup = async () => {
          setSignupLoading(true)
          setSignupError('')

          const requestSignUp = {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ names: fullnames, email: email, password: password, phoneNumber: countryCode + phoneNumber })
          }

          try {
               const response = await fetch(`${ROOT_API}/signUp`, requestSignUp)

               if (!response.ok) {
                    const errorResponse = await response.json();
                    setSignupError(errorResponse.message)
                    return
               }

               const responseJson = await response.json()
               setUserId(responseJson.userId);

               await AsyncStorage.setItem("User Id", JSON.stringify(responseJson.userId))

               workder ? router.push('/(auth)/choose') : router.push('/(auth)/login')
          } catch (error) {
               setSignupError('An unexpected error occured')
               console.error("Error Signing Up: ", error)
          } finally {
               setSignupLoading(false)
          }
     }

     const ActivityContainer = () => {
          if (!agreeTerms) return (
               <Pressable style={[allStyles.buttons, { backgroundColor: "gray" }]}>
                    <Text style={allStyles.buttonText}>Sign Up</Text>
               </Pressable>
          );

          if (signupLoading) return <ActivityIndicator />

          return (
               <Pressable style={allStyles.buttons} onPress={handleSignup}>
                    <Text style={allStyles.buttonText}>Sign Up</Text>
               </Pressable>
          );
     }

     return (
          <SafeAreaView style={[allStyles.allPages]}>
               <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'center', gap: 20 }}>
                    <Image source={require('@/assets/images/Design3.png')} resizeMode='contain' style={styles.image} />

                    <View style={styles.intro}>
                         <Text style={allStyles.headings}>Sign Up Now</Text>
                         <Text style={[allStyles.normalText, { paddingHorizontal: 60, textAlign: 'center' }]}>Please register to continue using our app</Text>
                         <Text style={[allStyles.normalText, { paddingHorizontal: 60, textAlign: 'center', paddingVertical: 10, color: 'red', fontWeight: 500 }]}>{ signupError }</Text>
                    </View>

                    <View style={{ gap: 10 }}>
                         <TextInput placeholder='Full Names' placeholderTextColor={theme.formInputsPlaceholders} style={[allStyles.inputs, { color: theme.text }]} value={fullnames} onChangeText={setFullnames} />
                         <TextInput placeholder='Email' placeholderTextColor={theme.formInputsPlaceholders} style={[allStyles.inputs, { color: theme.text }]} value={email} onChangeText={setEmail} />
                         <TextInput placeholder='Password' placeholderTextColor={theme.formInputsPlaceholders} style={[allStyles.inputs, { color: theme.text }]} value={password} onChangeText={setPassword} />
                         <View style={[allStyles.inputs, { flexDirection: 'row', gap: 10, paddingVertical: 0 }]}>
                              <Pressable onPress={() => setShow(true)}>
                                   <Text style={{ color: theme.text, fontSize: 16 }}>{ countryCode }</Text>
                              </Pressable>
                              <CountryPicker lang='en' show={show} pickerButtonOnPress={(item) => {
                                   setCountryCode(item.dial_code)
                                   setShow(false)
                              }} style={{
                                   modal: {
                                        height: 500, backgroundColor: theme.background, paddingHorizontal: 30,
                                   }, line: {
                                        backgroundColor: theme.text
                                   }, textInput: {
                                        paddingHorizontal: 20, color: theme.formInputsTxt, backgroundColor: theme.background, borderRadius: 100,
                                        borderWidth: 1, borderColor: theme.formInputsPlaceholders, fontSize: 15,
                                   },
                                   countryButtonStyles: {
                                        borderRadius: 100, borderWidth: 1, borderColor: theme.formInputsPlaceholders, backgroundColor: theme.background,
                                   },
                                   dialCode: {
                                        color: theme.text,
                                   },
                                   countryName: {
                                        color: theme.text,
                                   },
                              }} initialState='+250' />
                              <TextInput placeholder='788888888' placeholderTextColor={theme.formInputsPlaceholders} style={{ width: '100%', paddingVertical: 10, color: theme.text }} value={phoneNumber} onChangeText={setPhoneNumber} />
                         </View>
                         <Checkbox isChecked={agreeTerms} label={termsOfServices} onToogle={signupLoading != true ? handleTerms : () => {}} />
                         <Checkbox isChecked={workder} label={isWorker} onToogle={handleWorker} />
                    </View>

                    <View style={styles.interations}>
                         <ActivityContainer />
                         <Text style={[allStyles.normalText, { textAlign: 'center' }]}>Have an account? <Link href={'/(auth)/login'} style={{ color: theme.links }}>Log In</Link></Text>
                    </View>

                    <View style={{ alignSelf: 'center' }}>
                         <Text style={[allStyles.normalText, { textAlign: 'center' }]}>Or connect with</Text>
                         <View style={{ flexDirection: 'row', gap: 30, paddingVertical: 10, justifyContent: 'space-evenly' }}>
                              <Pressable style={[styles.signwithIcons, { backgroundColor: theme.links }]}> <Ionicons name='logo-google' size={28} color={'#FFFFFF'} /> </Pressable>
                              <Pressable style={[styles.signwithIcons, { backgroundColor: theme.links }]}> <Ionicons name='logo-apple' size={28} color={'#FFFFFF'} /> </Pressable>
                         </View>
                    </View>
               </ScrollView>
          </SafeAreaView>
     )
}

export default signup

const styles = StyleSheet.create({
     container: {
          paddingVertical: 30,
          paddingHorizontal: 30,
          gap: 20,
          flex: 1,
     },
     image: {
          width: 70,
          height: 70,
          alignSelf: 'center'
     },
     intro: {
          gap: 2,
          alignItems: 'center',
     },
     interations: {
          gap: 5,
     },
     signwithIcons: {
          borderRadius: 100,
          padding: 2,
     },
})