import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatWindow.css'; 


const ChatWindow = () => {
  const [chatConversations, setChatConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  const senderId = localStorage.getItem('user_id');

  useEffect(() => {
    fetchChatConversations();
  }, []);

  const fetchChatConversations = () => {
    axios.get(`http://127.0.0.1:8000/chat?sender_id=${senderId}`)
      .then(response => {
        setChatConversations(response.data);
      })
      .catch(error => {
        console.error('Error fetching chat conversations:', error);
      });
  };

  const handleConversationSelect = (conversationId) => {
    setSelectedConversation(conversationId);
  };

  const renderConversationButtons = () => {
    const firstNames = chatConversations.map(conversation => {
      if (conversation.messages.length > 0) {
        return conversation.messages[0].firstName;
      } else {
        return 'Unknown';
      }
    });
  
    return chatConversations.map((conversation, index) => {
      const conversationId = conversation.receiver_id;
      const firstName = conversation.reciever_name;
      const conversationName = `Conversation with ${firstName}`;
  
      return (
        <button
          key={index}
          className={selectedConversation === firstName ? 'conversation-button selected' : 'conversation-button'}
          onClick={() => handleConversationSelect(conversationId)}
        >
          {conversationName}
        </button>
      );
    });
  };  
  

 
  const renderChatMessages = () => {
    if (!selectedConversation) {
      return null;
    }
  
    const selectedConversationObj = chatConversations.find(conv => conv.receiver_id === selectedConversation);
    const messages = selectedConversationObj ? selectedConversationObj.messages : [];
  
    // Sort messages based on timestamp
    const sortedMessages = [...messages].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  
    return (
      <div className="chat-messages">
        {sortedMessages.map((msg, index) => {
          const formattedTimestamp = new Date(msg.timestamp).toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'GMT'
          });
  
          return (
            <div key={index} className="chat-message">
              {msg.type === 'sent' ? (
                <div>
                  <strong>You:</strong> {msg.message}
                </div>
              ) : (
                <div>
                  <strong>{msg.sender_id}:</strong> {msg.message}
                </div>
              )}
              <span className="timestamp">{formattedTimestamp}</span>
            </div>
          );
        })}
        {selectedConversationObj && selectedConversationObj.messages.length > 0 && (
          <div className="reply-section">
            <input
              type="text"
              value={messageInput}
              onChange={e => setMessageInput(e.target.value)}
              placeholder="Reply"
            />
            <button onClick={() => replyToMessage(sortedMessages[sortedMessages.length - 1])}>
              Send Reply
            </button>
          </div>
        )}
      </div>
    );
  };  
  

  const replyToMessage = (message) => {
    const data = {
      sender_id: senderId,
      receiver_id: message.sender_id,
      message: messageInput
    };

    console.log('Sending reply:', data);

    axios.post('http://127.0.0.1:8000/chat', data)
      .then(response => {
        console.log('Reply sent:', response.data);
        setMessageInput('');
        fetchChatConversations();
      })
      .catch(error => {
        console.error('Error sending reply:', error);
      });
  };

  return (
    <div className="chat-window">
      <div className="conversation-buttons">{renderConversationButtons()}</div>
      <div className="chat-messages">{renderChatMessages()}</div>
    </div>
  );
};

export default ChatWindow;