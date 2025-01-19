import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Colors } from '@/constants/Colors';
import { Stack } from 'expo-router';
import Header from '@/components/ui/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from '@/context/ThemeContext';
import Footer from '@/components/ui/Footer';

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
               <Stack.Screen options={{ header: () => <Header title='All Mechanics' /> }} />
               <LinearGradient colors={[
                         theme.background.first,
                         theme.background.second,
                         theme.background.third,
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: width, y: height }}
                    style={styles.container}>
                    <Text style={{ color: theme.secondTextColor, fontSize: 20, fontWeight: 600, textAlign: 'center', marginTop: 20 }}>Mechanic List</Text>

                    <View style={styles.flatListContainer}>
                         <View style={styles.mechanic}>
                              <Image style={styles.mechImage} source={require('@/assets/images/MaleUser.png')} resizeMode='contain' />
                              <View style={{ flexDirection: 'column', gap: 1, width: '100%' }}>
                                   <Text style={{ color: theme.secondTextColor, fontSize: 12 }}>John Doe</Text>
                                   <Text style={{ color: theme.secondTextColor, fontSize: 12 }}>email@example.domain</Text>
                                   <Text style={{ color: theme.secondTextColor, fontSize: 12 }}>+250 780 000 000</Text>
                                   <Pressable style={styles.buttons}>
                                        <Text style={styles.textBtn}>Disapprove</Text>
                                   </Pressable>
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
               overflow: "hidden",
          },
          flatListContainer: {
               flexDirection: 'column',
               gap: 5,
               padding: 20,
          },
          mechanic: {
               borderWidth: 1,
               borderColor: theme.secondIconColor,
               paddingVertical: 10,
               paddingHorizontal: 20,
               borderRadius: theme.mainRadius,
               flexDirection: 'row',
               gap: 10,
               backgroundColor: theme.background.first,
               alignItems: 'center',
          },
          mechImage: {
               width: 50,
               height: 50,
               borderRadius: '100%',
          },
          buttons: {
               backgroundColor: theme.mainColor,
               color: theme.textColor,
               borderRadius: theme.mainRadius,
               paddingVertical: 5,
               paddingHorizontal: 10,
               marginTop: 4,
               shadowOffset: { width: 1, height: 2 },
               shadowColor: theme.mainIconColor,
               shadowOpacity: .4,
               width: '30%',
          },
          textBtn: {
               fontSize: 15,
               fontWeight: 300,
               textAlign: "center",
               color: colorScheme === "dark" ? "#111" : "white",
          },
     })
}