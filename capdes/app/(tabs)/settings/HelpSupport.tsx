import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '@/app/styles/style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

const LINE_HEIGHT: number = 20;
const MAX_LINES = 4;

const HelpSupport = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })

     const [messageInput, setMessageInput] = useState<string>('');

     const handleMessageChange = (inputText: string) => {
          setMessageInput(inputText);
     };

     return (
          <SafeAreaView style={[styles.container, allStyles.allPages]}>
               <Text style={[styles.title, { color: theme.text }]}>Help &amp; Support</Text>

               <Text style={[allStyles.normalText, { textAlign: 'center', paddingHorizontal: 40 }]}>If you are experiencing and any issue, please let use know. We will try to solve them as soon as possible.</Text>

               <View style={{ gap: 10, marginVertical: 20 }}>
                    <TextInput placeholder='Subject' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
                    <TextInput placeholder='Explain the Problem' placeholderTextColor={theme.formInputsPlaceholders} style={[allStyles.inputs, { color: theme.formInputsTxt, borderRadius: 30 }]} multiline value={messageInput} onChangeText={handleMessageChange} numberOfLines={6} />
               </View>

               <View style={styles.interations}>
                    <Pressable style={allStyles.buttons}>
                         <Text style={allStyles.buttonText}>Submit</Text>
                    </Pressable>
                    <Text style={[allStyles.normalText, { textAlign: 'center', paddingHorizontal: 20 }]}>You can also contact us on <Link href={'/(auth)/signup'} style={{ color: theme.links }}>+250 788 888 888</Link> on Whatsapp</Text>
               </View>
          </SafeAreaView>
     )
}

export default HelpSupport

const styles = StyleSheet.create({
     container: {
          paddingVertical: 20,
          paddingHorizontal: 30,
          gap: 10,
          justifyContent: 'center',
     },
     title: {
          fontSize: 20,
          fontWeight: 500,
          marginBottom: 30,
     },
     interations: {
          gap: 10
     },
})