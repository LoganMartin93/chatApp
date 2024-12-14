import { useEffect } from 'react';  // Importing useEffect hook for side effects
import { StyleSheet, View, Text } from 'react-native';  // Importing necessary components from React Native

const Chat = ({ route, navigation }) => {
  // Destructuring to extract 'name' and 'bgColor' from the route params passed from the Start screen
  const { name, bgColor } = route.params; // Retrieve name and bgColor from route.params

  // useEffect hook to set the navigation title when the component mounts or when 'name' changes
  useEffect(() => {
    navigation.setOptions({ title: name }); // Set the navigation title dynamically based on the 'name' prop
  }, [name, navigation]);  // Dependency array ensures the effect runs when 'name' or 'navigation' changes

  return (
    // View component to hold the chat screen content, applying dynamic background color
    <View style={[styles.container, { backgroundColor: bgColor || '#FFFFFF' }]}>
      {/* Text component displaying a greeting message */}
      <Text style={styles.chatText}>Hello, {name}!</Text>
    </View>
  );
};

// Styles for the Chat screen components
const styles = StyleSheet.create({
  // Style for the main container of the screen, centering content both vertically and horizontally
  container: {
    flex: 1,
    justifyContent: 'center',  // Centers content vertically
    alignItems: 'center',  // Centers content horizontally
  },
  // Style for the greeting text displayed in the chat
  chatText: {
    fontSize: 18,  // Font size for the greeting text
    fontWeight: '400',  // Font weight for the greeting text
    color: '#000000',  // Text color (black)
  },
});

// Exporting the Chat component to be used in other parts of the app
export default Chat;
