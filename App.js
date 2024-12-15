import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { StyleSheet, View, Text, Button } from 'react-native';
import Start from './components/Start';  // Initial screen
import Chat from './components/Chat';  // Chat screen
import { NavigationContainer } from '@react-navigation/native';  // Navigation container
import { createNativeStackNavigator } from '@react-navigation/native-stack';  // Stack navigator

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

// Main App component
const App = () => {
  // Create the navigator (Stack)
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
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
