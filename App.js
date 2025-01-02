import React, { useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';  // Navigation container
import { createNativeStackNavigator } from '@react-navigation/native-stack';  // Stack navigator
import { useNetInfo } from '@react-native-community/netinfo';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore, enableNetwork, disableNetwork } from "firebase/firestore";
import Start from './components/Start';  // Initial screen
import Chat from './components/Chat';  // Chat screen
import { getStorage } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBHXIhN2mOJxES_tVPvhjd53_cBJT710u8",
  authDomain: "chatapp-9bec3.firebaseapp.com",
  projectId: "chatapp-9bec3",
  storageBucket: "chatapp-9bec3.firebasestorage.app",
  messagingSenderId: "479388713798",
  appId: "1:479388713798:web:e1693e0502d497759e1b47"
};

// Initialize Firebase app (avoiding multiple initializations)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase services
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const storage = getStorage(app);

const App = () => {
  const Stack = createNativeStackNavigator();
  const connectionStatus = useNetInfo(); // Hook to monitor network status
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
        {props => <Chat isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles for the App component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
