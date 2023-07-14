import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const getdata = (e) => {
    const { value, name } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        const { role, user_id } = data;
        

        // Save session in local storage
        localStorage.setItem('role', role);
        localStorage.setItem('user_id', user_id);
        

        if (role === 'seller') {
          navigate('/productPage');
        } else if (role === 'customer') {
          navigate('/');
        } else {
          toast.error('Unknown role');
        }
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('An error occurred while logging in');
      console.error(error);
    }
  };

  return (
    <>
      <div className="container mt-3 d-flex justify-content-center">
        <section className="d-flex justify-content-between">
          <div className="left_data mt-3 p-3" style={{ width: '100%' }}>
            <h3 className="text-center col-lg-6">Log in</h3>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  onChange={getdata}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  name="password"
                  onChange={getdata}
                  placeholder="Password"
                />
              </Form.Group>

              <Button
                variant="primary"
                className="col-lg-6"
                onClick={handleLogin}
                style={{ background: 'rgb(67, 185, 127)' }}
                type="submit"
              >
                Submit
              </Button>
            </Form>
            <p className="mt-3">
              Don't have an account?
              <span>
                <NavLink to="/register">Register</NavLink>
              </span>
            </p>
          </div>
        </section>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
