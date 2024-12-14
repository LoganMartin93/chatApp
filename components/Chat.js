import { useEffect, useState } from 'react';  
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';  
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);

  const { name, bgColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name || "Chat" });

    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "You've entered the chat!",
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, [name, navigation]);

  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
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
            _id: 1
          }}
        />
        {/* Text Input Area */}
        <View style={styles.inputContainer}>
          {/* This container holds the chat input */}
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
