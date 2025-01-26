import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '../styles/style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

const choose = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     
     return (
          <SafeAreaView style={[styles.container, allStyles.allPages]}>
               <Image source={require('@/assets/images/Design3.png')} resizeMode='contain' style={styles.image} />

               <View style={styles.intro}>
                    <Text style={allStyles.headings}>Please Select</Text>
                    <Text style={[allStyles.normalText, { paddingHorizontal: 30, textAlign: 'center' }]}>Are you a garage or company owner or You are a mechanic who works at the garage.</Text>
                    <Text style={[allStyles.normalText, { paddingHorizontal: 30, textAlign: 'center' }]}>We require this info to know how to manage the business and your staff.</Text>
               </View>

               <View style={styles.interations}>
                    <Pressable style={allStyles.buttons} onPress={() => router.push('/(auth)/mechanic')}>
                         <Text style={allStyles.buttonText}>Mechanic</Text>
                    </Pressable>
                    <Pressable style={allStyles.buttons} onPress={() => router.push('/(auth)/garage')}>
                         <Text style={allStyles.buttonText}>Garage Owner</Text>
                    </Pressable>
               </View>
          </SafeAreaView>
     )
}

export default choose

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
          gap: 20,
          alignItems: 'center',
     },
     interations: {
          gap: 10
     },
})