import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '@/app/styles/style'
import { router } from 'expo-router'

const owner = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     
     return (
          <SafeAreaView style={allStyles.allPages}>
               <View style={[styles.intro, { backgroundColor: theme.links }]}>
                    <View style={{ gap: 1 }}>
                         <Text style={{ color: '#FFF', fontWeight: 'semibold', fontSize: 20 }}>Mechanic Names</Text>
                         <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 300 }}>Garage the mechanic work in</Text>
                    </View>

                    <Image resizeMode='contain' source={require('@/assets/images/Design1.png')} style={styles.image} />
               </View>

               <View style={{ backgroundColor: theme.links, width: '100%', flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, paddingHorizontal: 30 }}>
                    <Pressable style={[styles.buttonW]} onPress={() => router.push('/(tabs)/home/allMechs')}>
                         <Text>Approved</Text>
                         <Text style={{ color: 'white', backgroundColor: theme.links, borderRadius: 100, height: 25, width: 25, justifyContent: 'center', alignItems: 'center', fontWeight: 500, display: 'flex' }}>3</Text>
                    </Pressable>

                    <Pressable style={[styles.buttonW]} onPress={() => router.push('/(tabs)/home/waitlist')}>
                         <Text>Waitlist</Text>
                         <Text style={{ color: 'white', backgroundColor: theme.links, borderRadius: 100, height: 25, width: 25, justifyContent: 'center', alignItems: 'center', fontWeight: 500, display: 'flex' }}>3</Text>
                    </Pressable>
               </View>

               <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black', fontSize: 20, fontWeight: 500, paddingVertical: 30, paddingHorizontal: 30 }}>Recent Calls</Text>

               <View style={[styles.prevWorks, { backgroundColor: theme.background }]}>
                    <View style={styles.work}>
                         <Text style={styles.dateRecord}>Date</Text>
                         <Image source={require('@/assets/images/Design1.png')} resizeMode='contain' style={styles.recordImage} />
                         <View>
                              <Text>+250 788 888 888</Text>
                              <Text>Username</Text>
                         </View>
                         <Pressable style={styles.more}>...</Pressable>
                    </View>
                    <View style={styles.work}>
                         <Text style={styles.dateRecord}>Date</Text>
                         <Image source={require('@/assets/images/Design1.png')} resizeMode='contain' style={styles.recordImage} />
                         <View>
                              <Text>+250 788 888 888</Text>
                              <Text>Username</Text>
                         </View>
                         <Pressable style={styles.more}>...</Pressable>
                    </View>
                    <View style={styles.work}>
                         <Text style={styles.dateRecord}>Date</Text>
                         <Image source={require('@/assets/images/Design1.png')} resizeMode='contain' style={styles.recordImage} />
                         <View>
                              <Text>+250 788 888 888</Text>
                              <Text>Username</Text>
                         </View>
                         <Pressable style={styles.more}>...</Pressable>
                    </View>
               </View>
          </SafeAreaView>
     )
}

export default owner

const styles = StyleSheet.create({
     image: {
          width: 50,
          height: 50,
          alignSelf: 'center',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 100
     },
     intro: {
          flexDirection: 'row',
          paddingVertical: 10,
          paddingHorizontal: 30,
          justifyContent: 'space-between'
     },
     buttonW: {
          borderRadius: 100,
          paddingVertical: 5,
          paddingHorizontal: 20,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
     },
     prevWorks: {
          paddingVertical: 20,
          paddingHorizontal: 30,
          gap: 10,
     },
     work: {
          borderBottomWidth: 1,
          position: 'relative',
          paddingTop: 20,
          paddingVertical: 3,
          paddingHorizontal: 5,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
     },
     dateRecord: {
          position: 'absolute',
          top: 0,
          left: 2,
     },
     more: {
          position: 'absolute',
          right: 10,
     },
     recordImage: {
          width: 30,
          height: 30,
          borderRadius: 100
     },
})