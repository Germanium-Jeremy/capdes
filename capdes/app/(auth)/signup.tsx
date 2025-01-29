import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '../styles/style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import Checkbox from '@/components/Checkbox'
import { Ionicons } from '@expo/vector-icons'

const signup = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     const termsOfServices = <Text style={allStyles.normalText}>Agree to our <Link href={'/(auth)/TermsOfServices'} style={{ color: theme.links }}>terms of services</Link> to continue using our App.</Text>

     const [agreeTerms, setAgreeTerms] = useState(false)

     const handleTerms = () => {
          setAgreeTerms((prev) => !prev)
     }

     return (
          <SafeAreaView style={[allStyles.allPages, styles.container]}>
               <Image source={require('@/assets/images/Design3.png')} resizeMode='contain' style={styles.image} />

               <View style={styles.intro}>
                    <Text style={allStyles.headings}>Sign Up Now</Text>
                    <Text style={[allStyles.normalText, { paddingHorizontal: 60, textAlign: 'center' }]}>Please register to continue using our app</Text>
               </View>

               <View style={{ gap: 10 }}>
                    <TextInput placeholder='Full Names' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
                    <TextInput placeholder='Email' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
                    <TextInput placeholder='Password' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
                    <TextInput placeholder='Phone Number' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
                    <Checkbox isChecked={agreeTerms} label={termsOfServices} onToogle={handleTerms} />
               </View>

                <View style={styles.interations}>
                    <Pressable style={allStyles.buttons}>
                         <Text style={allStyles.buttonText}>Sign Up</Text>
                    </Pressable>
                    <Text style={[allStyles.normalText, { textAlign: 'center' }]}>Have an account? <Link href={'/(auth)/login'} style={{ color: theme.links }}>Log In</Link></Text>
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

export default signup

const styles = StyleSheet.create({
     container: {
          paddingVertical: 20,
          paddingHorizontal: 30,
          justifyContent: 'center',
          gap: 20,
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