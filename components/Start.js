import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

const Start = ({ navigation }) => {
  // State hooks to store the user's name and selected background color
  const [name, setName] = useState('');
  const [bgColor, setBgColor] = useState(null);

  // Predefined list of background colors for the user to choose from
  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  return (
    // ImageBackground component to set the background image of the screen
    <ImageBackground
      source={require('../assets/BackgroundImage.png')}  // Directly require the image for background
      style={styles.backgroundImage}  // Style for ImageBackground to cover the screen
    >
      {/* Wrap everything in KeyboardAvoidingView to adjust layout when keyboard is shown */}
      <KeyboardAvoidingView
        style={[styles.container, bgColor && { backgroundColor: bgColor }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  // Set behavior based on the platform
      >
        {/* Main container for the content */}
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          {/* Dismissing the keyboard when tapping outside the input field */}
          <View style={styles.innerContainer}>
            {/* App Title Text */}
            <Text style={styles.appTitle}>App Title</Text>

            {/* TextInput component for entering the user's name */}
            <TextInput
              style={styles.textInput}  // Styling for the input field
              value={name}  // The state value that holds the input text
              onChangeText={setName}  // Function to update the name state as the user types
              placeholder="Your name"  // Placeholder text for the input field
              placeholderTextColor="rgba(117, 112, 131, 0.5)"  // Color of the placeholder text
            />

            {/* Text prompt asking the user to choose a background color */}
            <Text style={styles.chooseBgText}>Choose background color:</Text>

            {/* View to hold color options */}
            <View style={styles.colorOptions}>
              {/* Loop through the colors array to create clickable color circles */}
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}  // Unique key for each color option
                  style={[styles.colorCircle, { backgroundColor: color }]}  // Circle style with dynamic background color
                  onPress={() => setBgColor(color)}  // Set the selected background color when clicked
                />
              ))}
            </View>

            {/* Button to start chatting, navigating to the 'Chat' screen */}
            <TouchableOpacity
              style={styles.chatButton}  // Style for the button
              onPress={() => navigation.navigate('Chat', { name, bgColor })}  // Navigate to 'Chat' with name and selected color as params
            >
              <Text style={styles.chatButtonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  // Style for the ImageBackground to cover the entire screen
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  // Main container that holds the main content
  container: {
    flex: 1,
  },
  // Inner container for proper layout inside KeyboardAvoidingView
  innerContainer: {
    flex: 1,
    justifyContent: 'center',  // Center the content vertically
    alignItems: 'center',  // Center the content horizontally
    padding: 20,  // Padding around the container
  },
  // Style for the app title text
  appTitle: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',  // White color for the title
    marginBottom: 30,  // Space below the title
  },
  // Style for the username input field
  textInput: {
    width: '88%',  // Input field width
    padding: 15,  // Padding inside the input field
    borderWidth: 1,  // Border width for the input
    borderColor: '#757083',  // Border color
    borderRadius: 5,  // Rounded corners for the input
    marginBottom: 20,  // Space below the input field
    fontSize: 16,  // Font size for the input text
    fontWeight: '300',  // Font weight
    color: '#757083',  // Color of the input text
  },
  // Style for the background color selection text
  chooseBgText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',  // Color of the text
    marginBottom: 10,  // Space below the text
  },
  // View that holds the color circle options
  colorOptions: {
    flexDirection: 'row',  // Arrange color circles in a row
    justifyContent: 'space-between',  // Evenly space the circles
    width: '60%',  // Set the width for the color options view
    marginBottom: 30,  // Space below the color options
  },
  // Style for each color circle
  colorCircle: {
    width: 50,  // Width of the color circle
    height: 50,  // Height of the color circle
    borderRadius: 25,  // Make it circular (half of width/height)
    marginHorizontal: 5,  // Space between color circles
  },
  // Style for the start chatting button
  chatButton: {
    backgroundColor: '#757083',  // Background color for the button
    paddingVertical: 15,  // Vertical padding inside the button
    paddingHorizontal: 50,  // Horizontal padding inside the button
    borderRadius: 5,  // Rounded corners for the button
  },
  // Style for the text inside the start chatting button
  chatButtonText: {
    fontSize: 16,  // Font size for the button text
    fontWeight: '600',  // Font weight for the button text
    color: '#FFFFFF',  // White color for the text
  },
});

// Exporting the Start component to be used in other parts of the app
export default Start;
