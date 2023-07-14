import React, { useState } from "react";
import "./ProductPage.css";
import ReactDOM from "react-dom";
import ChatWindow from "./ChatWindow";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastHeader } from "react-bootstrap";
import myoffers from "./myoffers";
import MyOffers from "./myoffers";

function AddProduct() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState("");
  const [price, setPrice] = useState("");
  const [offer, setOffer] = useState("");
  const [offerDuration, setOfferDuration] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [image, setImage] = useState([]);
  const [isProductAdded, setIsProductAdded] = useState(false);

  const [imageBinaryData, setImageBinaryData] = useState(null);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleProductChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCountChange = (event) => {
    setCount(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleOfferChange = (event) => {
    setOffer(event.target.value);
  };

  const handleOfferDurationChange = (event) => {
    setOfferDuration(event.target.value);
  };

  const redirectToMyOffers = () => {
    ReactDOM.render(<MyOffers />, document.getElementById("root"));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const priceInt = parseInt(price, 10);

    if (isNaN(priceInt) || priceInt <= 0 || priceInt % 1 !== 0) {
      console.error("Error: Invalid price");
      return;
    }

    const offerInt = parseInt(offer, 10);

    if (
      isNaN(offerInt) ||
      offerInt < 0 ||
      offerInt > 100 ||
      offerInt % 1 !== 0
    ) {
      console.error("Error: Invalid offer");
      return;
    }

    const offerDurationInt = parseInt(offerDuration, 10);

    if (
      isNaN(offerDurationInt) ||
      offerDurationInt <= 0 ||
      offerDurationInt % 1 !== 0
    ) {
      console.error("Error: Invalid offer duration");
      return;
    }

    const userId = localStorage.getItem("user_id"); // Retrieve userId from session storage

    if (!userId) {
      console.error("Error: User ID not found");
      return;
    }
    toast("Product added successfuly!");

    const formData = {
      userId,
      category,
      name,
      description,
      price: priceInt,
      count,
      offer: offerInt,
      offerDuration: offerDurationInt,
      imageBinary: imageBinaryData,
    };

    console.log("Form Data:", formData); // Log the form data

    try {
      const response = await fetch("http://localhost:8000/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Handle the JSON response data here
        setIsProductAdded(true); // Set isProductAdded to true
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getProductOptions = () => {
    switch (category) {
      case "Category 1":
        return [
          "Tomatoes",
          "Beans",
          "Cucumber",
          "Ladies Finger",
          "Potatoes",
          "Onion",
          "Ingwer",
          "Carrot",
          "Spinach",
        ];
      case "Category 2":
        return [
          "Bread",
          "Bun",
          "Croissant",
          "Baguette",
          "Donuts",
          "Cup Cakes",
          "Pastries",
        ];
        case 'Category 3':
          return [
            'Banana',
            'Strawberry',
            'Mangoes',
            'Orange',
            'Apple',
            'Litchi',
            'Berries',
            'Grapes',
          ];
      case "Category 4":
        return [
          "Chicken",
          "Beef",
          "Mutton",
          "Pork",
          "Salmon",
          "Duck",
          "Turkey",
        ];
      default:
        return [];
    }
  };

  const getCountOptions = () => {
    return Array.from({ length: 10 }, (_, i) => String(i + 1));
  };

  const toggleChat = () => {
    const newWindow = window.open("", "_blank");
    newWindow.document.write(
      '<html><body><div id="chat-root"></div></body></html>'
    );
    newWindow.document.close();

    const chatContainer = newWindow.document.getElementById("chat-root");
    ReactDOM.render(<ChatWindow />, chatContainer);
  };

  // function handleImage(e) {
  //   console.log(e.target.file);
  //   setImage(e.target.files[0]);
  // }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const binaryString = reader.result;
        setImageBinaryData(binaryString);
        console.log(binaryString);
      };

      reader.onerror = (error) => {
        console.error("Error:", error);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="product-page">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            <option value="Category 1">Fresh Vegetables</option>
            <option value="Category 2">Bakery Products</option>
            <option value="Category 3">Fruits</option>
            <option value="Category 4">Meat</option>
          </select>
        </div>

        {category && (
          <div className="form-group">
            <label htmlFor="product">Product:</label>
            <select id="product" value={name} onChange={handleProductChange}>
              <option value="">Select a product</option>
              {getProductOptions().map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="quantity">Count:</label>
          <select id="quantity" value={count} onChange={handleCountChange}>
            <option value="">Select a count</option>
            {getCountOptions().map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={handlePriceChange}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="offer">Offer (%):</label>
          <input
            type="number"
            id="offer"
            value={offer}
            onChange={handleOfferChange}
            placeholder="Enter offer"
            min="0"
            max="100"
            required
          />
          <input type="file" name="file" onChange={handleImageUpload} />
          {/* <button onClick={handleApi}>Submit</button> */}
        </div>

        <div className="form-group">
          <label htmlFor="offer-duration">Offer Duration (hours):</label>
          <input
            type="number"
            id="offer-duration"
            value={offerDuration}
            onChange={handleOfferDurationChange}
            placeholder="Enter offer duration"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Product Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>

        <button type="submit">Submit</button>

        {isProductAdded && (
          <div className="success-message">Product added successfully!</div>
        )}

        {/* Chat Button */}
        <button className="chat-button" onClick={toggleChat}>
          {showChat ? "Close Chat" : "Open Chat"}
        </button>

        {/* Chat Component */}
        {/* Render the chat window component conditionally based on showChat state */}
        {showChat && <ChatWindow />}
        <button className="myoffers" onClick={redirectToMyOffers}>
          My Offers
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
