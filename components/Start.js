import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const auth = getAuth();
  // State hooks to store the user's name and selected background color
  const [name, setName] = useState('');
  const [bgColor, setBgColor] = useState(null);

  // Predefined list of background colors for the user to choose from
  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  // Function to sign in the user anonymously and navigate to the Chat screen
  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        const userID = result.user.uid;  // Get user ID from the result
        navigation.navigate("Chat", {
          userID,     // Pass user ID as a parameter
          name,       // Pass user name as a parameter
          bgColor     // Pass selected background color as a parameter
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  return (
    <ImageBackground
      source={require('../assets/BackgroundImage.png')}  // Background image
      style={styles.backgroundImage}  // Style for the background
    >
      <KeyboardAvoidingView
        style={[styles.container, bgColor && { backgroundColor: bgColor }]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.innerContainer}>
            <Text style={styles.appTitle}>App Title</Text>

            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor="rgba(117, 112, 131, 0.5)"
            />

            <Text style={styles.chooseBgText}>Choose background color:</Text>

            <View style={styles.colorOptions}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[styles.colorCircle, { backgroundColor: color }]}
                  onPress={() => setBgColor(color)}  // Set background color
                />
              ))}
            </View>

            {/* "Start Chatting" Button - Calls signInUser on press */}
            <TouchableOpacity style={styles.startButton} onPress={signInUser}>
              <Text style={styles.startButtonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  appTitle: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  textInput: {
    width: '88%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#757083',
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
  },
  chooseBgText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    marginBottom: 10,
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 30,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  startButton: {
    backgroundColor: '#757083',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default Start;
