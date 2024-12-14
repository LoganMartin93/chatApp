import { StyleSheet, View, Text, Button } from 'react-native';  // Import necessary components from React Native
import Start from './components/Start';  // Import Start component for the initial screen
import Chat from './components/Chat';  // Import Chat component to display the chat screen
import { NavigationContainer } from '@react-navigation/native';  // Import NavigationContainer for navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';  // Import the stack navigator from React Navigation

export default function App() {

  // Create the navigator (Stack) using createNativeStackNavigator
  const Stack = createNativeStackNavigator();

  return (
    // Wrap the entire app in NavigationContainer to manage navigation state
    <NavigationContainer>
      {/* Set up the stack navigator with an initial route and screens */}
      <Stack.Navigator
        initialRouteName="Start"  // Set the initial screen to 'Start'
      >
        {/* Define the 'Start' screen and link it to the Start component */}
        <Stack.Screen
          name="Start"
          component={Start}  // Start screen will render the Start component
        />
        {/* Define the 'Chat' screen and link it to the Chat component */}
        <Stack.Screen
          name="Chat"
          component={Chat}  // Chat screen will render the Chat component
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles for the App component (not used here but could be expanded for styling)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',  // White background color
    alignItems: 'center',  // Center content horizontally
    justifyContent: 'center',  // Center content vertically
  },
});
