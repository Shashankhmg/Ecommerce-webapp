import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cartLocal, setCartLocal] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [showCartPopup, setShowCartPopup] = useState(true);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  let url = "http://127.0.0.1:8000/addproduct";

  const itemsInCart = JSON.parse(localStorage.getItem("itemsInCart"));

  useEffect(() => {
    setCartLocal(itemsInCart);
    setShowCartPopup(true);
  }, []);

  useEffect(() => {
    const count = cartLocal.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(count);
  }, [cartLocal]);

  useEffect(() => {
    handlePlaceOrder();
  }, [orderPlaced]);
  const handlePlaceOrder = () => {
    console.log("inside");
    if (cartLocal.length > 0 && address && city && state && pincode) {
      const items = cartLocal.map((item) => ({
        product_name: item.name,
        quantity: item.quantity,
      }));

      const orderData = {
        address: address,
        city: city,
        state: state,
        pincode: pincode,
        items: items,
      };

      fetch("http://127.0.0.1:8000/placeorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message); // Success message from the server
          setCartLocal([]); // Clear the cart
          setAddress(""); // Clear the address field
          setCity(""); // Clear the city field
          setState(""); // Clear the state field
          setPincode(""); // Clear the pincode field
          localStorage.setItem("orderPlaced", "true"); // Set order placed status in local storage
          window.location.reload(); // Refresh the page
        })
        .catch((error) => console.log(error));
    }
  };

  const calculateTotalCartValue = () => {
    const total = cartLocal.reduce(
      (accumulator, item) =>
        accumulator +
        (item.hasDiscount
          ? parseFloat(item.discounted_price)
          : parseFloat(item.price)) *
          parseInt(item.quantity),
      0
    );
    return total.toFixed(2);
  };

  useEffect(() => {
    fetch(url).then((response) => response.json());

    const orderPlacedStatus = localStorage.getItem("orderPlaced");
    if (orderPlacedStatus === "true") {
      setOrderPlaced(true);
      localStorage.removeItem("orderPlaced");
    }
  });

  console.log("Kkkkkkk");
  console.log(showCartPopup);
  return (
    <div className="container">
      {/* Cart Popup */}
      {showCartPopup && (
        <div className="cart-popup">
          <button className="close-btn" onClick={() => setShowCartPopup(false)}>
            &times;
          </button>
          <h2>Cart</h2>
          {cartLocal.length > 0 ? (
            <>
              {itemsInCart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div>{item.name}</div>
                  <div>Quantity: {item.quantity}</div>
                </div>
              ))}
              <p>Total: € {calculateTotalCartValue()}</p>
              <div className="cart-address">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setOrderPlaced(true)}
              >
                Place Order
              </button>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      )}

      {/* Order Placed Message */}
      {orderPlaced && (
        <div className="order-placed">
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
