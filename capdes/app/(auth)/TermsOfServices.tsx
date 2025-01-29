import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '../styles/style'

const TermsOfServices = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     
     return (
          <SafeAreaView style={[styles.container, allStyles.allPages]}>
               <Text style={[styles.title, { color: theme.text }]}>Terms of Services of Capdes Mobile App</Text>

               <Text style={{ color: theme.text, fontSize: 16 }}>A random text message claiming a prize or gift card is likely a scam. You should not reply to or click on any links in these messages.</Text>

               <Text style={{ color: theme.text, fontSize: 16 }}>Explanation.</Text>

               <Text style={{ color: theme.text, fontSize: 16 }}>Terms of service (ToS) are a legal agreement between a website or app and its users. They outline the rules and expectations for using the site or app. ToS agreements can include information about user rights, prohibited behaviors, and how to resolve disputes.</Text>

               <Text style={{ color: theme.text, fontSize: 16 }}>You should be wary of any text message that asks you to provide personal information or enter a code by clicking on a link. These messages are often designed to trick you into providing your information to scammers.</Text>
          </SafeAreaView>
     )
}

export default TermsOfServices

const styles = StyleSheet.create({
     container: {
          paddingVertical: 50,
          paddingHorizontal: 30,
          gap: 20,
     },
     title: {
          fontSize: 20,
          fontWeight: 500,
          textAlign: 'center',
     },
})