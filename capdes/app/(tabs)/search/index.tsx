import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '@/app/styles/style'
import Toggle1 from '@/components/toggle1'
import { Ionicons } from '@expo/vector-icons'

const index = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     const [viewMechanics, setViewMechanics] = useState<boolean>(true)
     
     const changeViewMechs = () => {
          setViewMechanics((prev) => !prev)
     }
     
     return (
          <SafeAreaView style={[allStyles.allPages, styles.container]}>
               <Pressable style={[styles.toggleButton, { borderColor: theme.links }]} onPress={changeViewMechs}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '50%', backgroundColor: viewMechanics ? theme.links : 'white' }}>
                         <Text style={{ color: viewMechanics ? 'white' : theme.links, fontWeight: 500 }}>Garages</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '50%', backgroundColor: !viewMechanics ? theme.links : 'white' }}>
                         <Text style={{ color: !viewMechanics ? 'white' : theme.links, fontWeight: 500 }}>Mechanics</Text>
                    </View>
               </Pressable>

               <View style={[allStyles.inputs, { flexDirection: 'row', marginTop: 10, gap: 10, paddingVertical: 5 }]}>
                    <Ionicons name='search' size={25} color={theme.formInputsTxt} />
                    <TextInput placeholder='Search' placeholderTextColor={theme.formInputsPlaceholders} style={{ width: '100%', padding: 5, color: theme.text }} />
               </View>

               <View style={{ paddingVertical: 20, gap: 10 }}>
                    <View style={[styles.work, { borderColor: theme.text }]}>
                         <Image source={require('@/assets/images/Design1.png')} resizeMode='contain' style={styles.recordImage} />
                         <View style={{ gap: 0 }}>
                              <Text style={{ color: theme.text, fontSize: 16 }}>Username</Text>
                              <Text style={{ color: theme.text, fontSize: 16 }}>Email</Text>
                              <Text style={{ color: theme.text, fontSize: 16 }}>+250 788 888 888</Text>
                         </View>
                         <Pressable style={[styles.more]}>...</Pressable>
                    </View>
               </View>
          </SafeAreaView>
     )
}

export default index

const styles = StyleSheet.create({
     container: {
          paddingVertical: 20,
          paddingHorizontal: 30,
     },
     toggleButton: {
          width: '100%',
          height: 40,
          flexDirection: 'row',
          borderWidth: 1,
          borderRadius: 100,
          overflow: 'hidden',
     },
     more: {
          position: 'absolute',
          right: 10,
          transform: [{ rotate: '90deg' }],
          fontSize: 20,
          fontWeight: 600,
          color: '#AAA'
     },
     work: {
          paddingVertical: 3,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          borderBottomWidth: 1,
     },
     recordImage: {
          width: 50,
          height: 50,
          borderRadius: 100
     },
     dateRecord: {
          position: 'absolute',
          top: 0,
          left: 2,
     },
})