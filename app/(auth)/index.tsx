import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AllStyles from '../styles/style'
import { ThemeContext } from '@/Contexts/ThemeContext'
import { Link, router } from 'expo-router'

const index = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     return (
          <SafeAreaView style={[allStyles.allPages, styles.container]}>
               <Image source={require('@/assets/images/Design3.png')} resizeMode='contain' style={styles.image} />

               <View style={styles.intro}>
                    <Text style={allStyles.headings}>Capdes</Text>
                    <Text style={[allStyles.normalText, { paddingHorizontal: 60, textAlign: 'center' }]}>Create an account and access instant help</Text>
               </View>
               <View style={styles.interations}>
                    <Pressable style={allStyles.buttons} onPress={() => router.push('/(auth)/signup')}>
                         <Text style={allStyles.buttonText}>Get Started</Text>
                    </Pressable>
                    <Text style={[allStyles.normalText, { textAlign: 'center' }]}>Do you have an account? <Link href={'/(auth)/login'} style={{ color: theme.links }}>Log In</Link></Text>
               </View>
          </SafeAreaView>
     )
}

export default index

const styles = StyleSheet.create({
     container: {
          paddingVertical: 20,
          paddingHorizontal: 30,
          justifyContent: 'center',
          gap: 40,
     },
     image: {
          width: 170,
          height: 170,
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