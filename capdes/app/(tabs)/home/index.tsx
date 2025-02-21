import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemeContext } from '@/Contexts/ThemeContext'
import AllStyles from '@/app/styles/style'
import { Link, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface UserDataResponse {
     names: string;
     email: string;
     phoneNumber: string;
}

const index = () => {
     const { colorScheme, theme } = useContext(ThemeContext)
     const allStyles = AllStyles({ theme, colorScheme })

     const [userRole, setUserRole] = useState('user')
     const [userData, setUserData] = useState<UserDataResponse>({
          email: '',
          names: '',
          phoneNumber: ''
     })

     useEffect(() => {
          const getUserData = async () => {
               const data = await AsyncStorage.getItem("User Data");
               const role = await AsyncStorage.getItem("User role");
               if (!data || data.length <= 0 || !role) {
                    setTimeout(() => {
                         Alert.alert("Please Login")
                    }, 2000);
                    router.push('/(auth)/login')
                    return
               }
               setUserData(JSON.parse(data))
               setUserRole(JSON.parse(role))
          }
          getUserData()
     }, [])
     
     return (
          <SafeAreaView style={[allStyles.allPages, styles.container]}>
               <Image source={require('@/assets/images/Design2.png')} resizeMode='contain' style={[styles.image, { borderColor: theme.links }]} />
               <View style={{ gap: 10 }}>
                    <Text style={[allStyles.inputs, { color: theme.formInputsTxt }]}>{ userData.names }</Text>
                    <Text style={[allStyles.inputs, { color: theme.formInputsTxt }]}>{ userData.email }</Text>
                    <Text style={[allStyles.inputs, { color: theme.formInputsTxt }]}>{ userData.phoneNumber }</Text>
                    {userRole != "user" &&
                         <Pressable style={[allStyles.buttons, { marginTop: 10 }]} onPress={() => router.push(userRole == 'mechanic' ? '/(tabs)/home/mechanic' : '/(tabs)/home/owner')}>
                              <Text style={allStyles.buttonText}>View Previous Work</Text>
                         </Pressable>
                    }
               </View>

               <Link href={'/(auth)/login'} style={{ color: theme.links, textAlign: 'center', fontWeight: 600 }}>Logout</Link>
          </SafeAreaView>
     )
}

export default index

const styles = StyleSheet.create({
     container: {
          paddingVertical: 20,
          paddingHorizontal: 30,
          justifyContent: 'center',
          gap: 30,
     },
     image: {
          width: 170,
          height: 170,
          alignSelf: 'center',
          borderWidth: 1,
          borderRadius: 10,
          paddingVertical: 5,
          paddingHorizontal: 5,
     },
     intro: {
          gap: 0,
          alignItems: 'center',
          marginVertical: 10,
     },
     interations: {
          marginTop: 20,
     },
})