import React from 'react';
import { View, Alert, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './path-to-your-storage'; // Firebase storage handler

// Function to generate a unique reference string for the uploaded image
const generateReference = (uri, userID) => {
  const timeStamp = new Date().getTime();
  const imageName = uri.split('/').pop();
  return `${userID}-${timeStamp}-${imageName}`;
};

const CustomActions = ({ onSend, userID }) => {
  // Standalone function for uploading the image and sending it as a message
  const uploadAndSendImage = async (imageURI) => {
    try {
      const uniqueRefString = generateReference(imageURI, userID);
      const newUploadRef = ref(storage, uniqueRefString);
      const response = await fetch(imageURI);
      const blob = await response.blob();

      // Upload the image and send the image URL as a message
      const snapshot = await uploadBytes(newUploadRef, blob);
      const imageURL = await getDownloadURL(snapshot.ref);
      onSend([{ image: imageURL }]);
    } catch (error) {
      console.error('Error uploading the image:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
    }
  };

  // Function to pick an image from the library
  const pickImage = async () => {
    try {
      const permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissions.granted) {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
          await uploadAndSendImage(result.assets[0].uri);
        } else {
          Alert.alert('No image selected', 'You didn’t select any image.');
        }
      } else {
        Alert.alert('Permissions Denied', 'Access to media library is required.');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  // Function to take a photo using the camera
  const takePhoto = async () => {
    try {
      const permissions = await ImagePicker.requestCameraPermissionsAsync();
      if (permissions.granted) {
        const result = await ImagePicker.launchCameraAsync();
        if (!result.canceled) {
          await uploadAndSendImage(result.assets[0].uri);
        } else {
          Alert.alert('No photo taken', 'You didn’t take any photo.');
        }
      } else {
        Alert.alert('Permissions Denied', 'Access to camera is required.');
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an Image" onPress={pickImage} />
      <Button title="Take a Photo" onPress={takePhoto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
});

export default CustomActions;
