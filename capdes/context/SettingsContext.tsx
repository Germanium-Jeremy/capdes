import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react"
import * as Location from 'expo-location'

interface SettingsContextValue {
     locationTracking: boolean;
     notifyOverApps: boolean;
     contactsAccess: boolean;
     saveLocationTracking: (value: boolean) => Promise<void>;
     saveNotifyOverApps: (value: boolean) => Promise<void>;
     saveContactsAccess: (value: boolean) => Promise<void>;
}


export const SettingsContext = createContext<SettingsContextValue>({
     locationTracking: false,
     notifyOverApps: false,
     contactsAccess: false,
     saveLocationTracking: async () => {},
     saveNotifyOverApps: async () => {},
     saveContactsAccess: async () => {},
});

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
     const [location, setLocation] = useState<Location.LocationObject | null>(null)
     const [errorMsg, setErrorMsg] = useState<string | null>(null)
     const [locationTracking, setLocationTracking] = useState(false);
     const [notifyOverApps, setNotifyOverApps] = useState(false);
     const [contactsAccess, setContactsAccess] = useState(false);

     const saveLocationTracking = async (value: boolean) => {
          try {
               // getCurrentLocation();
               await AsyncStorage.setItem("locationTracking", JSON.stringify(value));
               setLocationTracking(value);
               console.log("Location tracking setting saved successfully");
          } catch (error) {
               console.error("Error saving location tracking setting:", error);
          }
     };

     const saveNotifyOverApps = async (value: boolean) => {
          try {
               await AsyncStorage.setItem("notifyOverApps", JSON.stringify(value));
               setNotifyOverApps(value);
               console.log("Notify over apps setting saved successfully");
          } catch (error) {
               console.error("Error saving notify over apps setting:", error);
          }
     };

     const saveContactsAccess = async (value: boolean) => {
          try {
               await AsyncStorage.setItem("contactsAccess", JSON.stringify(value));
               setContactsAccess(value);
               console.log("Contacts access setting saved successfully");
          } catch (error) {
               console.error("Error saving contacts access setting:", error);
          }
     };

     const getSavedSettings = async () => {
          try {
               const locationTrackingValue = await AsyncStorage.getItem("locationTracking");
               const notifyOverAppsValue = await AsyncStorage.getItem("notifyOverApps");
               const contactsAccessValue = await AsyncStorage.getItem("contactsAccess");

               locationTrackingValue !== null ? setLocationTracking(JSON.parse(locationTrackingValue)) : setLocationTracking(false)
               notifyOverAppsValue !== null ? setNotifyOverApps(JSON.parse(notifyOverAppsValue)) : setNotifyOverApps(false)
               contactsAccessValue !== null ? setContactsAccess(JSON.parse(contactsAccessValue)) : setContactsAccess(false)
          } catch (error) {
               console.error("Error getting saved settings:", error);
          }
     };

     const getCurrentLocation = async () => {
          let { status } = await Location.requestForegroundPermissionsAsync()
          if (status !== 'granted') {
               setErrorMsg('Permission to access location was denied')
               return
          }

          let location = await Location.getCurrentPositionAsync({})
          setLocation(location)
     }

     useEffect(() => {
          getSavedSettings();
          // getCurrentLocation()
     }, []);

     // let text = "Waiting...";
     // if (errorMsg) {
     //      text = errorMsg;
     // } else if (location) {
     //      text = JSON.stringify(location);
     // }
     // console.log(text)

  return (
     <SettingsContext.Provider value={{ locationTracking, notifyOverApps, contactsAccess, saveLocationTracking, saveNotifyOverApps,saveContactsAccess }}>
          {children}
     </SettingsContext.Provider>
  );
};