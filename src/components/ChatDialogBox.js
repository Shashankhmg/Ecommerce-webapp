import React, { useState, useEffect } from "react";
import axios from "axios";
import './ChatWindow.css'; 


const ChatDialogBox = ({ productId, onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [receiverId, setReceiverId] = useState(null);

  useEffect(() => {
    // Fetch the product data to get the receiver_id
    const getProductData = async () => {
      try {
        const productResponse = await axios.get(`http://127.0.0.1:8000/product/${productId}`);
        const productData = productResponse.data;
        const { user_id } = productData;
        setReceiverId(user_id);
      } catch (error) {
        console.log(error);
      }
    };

    // Call the getProductData function to fetch the product data
    getProductData();
  }, []);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    const senderId = localStorage.getItem("user_id");

    // Prepare the data to send to the backend API
    const data = {
      sender_id: senderId,
      receiver_id: receiverId,
      message: message,
    };

    // Send the chat message to the backend
    axios.post("http://127.0.0.1:8000/chat", data)
      .then((response) => {
        console.log(response.data); // Optional: Handle the response if needed
        onSendMessage(message); // Callback to parent component with the message
        setMessage(""); // Clear the input field
      })
      .catch((error) => {
        console.log(error); // Optional: Handle the error if needed
      });
  };

  return (
    <div className="chat-dialog">
      <h3>Chat with Seller</h3>
      <textarea
        className="message-input"
        value={message}
        onChange={handleInputChange}
        placeholder="Enter your message..."
      />
      <button className="send-button" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};

export default ChatDialogBox;