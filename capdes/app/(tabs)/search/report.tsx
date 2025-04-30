import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '@/app/styles/style'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

const report = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     
     return (
          <SafeAreaView style={[styles.container, allStyles.allPages]}>
               <Text style={[allStyles.headings, { color: theme.text }]}>Report a Problem</Text>
               <View style={[styles.form]}>
                    <Text style={[allStyles.normalText, { textAlign: 'center', marginVertical: 40 }]}>If you are been fraud ed or lied, please let use know. We will try to solve them as soon as possible.</Text>

                    <TextInput placeholder='Subject' placeholderTextColor={theme.formInputsPlaceholders} style={allStyles.inputs} />
                    <TextInput placeholder='Explain The problem' placeholderTextColor={theme.formInputsPlaceholders} style={[allStyles.inputs, { minHeight: 100, borderRadius: 20 }]} />

                    <View style={styles.interations}>
                         <Pressable style={allStyles.buttons}>
                              <Text style={allStyles.buttonText}>Submit</Text>
                         </Pressable>
                         <Text style={[allStyles.normalText, { textAlign: 'center' }]}>You can also contact us on <Link href={'/(auth)/signup'} style={{ color: theme.links }}>+250 788 888 888</Link> on Whatsapp</Text>
                    </View>
               </View>
          </SafeAreaView>
     )
}

export default report

const styles = StyleSheet.create({
     container: {
          paddingVertical: 20,
          paddingHorizontal: 30,
     },
     form: {
          justifyContent: 'center',
          flex: 1,
          gap: 10,
     },
     interations: {
          gap: 10
     },
})