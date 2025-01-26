import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '../styles/style'
import { SafeAreaView } from 'react-native-safe-area-context'

const getCode = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     
     return (
          <SafeAreaView style={[allStyles.allPages, styles.container]}>
               <Image source={require('@/assets/images/Design3.png')} resizeMode='contain' style={styles.image} />
               
               <View style={styles.intro}>
                    <Text style={allStyles.headings}>Get Reset Code</Text>
                    <Text style={[allStyles.normalText, { paddingHorizontal: 60, textAlign: 'center' }]}>Enter your email and get a verification code</Text>
               </View>

               <View style={{ gap: 10 }}>
                    <TextInput placeholder='Enter Email' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
               </View>

               <View style={styles.interations}>
                    <Pressable style={allStyles.buttons}>
                         <Text style={allStyles.buttonText}>Get Code</Text>
                    </Pressable>
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