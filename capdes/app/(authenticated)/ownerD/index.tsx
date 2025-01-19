import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Colors } from '@/constants/Colors';
import { ThemeContext } from '@/context/ThemeContext';
import { Stack } from 'expo-router';
import Header from '@/components/ui/Header';
import { LinearGradient } from 'expo-linear-gradient';
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
               <Stack.Screen options={{ header: () => <Header title='Owner Dashboard' /> }} />
               <LinearGradient colors={[
                         theme.background.first,
                         theme.background.second,
                         theme.background.third,
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: width, y: height }}
                    style={styles.container}>
                    <View style={styles.garageAds}>
                         <Image source={require('@/assets/images/Design3.png')} resizeMode='cover' style={styles.garageImage} />
                         <Text style={{ position: 'absolute', top: 10, right: 20, color: theme.secondTextColor, fontSize: 20 }}>Garage name</Text>
                         <Text style={{ position: 'absolute', top: 35, right: 20, color: theme.secondTextColor, fontSize: 15 }}>Garage Motto</Text>
                         <Text style={{ position: 'absolute', bottom: 10, left: 20, color: theme.secondTextColor, fontSize: 14 }}>Starting date</Text>
                         <Text style={{ position: 'absolute', bottom: 10, right: 20, color: theme.secondTextColor, fontSize: 14 }}>Working hours</Text>
                    </View>

                    <Text style={{ color: theme.secondTextColor, fontSize: 20, fontWeight: 500, textAlign: 'center', marginTop: 20 }}>
                         MANAGE MECHANIC
                    </Text>

                    <View style={styles.allMechs}>
                         <View style={styles.allMechsSingle}>
                              <Text style={{ fontSize: 18, fontWeight: 400 }}>Approved</Text>
                              <View style={{ paddingLeft: 20 }}>
                                   Mechanic 1 <br /> Mechanic 2
                              </View>
                              <Pressable style={styles.buttons}>
                                   <Text style={styles.textBtn}>View More</Text>
                              </Pressable>
                              <Text style={styles.allMechsNumber}>22</Text>
                         </View>
                         
                         <View style={styles.allMechsSingle}>
                              <Text style={{ fontSize: 18, fontWeight: 400 }}>Unapproved</Text>
                              <View style={{ paddingLeft: 20 }}>
                                   Mechanic 1 <br /> Mechanic 2
                              </View>
                              <Pressable style={styles.buttons}>
                                   <Text style={styles.textBtn}>View More</Text>
                              </Pressable>
                              <Text style={styles.allMechsNumber}>100</Text>
                         </View>
                    </View>

                    <View style={[styles.allMechsSingle, { alignSelf: 'center' }]}>
                         <Text style={{ fontSize: 18, fontWeight: 400 }}>Disapproved</Text>
                         <View style={{ paddingLeft: 20 }}>
                              Mechanic 1 <br /> Mechanic 2
                         </View>
                         <Pressable style={styles.buttons}>
                              <Text style={styles.textBtn}>View More</Text>
                         </Pressable>
                         <Text style={styles.allMechsNumber}>0</Text>
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
          garageAds: {
               position: 'relative',
               height: 150,
               width: '100%',
               overflow: 'hidden',
               backgroundColor: '#222',
          },
          garageImage: {
               width: '100%',
               height: '100%',
               zIndex: -1,
          },
          allMechs: {
               flexDirection: 'row',
               gap: 10,
               justifyContent: 'space-between',
               alignItems: 'center',
               marginVertical: 30,
               paddingHorizontal: 20,
          },
          allMechsSingle: {
               borderRadius: theme.mainRadius,
               backgroundColor: theme.background.first,
               paddingVertical: 10,
               paddingHorizontal: 20,
               shadowOffset: {
                    height: 2,
                    width: 1,
               },
               shadowColor: theme.secondTextColor,
               shadowOpacity: 0.5,
               shadowRadius: .35,
               width: '45%',
               position: 'relative',
          },
          buttons: {
               backgroundColor: theme.mainColor,
               color: theme.textColor,
               borderRadius: theme.mainRadius,
               paddingVertical: 5,
               paddingHorizontal: 10,
               marginTop: 10,
               shadowOffset: { width: 1, height: 2 },
               shadowColor: theme.mainIconColor,
               shadowOpacity: .4,
          },
          textBtn: {
               fontSize: 15,
               fontWeight: 300,
               textAlign: "center",
               color: colorScheme === "dark" ? "#111" : "white",
          },
          allMechsNumber: {
               position: 'absolute',
               top: -5,
               right: -5,
               width: 20,
               height: 20,
               justifyContent: 'center',
               alignItems: 'center',
               color: colorScheme === 'dark' ? '#000' : "#FFF",
               backgroundColor: theme.mainColor,
               borderRadius: '100%',
               fontSize: 12,
               fontWeight: 300,
               overflow: 'hidden',
               display: 'flex',
          }
     })
}