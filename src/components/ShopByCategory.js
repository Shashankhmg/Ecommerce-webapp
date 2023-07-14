import React from "react";
import { Link } from "react-router-dom";

const ShopByCategory = () => {
  return (
    <section className="category" id="category">
      <h1 className="heading text-center text-uppercase p-3 display-5 font-weight-bold">
        Shop by <span style={{ color: "green" }}>Category</span>
      </h1>
      <div className="box-container d-flex gap-4 flex-wrap text-center">
        <div className="border border-radius-1 p-2">
          <h3>Vegetables</h3>
          <p>Upto 50% off</p>
          <img
            src="./vegetables.jpeg"
            alt="vegetable"
            style={{ width: "240px", height: "200px" }}
          />

          <Link
            className="link-light text-decoration-none"
            to={{
              pathname: "/buyproduct",
              search: "?category=Category_1",
            }}
          >
            <button type="button" className="btn btn-success btn-sm">
              Shop Now
            </button>
          </Link>
        </div>
        <div className="border border-radius-1 p-2">
          <h3>Fruits</h3>
          <p>Upto 40% off</p>
          <img
            src="./fruits.jpeg"
            alt="fruits"
            style={{ width: "240px", height: "200px" }}
          />

          <Link
            className="link-light text-decoration-none"
            to={{
              pathname: "/buyproduct",
              search: "?category=Category_3",
            }}
          >
            <button type="button" className="btn btn-success btn-sm">
              Shop Now
            </button>
          </Link>
        </div>
        <div className="border border-radius-1 p-2">
          <h3>Bakery</h3>
          <p>Upto 20% off</p>
          <img
            src="./bakery.jpeg"
            alt="bakery"
            style={{ width: "240px", height: "200px" }}
          />

          <Link
            className="link-light text-decoration-none"
            to={{
              pathname: "/buyproduct",
              search: "?category=Category_2",
            }}
          >
            <button type="button" className="btn btn-success btn-sm">
              Shop Now
            </button>
          </Link>
        </div>
        <div className="border border-radius-1 p-2">
          <h3>Meat</h3>
          <p>Upto 30% off</p>
          <img
            src="./meat.jpeg"
            alt="meat"
            style={{ width: "240px", height: "200px" }}
          />

          <Link
            className="link-light text-decoration-none"
            to={{
              pathname: "/buyproduct",
              search: "?category=Category_4",
            }}
          >
            <button type="button" className="btn btn-success btn-sm">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
