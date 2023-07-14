import Carousel from "react-bootstrap/Carousel";
import React from "react";

const MyCarousel = () => {
  return (
    <Carousel id="carousel">
      <Carousel.Item>
        <img
          style={{ height: "550px" }}
          className="d-block w-100"
          src="./image1.jpeg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h1>Fresh Vegetables</h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "550px" }}
          className="d-block w-100"
          src="./image6.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h1>Fresh Fruits</h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "550px" }}
          className="d-block w-100"
          src="./image2.jpeg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h1>Bakery Items</h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "550px" }}
          className="d-block w-100"
          src="./image5.jpeg"
          alt="Fourth slide"
        />
        <Carousel.Caption>
          <h1>Meat Products</h1>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default MyCarousel;
