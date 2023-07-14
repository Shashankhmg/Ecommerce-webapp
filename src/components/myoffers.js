import React, { Component } from 'react';
import './myoffers.css';
import Editoffers from './editoffer';
import ReactDOM from 'react-dom';

class MyOffers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [],
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem('user_id');

    if (userId) {
      this.fetchOffers(userId);
    }
  }

  fetchOffers = async (userId) => {
    try {
      const formData = new FormData();
      formData.append('userId', userId);

      const response = await fetch('http://localhost:8000/sellerproducts', {
        method: 'POST',
        body: formData,
      });

      console.log('Form Data:', Object.fromEntries(formData.entries())); // Log the form data

      if (response.ok) {
        const data = await response.json();
        this.setState({ offers: data });
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  handleEditOffer = (name) => {
    console.log('offername',name);
    localStorage.setItem(`offerName`, name);
    console.log('offername2',name);
  };
  
  redirectToEditoffers = (index) => {
    const offerName = localStorage.getItem(`offerName`);
    if (offerName) {
      ReactDOM.render(<Editoffers offerName={offerName} />, document.getElementById('root'));
    } else {
      console.error('Error: Offer name not found in local storage');
    }
  };
  
  handleEditButtonClick = (name, index) => {
    console.log('inside',name);
    this.handleEditOffer(name);
    this.redirectToEditoffers(index);
  };
  
  render() {
    const { offers } = this.state;

    return (
      <div className="my-offers-page">
        <h1>My Offers</h1>
        <div className="offers-container">
          {offers.map((offer, index) => {
            const offerName = offer.name; // Set the offer name to a local variable

            return (
              <div className="offer-box" key={index}>
                <h3>{offerName}</h3>
                <p>Original Price: {offer.price}</p>
                <p>Discounted Price: {offer.discounted_price}</p>
                <p>Count: {offer.count}</p>
                <button onClick={() => this.handleEditButtonClick(offerName, index)}>Edit</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default MyOffers;
