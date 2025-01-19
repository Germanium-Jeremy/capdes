import { Dimensions, FlatList, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';
import Header from '@/components/ui/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from '@/context/ThemeContext';

interface StyleProps {
     theme: typeof Colors.light | typeof Colors.dark | typeof Colors.custom;
     colorScheme: "light" | "dark" | "custom";
}

const NotificationScreen = () => {
     const { width, height } = Dimensions.get('window')
     const { colorScheme, theme } = useContext(ThemeContext);
     const styles = createStyles({ theme, colorScheme });

     const truncateText = (text: string, leng: number) => {
          if (text.length <= leng) return text
          return text.slice(0, leng) + "..."
     }

     const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView

     return (
          <>
               <Stack.Screen options={{ headerShown: true, header: () => <Header title='Notification' /> }} />
               <LinearGradient colors={[
                         theme.background.first,
                         theme.background.second,
                         theme.background.third,
                    ]}
                    start={{ x: 0, y: 0 }} end={{ x: width, y: height }} style={styles.container}>
                    <Container style={{ flexDirection: 'column', gap: 10 }}>
                         {/* <FlatList data={OurArray} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => ()} /> */}
                         {/* <FlatList data={[]} renderItem={({ }) => ( */}
                              {/* <LinearGradient colors={[theme.background.third, theme.background.second, theme.background.first]} style={styles.notificationContainer}>
                                   <Image source={require('@/assets/images/MaleUser.png')} resizeMode='contain' style={styles.image} />
                                   <View style={styles.notText}>
                                        <Text style={styles.noteTitle}>This is a notification</Text>
                                        <Text style={styles.noteDesc}>{truncateText(`The content of a notification goes here and in a small customised text. The content of a notification goes here and in a small customised text.`, 100)}</Text>
                                   </View>
                                   <Text style={styles.noteDate}>Mon, 22 Jun 2020</Text>
                              </LinearGradient> */}
                         {/* )} /> */}
                    </Container>
                    <View style={{ backgroundColor: colorScheme !== 'light' ? `${theme.mainColor}10` : '#0000', position: 'fixed', bottom: -100, left: -100, top: -100, width: 400, zIndex: -1, right: 0, borderRadius: '100%' }}></View>
                    <View style={{ backgroundColor: colorScheme !== 'light' ? `${theme.mainColor}10` : "#0000", position: 'fixed', bottom: -80, left: -70, right: -20, height: 200, zIndex: -1, borderRadius: '100%' }}></View>
               </LinearGradient>
          </>
     )
}

export default NotificationScreen

function createStyles({ theme, colorScheme }: StyleProps) {
     return StyleSheet.create({
          container: {
               flex: 1,
               padding: 20,
               paddingTop: 25,
          },
          textBtn: {
               fontSize: 18,
               fontWeight: 500,
               textAlign: "center",
               color: colorScheme === "dark" ? "#111" : "white",
          },
          notificationContainer: {
               flexDirection: 'row',
               gap: 15,
               alignItems: 'center',
               position: 'relative',
               borderRadius: theme.mainRadius,
               paddingVertical: 10,
               paddingHorizontal: 20,
          },
          image: {
               width: 100,
               height: 100,
               borderRadius: '100%',
               borderWidth: 2,
               borderColor: theme.mainColor,
          },
          notText: {
               flexDirection: 'column',
               alignItems: 'flex-start',
               gap: 10,
               width: '75%'
          },
          noteTitle: {
               fontSize: 20,
               fontWeight: 600,
               color: theme.secondTextColor
          },
          noteDesc: {
               fontSize: 15,
               fontWeight: 400,
               color: theme.secondTextColor,
               width: '100%',
               flexWrap: 'wrap',
               paddingBottom: 20,
          },
          noteDate: {
               position: 'absolute',
               bottom: 4,
               right: 10,
               fontSize: 15,
               fontWeight: 400,
               color: theme.secondTextColor
          },
     })
}