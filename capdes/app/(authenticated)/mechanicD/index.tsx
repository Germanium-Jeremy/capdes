import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface StyleProps {
     theme: typeof Colors.light | typeof Colors.dark | typeof Colors.custom;
     colorScheme: "light" | "dark" | "custom";
}

const index = () => {
     const { width, height } = Dimensions.get('window')
     const { colorScheme, theme } = useContext(ThemeContext);
     const styles = createStyles({ theme, colorScheme });
          
     return (
          <>
               <Stack.Screen options={{ header: () => <Header title='Mechanic Dashboard' /> }} />
               <LinearGradient colors={[
                         theme.background.first,
                         theme.background.second,
                         theme.background.third,
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: width, y: height }}
                    style={styles.container}>
                    <View style={styles.top}>
                         <View style={{ borderRadius: '100%', borderWidth: 1, borderColor: theme.mainColor, padding: 1, width: 80, height: 80 }}>
                              <Image source={require('@/assets/images/MaleUser.png')} resizeMode='contain' style={styles.profile} />
                         </View>
                         <View style={styles.topSummary}>
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: theme.secondIconColor }}>
                                   <Text style={{ color: theme.secondTextColor, fontSize: 15, fontWeight: 300 }}>Recent calls</Text>
                                   <Ionicons name='time' color={theme.secondTextColor} size={15} />
                              </View>
                              <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 30, paddingTop: 10 }}>
                                   <View style={{ position: 'relative' }}>
                                        <Ionicons name='call' color={theme.secondTextColor} size={25} />
                                        <Text style={styles.numbers}>2</Text>
                                   </View>
                                   <View>
                                        <Ionicons name='chatbox' color={theme.secondTextColor} size={25} />
                                        <Text style={styles.numbers}>2</Text>
                                   </View>
                              </View>
                         </View>
                    </View>

                    <View style={styles.workingHours}>
                         <Ionicons name='time' size={40} color={theme.secondTextColor} />
                         <View style={{  }}>
                              <Text style={styles.timeStart}>Start</Text>
                              <Text style={styles.timeStart}>End</Text>
                         </View>
                    </View>

                    <Text style={{ color: theme.secondTextColor, fontSize: 18, paddingTop: 30, paddingBottom: 10 }}>Previous Work</Text>

                    <View style={styles.flatListContainer}>
                         <View style={styles.prevWork}>
                              <Image source={require('@/assets/images/MaleUser.png')} resizeMode='contain' style={styles.prevImage} />
                              <View style={{ flexDirection: 'column', justifyContent: 'center', position: 'relative', width: '87%', paddingBottom: 20 }}>
                                   <Text style={{ fontSize: 14, fontWeight: 200, color: theme.secondTextColor }}>The problem that happened</Text>
                                   <Text style={{ fontSize: 14, fontWeight: 200, color: theme.secondTextColor }}>Client: +250 700 000 000</Text>
                                   <Text style={{ position: 'absolute', bottom: 0, right: 0, color: theme.secondTextColor, fontSize: 10 }}>12 34 5454</Text>
                              </View>
                         </View>
                         
                         <View style={styles.prevWork}>
                              <Image source={require('@/assets/images/MaleUser.png')} resizeMode='contain' style={styles.prevImage} />
                              <View style={{ flexDirection: 'column', justifyContent: 'center', position: 'relative', width: '87%', paddingBottom: 20 }}>
                                   <Text style={{ fontSize: 14, fontWeight: 200, color: theme.secondTextColor }}>The problem that happened</Text>
                                   <Text style={{ fontSize: 14, fontWeight: 200, color: theme.secondTextColor }}>Client: +250 700 000 000</Text>
                                   <Text style={{ position: 'absolute', bottom: 0, right: 0, color: theme.secondTextColor, fontSize: 10 }}>12 34 5454</Text>
                              </View>
                         </View>
                    </View>

                    <View style={{ backgroundColor: colorScheme !== 'light' ? `${theme.mainColor}10` : '#0000', position: 'fixed', bottom: -100, left: -100, top: -100, width: 400, zIndex: -1, right: 0, borderRadius: '100%' }}></View>
                    <View style={{ backgroundColor: colorScheme !== 'light' ? `${theme.mainColor}10` : "#0000", position: 'fixed', bottom: -80, left: -70, right: -20, height: 200, zIndex: -1, borderRadius: '100%' }}></View>
                    </LinearGradient>
               <Footer />
          </>
     )
}

export default index

function createStyles({ theme, colorScheme }: StyleProps) {
     return StyleSheet.create({
          container: {
               flex: 1,
               paddingTop: 25,
               padding: 20,
               overflow: "hidden",
          },
          top: {
               flexDirection: "row",
               gap: 20,
               alignItems: 'center',
               justifyContent: 'space-between'
          },
          profile: {
               width: '100%',
               height: '100%',
               borderRadius: '100%',
               borderWidth: 1,
               borderColor: theme.mainColor,
          },
          topSummary: {
               width: '70%',
               backgroundColor: theme.background.first,
               paddingVertical: 5,
               paddingHorizontal: 20,
               borderRadius: theme.mainRadius,
               shadowColor: theme.secondTextColor,
               shadowOffset: { width: 0, height: 2 },
               shadowOpacity: 0.5,
               shadowRadius: 3.84,
          },
          numbers: {
               color: theme.textColor,
               backgroundColor: theme.mainColor,
               position: 'absolute',
               top: -8,
               right: -5,
               borderRadius: '100%',
               height: 20,
               width: 20,
               justifyContent: 'center',
               alignItems: 'center',
               display: 'flex'
          },
          workingHours: {
               paddingTop: 40,
               flexDirection: 'row',
               gap: 20,
          },
          timeStart: {
               color: theme.secondTextColor,
               fontSize: 15,
               fontWeight: 300,
          },
          flatListContainer: {
               flexDirection: 'column',
               gap: 5,
          },
          prevWork: {
               borderRadius: theme.mainRadius,
               borderWidth: 1,
               borderColor: theme.mainColor,
               paddingVertical: 6,
               paddingHorizontal: 10,
               backgroundColor: theme.background.first,
               flexDirection: 'row',
               gap: 20,
               alignItems: 'center',
          },
          prevImage: {
               height: 40,
               width: 40,
               borderRadius: '100%',
               borderWidth: 1,
               borderColor: theme.mainColor,
          }
     });
}