import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '@/Contexts/ThemeContext';
import AllStyles from '@/app/styles/style';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Index = () => {
     const { colorScheme, theme } = useContext(ThemeContext);
     const allStyles = AllStyles({ theme, colorScheme });
     const [viewMechanics, setViewMechanics] = useState<boolean>(true);
     const [menuVisible, setMenuVisible] = useState<number | null>(null); // Store ID of the item whose menu is visible
          
     const changeViewMechs = () => {
          setViewMechanics((prev) => !prev);
     };

     const handleMenuPress = (id: number) => {
          // Handle the menu action based on the selected item's ID
          console.log(`Menu action for item ID: ${id}`);
          // You can call any function here with the ID
     };

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
          const isMenuVisible = menuVisible === item.id;

          return (
               <View style={[styles.work, { borderColor: theme.text }]}>
                    <Image source={require('@/assets/images/Design1.png')} resizeMode='contain' style={styles.recordImage} />
                    <View style={{ gap: 0 }}>
                         <Text style={[styles.listText, { color: theme.text }]}>{item.name}</Text>
                         <Text style={[styles.listText, { color: theme.text }]}>{viewMechanics ? item.email : item.location}</Text>
                         <Text style={[styles.listText, { color: theme.text }]}>{item.phone}</Text>
                    </View>
                    <MaterialIcons name='more-vert' size={28} color={theme.text} style={styles.more} onPress={() => setMenuVisible(isMenuVisible ? null : item.id)} />

                    {isMenuVisible && (
                         <View style={[styles.menuDisplay, { backgroundColor: theme.background }]}>
                              <Text style={[styles.menuText, { color: theme.text }]} onPress={() => handleMenuPress(item.id)}>Call</Text>
                              <Text style={[styles.menuText, { color: theme.text }]} onPress={() => handleMenuPress(item.id)}>Chat</Text>
                              <Text style={[styles.menuText, { color: theme.text }]} onPress={() => handleMenuPress(item.id)}>Profile</Text>
                              <Text style={[styles.menuText, { color: theme.text }]} onPress={() => handleMenuPress(item.id)}>Report</Text>
                         </View>
                    )}
               </View>
          );
     };
     
     return (
          <SafeAreaView style={[allStyles.allPages, styles.container]}>
               <Pressable style={[styles.toggleButton, { borderColor: theme.links }]} onPress={changeViewMechs}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '50%', backgroundColor: !viewMechanics ? theme.links : theme.background }}>
                         <Text style={{ color: !viewMechanics ? 'white' : theme.links, fontWeight: '500' }}>Garages</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '50%', backgroundColor: viewMechanics ? theme.links : theme.background }}>
                         <Text style={{ color: viewMechanics ? 'white' : theme.links, fontWeight: '500' }}>Mechanics</Text>
                    </View>
               </Pressable>

               <View style={[allStyles.inputs, { flexDirection: 'row', marginTop: 10, gap: 10, paddingVertical: 5 }]}>
                    <Ionicons name='search' size={25} color={theme.formInputsTxt} />
                    <TextInput placeholder='Search' placeholderTextColor={theme.formInputsPlaceholders} style={{ width: '100%', padding: 5, color: theme.text }} />
               </View>

               <View style={{ paddingVertical: 20, gap: 10 }}>
                    {(!viewMechanics ? garages : mechanics).map((item) => (
                         <ListItem key={item.id} item={item} />
                    ))}
               </View>
          </SafeAreaView>
     );
};

export default Index;

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
          fontSize: 20,
          fontWeight: '600',
     },
     work: {
          paddingVertical: 3,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          borderBottomWidth: 1,
          position: 'relative',
     },
     recordImage: {
          width: 50,
          height: 50,
          borderRadius: 100
     },
     listText: {
          color: '#333', // Adjust according to your theme
          fontSize: 16,
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
          color: '#333', // Adjust according to your theme
          fontSize: 12,
          paddingVertical: 2,
     },
});
