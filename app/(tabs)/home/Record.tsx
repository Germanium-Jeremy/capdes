import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '@/app/styles/style'
import { SafeAreaView } from 'react-native-safe-area-context'

const Record = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     
     return (
          <SafeAreaView style={[styles.container, allStyles.allPages]}>
               <View style={styles.recordImageDiv}>
                    <Image source={require('@/assets/images/Design1.png')} resizeMode='contain' style={styles.recordImage} />
                    <Image source={require('@/assets/images/Design1.png')} resizeMode='contain' style={styles.recordImage} />
               </View>

               <View style={{ gap: 10, marginVertical: 30 }}>
                    <Text style={allStyles.inputs}>Date: Mon 23 Jun 2020</Text>
                    <Text style={allStyles.inputs}>Mechanic Or User Name</Text>
                    <Text style={allStyles.inputs}>Mechanic Or User Phone Number</Text>
               </View>

               <Pressable style={allStyles.buttons}>
                    <Text style={allStyles.buttonText}>Delete Record</Text>
               </Pressable>
          </SafeAreaView>
     )
}

export default Record

const styles = StyleSheet.create({
     container: {
          paddingVertical: 20,
          paddingHorizontal: 30,
          gap: 10,
          justifyContent: 'center',
     },
     recordImageDiv: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          gap: 20,
          width: '100%',
     },
     recordImage: {
          width: 80,
          height: 80,
          borderRadius: 20,
     },
})