import { useEffect, useState } from 'react';  
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';  
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { getFirestore } from "firebase/firestore"; // Ensure Firestore is initialized

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const { userID, bgColor, name } = route.params;
  const db = getFirestore(); // Initialize Firestore

  // Real-time listener using onSnapshot
  useEffect(() => {
    const messagesQuery = query(collection(db, 'messages'), orderBy("createdAt", "desc"));

    // Create onSnapshot listener
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const fetchedMessages = querySnapshot.docs.map(doc => {
        const data = doc.data();
        // Convert Firestore Timestamp to Date object
        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(), // Convert timestamp to Date
          user: data.user,
        };
      });

      setMessages(fetchedMessages); // Set messages to state
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();

  }, [db]); // Only re-run if db changes (on mount and unmount)

  const onSend = (newMessages) => {
    // Add the new message to Firestore
    addDoc(collection(db, "messages"), newMessages[0]);
  }

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000", // Sender's bubble
            width: '70%', // Adjust width of sender's bubble
          },
          left: {
            backgroundColor: "#FFF", // Receiver's bubble
            width: '70%', // Adjust width of receiver's bubble
          },
        }}
        textStyle={{
          right: { color: '#FFF' }, // Text color for sender
          left: { color: '#000' },  // Text color for receiver
        }}
      />
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.container, { backgroundColor: bgColor || '#FFFFFF' }]}>
        <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          onSend={messages => onSend(messages)}
          user={{
            _id: userID,  // Extract user ID from route params
            name: name,    // Extract name from route params
          }}
        />
        <View style={styles.inputContainer}>
          {/* Chat input area */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Align chat to bottom
  },
  inputContainer: {
    flexDirection: 'row', // Ensure input field and send button are side by side
    alignItems: 'center',
    paddingBottom: 20, // Padding to place input near the bottom
    marginBottom: Platform.OS === 'ios' ? 10 : 20, // Fine-tune position on iOS vs Android
  },
  chatText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
  },
});

export default Chat;
