import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const history = useNavigate();

  const [inpval, setInpval] = useState({
    role: "",
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
    repeatPassword: "",
    isPremiumSeller: false,
  });

  const getdata = (e) => {
    const { value, name } = e.target;

    setInpval((prevState) => ({
      ...prevState,
      [name]: value,
      isPremiumSeller: value === "seller" ? false : prevState.isPremiumSeller,
    }));
  };

  const handlePremiumSellerChange = (e) => {
    setInpval((prevState) => ({
      ...prevState,
      isPremiumSeller: e.target.value === "yes",
    }));
  };

  const addData = async (e) => {
    e.preventDefault();

    const {
      firstname,
      lastname,
      email,
      mobile,
      password,
      repeatPassword,
      role,
      isPremiumSeller,
    } = inpval;

    if (firstname === "") {
      toast.error("First Name field is required!", {
        position: "top-center",
      });
    } else if (lastname === "") {
      toast.error("Last Name field is required", {
        position: "top-center",
      });
    } else if (email === "") {
      toast.error("Email field is required", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.error("Please enter a valid email address", {
        position: "top-center",
      });
    } else if (mobile === "") {
      toast.error("Mobile field is required", {
        position: "top-center",
      });
    } else if (!/^0|[+49]{3}?[0-9]{11}$/.test(mobile)) {
      toast.error("Please enter a valid mobile number", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("Password field is required", {
        position: "top-center",
      });
    } else if (password.length < 5) {
      toast.error("Password should be at least 5 characters long", {
        position: "top-center",
      });
    } else if (repeatPassword !== password) {
      toast.error("Passwords do not match!", {
        position: "top-center",
      });
    } else {
      try {
        const response = await fetch("http://localhost:8000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inpval),
        });

        if (response.ok) {
          console.log("Data added successfully");
          console.log("Role:", role);
          history("/login");
          // Store data in localStorage or navigate to success page
        } else {
          toast.error("An error occurred while registering", {
            position: "top-center",
          });
        }
      } catch (error) {
        toast.error("An error occurred while registering", {
          position: "top-center",
        });
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center container mt-3">
        <section className="d-flex justify-content-center">
          <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
            <h3 className="text-center col-lg-6">Sign Up</h3>
            <Form.Label>Are you a ?</Form.Label>
            <Form>
              <section className="d-flex">
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="radio1"
                    name="role"
                    value="seller"
                    checked={inpval.role === "seller"}
                    onChange={getdata}
                  />
                  <label className="form-check-label" htmlFor="radio1">
                    Seller
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="radio2"
                    name="role"
                    value="customer"
                    checked={inpval.role === "customer"}
                    onChange={getdata}
                  />
                  <label className="form-check-label" htmlFor="radio2">
                    Customer
                  </label>
                </div>
              </section>
              
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="firstname"
                  onChange={getdata}
                  placeholder="First Name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="lastname"
                  onChange={getdata}
                  placeholder="Last name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  onChange={getdata}
                  placeholder="Email"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  onChange={getdata}
                  name="mobile"
                  type="tel"
                  placeholder="Mobile Number"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  onChange={getdata}
                  placeholder="Password"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="repeatPassword"
                  onChange={getdata}
                  placeholder="Repeat Password"
                />
              </Form.Group>

              
              {inpval.role === "seller" && (
    <Form.Group className="mb-3">
      <Form.Label>Do you want to be a premium seller?</Form.Label>
      <div className="form-check">
        <input
          type="radio"
          className="form-check-input"
          id="radio3"
          name="premiumSeller"
          value="yes"
          checked={inpval.isPremiumSeller}
          onChange={handlePremiumSellerChange}
        />
        <label className="form-check-label" htmlFor="radio3">
          Yes
        </label>
      </div>
      <div className="form-check">
        <input
          type="radio"
          className="form-check-input"
          id="radio4"
          name="premiumSeller"
          value="no"
          checked={!inpval.isPremiumSeller}
          onChange={handlePremiumSellerChange}
        />
        <label className="form-check-label" htmlFor="radio4">
          No
        </label>
      </div>
    </Form.Group>
  )}

              <Button
                variant="primary"
                className="col-lg-6"
                onClick={addData}
                style={{ background: "rgb(67, 185, 127)" }}
                type="submit"
              >
                Submit
              </Button>
            </Form>
            <p className="mt-3">
              Already Have an Account?
              <span>
                <NavLink to="/login">Login</NavLink>
              </span>
            </p>
          </div>
        </section>
        <ToastContainer />
      </div>
    </>
  );
};

export default Home;