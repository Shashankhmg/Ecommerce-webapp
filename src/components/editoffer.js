import React, { Component } from 'react';
import editoffer from './editoffer';
import './editoffer.css'; 

class EditOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: '',
      originalPrice: '',
      discount: '',
    };
  }

  componentDidMount() {
    const offerName = localStorage.getItem('offerName');
    console.log('offerName',offerName)
    if (offerName) {
      this.setState({ name: offerName });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { count, originalPrice, discount } = this.state;
    const offerName = localStorage.getItem('offerName');
    const userId = localStorage.getItem('user_id');
    console.log('Offer Name:', offerName);

    

    try {
      const  formData = new FormData();
      formData.append('name', offerName);
      formData.append('count', count);
      formData.append('original_price', originalPrice);
      formData.append('discount', discount);
      formData.append('userId', userId);
      console.log('Form Data:', Object.fromEntries(formData.entries())); // Log the form data
      

      const response = await fetch('http://localhost:8000/editproduct', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("Offer successfully edited");
        const data = await response.json();
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  render() {
    const { count, originalPrice, discount } = this.state;

    return (
      <div className="edit-offer-page">
        <h1>Edit Offer</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="count">Count:</label>
            <input
              type="number"
              id="count"
              name="count"
              value={count}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="originalPrice">Original Price:</label>
            <input
              type="number"
              id="originalPrice"
              name="originalPrice"
              value={originalPrice}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="discount">Discount (%):</label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={discount}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    );
  }
}

export default EditOffer;
