import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';

interface StyleProps {
     theme: typeof Colors.light | typeof Colors.dark | typeof Colors.custom;
     colorScheme: "light" | "dark" | "custom";
}

const index = () => {
     return (
          <>
               <Stack.Screen options={{ headerShown: true, header: () => <Header title='Chat' /> }} />
               <View>
                    <Text>Chat</Text>
               </View>
               <Footer />
          </>
     )
}

export default index

const styles = StyleSheet.create({})