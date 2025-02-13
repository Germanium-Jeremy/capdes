import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '@/app/styles/style'
import { router } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

const owner = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })
     const [viewMechanics, setViewMechanics] = useState<boolean>(true);
     const [menuVisible, setMenuVisible] = useState<number | null>(null);

     const mechanics = [
          { id: 1, name: 'Mechanic A', email: 'mechA@example.com', phone: '+250 788 888 888' },
          { id: 2, name: 'Mechanic B', email: 'mechB@example.com', phone: '+250 788 888 889' },
     ];

     const garages = [
          { id: 3, name: 'Garage A', location: 'Location A', phone: '+250 788 888 888' },
          { id: 4, name: 'Garage B', location: 'Location B', phone: '+250 788 888 889' },
          { id: 5, name: 'Garage C', location: 'Location C', phone: '+250 788 888 889' },
          { id: 6, name: 'Garage D', location: 'Location D', phone: '+250 788 888 889' },
          { id: 7, name: 'Garage E', location: 'Location E', phone: '+250 788 888 889' },
     ];

     const ListItem = ({ item }: any) => {
          const isMenuVisible = menuVisible === item.id

          return (
               <View style={[styles.work, { borderColor: theme.text }]}>
                    <Text style={[styles.dateRecord, { color: theme.text }]}>Date</Text>
                    <Image source={require('@/assets/images/Design1.png')} resizeMode='contain' style={styles.recordImage} />
                    <View>
                         <Text style={{ color: theme.text }}>+250 788 888 888</Text>
                         <Text style={{ color: theme.text }}>Username</Text>
                    </View>
                    <MaterialIcons name='more-vert' size={28} color={theme.text} style={styles.more} onPress={() => setMenuVisible(isMenuVisible ? null : item.id)} />

                    {isMenuVisible && (
                         <View style={[styles.menuDisplay, { backgroundColor: theme.background }]}>
                              <Text style={[styles.menuText, { color: theme.text }]}>Call</Text>
                              <Text style={[styles.menuText, { color: theme.text }]}>Chat</Text>
                              <Text style={[styles.menuText, { color: theme.text }]}>Profile</Text>
                              <Text style={[styles.menuText, { color: theme.text }]}>Report</Text>
                         </View>
                    )}
               </View>
          )
     }
     
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
                    {(!viewMechanics ? garages : mechanics).map((item) => (
                         <ListItem key={item.id} item={item} />
                    ))}
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
     menuDisplay: {
          position: 'absolute',
          borderWidth: 1,
          borderColor: '#aaa',
          paddingVertical: 5,
          paddingHorizontal: 10,
          right: 25,
          zIndex: 1,
     },
     menuText: {
          fontSize: 12,
          paddingVertical: 2,
     },
})