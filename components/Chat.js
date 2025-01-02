import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import MapView from 'react-native-maps';
import CustomActions from './CustomActions';

const Chat = ({ route, isConnected = false }) => {
  const [messages, setMessages] = useState([]);
  const { userID, bgColor, name } = route.params; // Extract userID, bgColor, and name from route params
  const db = getFirestore(); // Initialize Firestore instance

  // Listen for changes to the connection status and update messages accordingly
  useEffect(() => {
    const messagesQuery = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    let unsubscribe;

    if (isConnected) {
      unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
        const fetchedMessages = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: data.user,
            image: data.image,
            location: data.location, // Ensure location data is included
          };
        });

        setMessages(fetchedMessages); // Update the messages state
        AsyncStorage.setItem('cachedMessages', JSON.stringify(fetchedMessages)).catch((error) =>
          console.error('Failed to cache messages:', error)
        );
      });
    } else {
      AsyncStorage.getItem('cachedMessages')
        .then((cachedMessages) => {
          if (cachedMessages) setMessages(JSON.parse(cachedMessages));
        })
        .catch((error) => console.error('Failed to load cached messages:', error));
    }

    return () => unsubscribe && unsubscribe();
  }, [isConnected, db]);

  // Function to handle sending new messages
  const onSend = (newMessages = []) => {
    if (isConnected) {
      addDoc(collection(db, 'messages'), newMessages[0])
        .catch((error) => console.error('Failed to send message:', error));
    } else {
      console.warn('Cannot send messages while offline.');
    }
  };

  // Customize the message bubble style
  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: '#000', width: '70%' },
        left: { backgroundColor: '#FFF', width: '70%' },
      }}
      textStyle={{
        right: { color: '#FFF' },
        left: { color: '#000' },
      }}
    />
  );

  // Conditionally render the input toolbar only when connected
  const renderInputToolbar = (props) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    }
    return null;
  };

  // Render the custom actions button for image uploading and location sharing
  const renderCustomActions = (props) => (
    <CustomActions
      {...props}
      userID={userID} // Pass userID to generate unique image reference
    />
  );

  // Render custom view for location messages
  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3,
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: bgColor || '#FFFFFF' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <GiftedChat
            messages={messages}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
            renderActions={renderCustomActions} // Custom actions for image and location
            renderCustomView={renderCustomView} // Render custom view for locations
            onSend={onSend} // Handle sending messages
            user={{
              _id: userID,
              name: name,
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
