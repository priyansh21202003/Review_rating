import * as yup from "yup";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./Login.css";
import backgroundimage from "../../assests/background image.png";
import rightlogo from "../../assests/design.png";
import stardesign from "../../assests/Star design.png";
import { clearState, signInUser } from "../../features/auth/AuthSlice";


const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.user);
  const { message, error, loading } = data;
  console.log("Response", message, error);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearState());
    }
    if (message) {
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearState());
      navigate("/company_list");
    }
  }, [error, message]);

  const defaultValue = {
    email: "",
    password: "",
  };
  //2 nd validationSchema
  const validationSchema = yup.object().shape({
    email: yup.string().required().email("please enter your message"),
    password: yup.string().required("please enter your password"),
  });
  // 3rd submit
  const handleSubmit = (values) => {
    dispatch(signInUser(values));
  };

  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={defaultValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <div className="body_Login">
          <div className="login-section">
            <div className="login-left">
              <h1 id=" login-h1">Welcome</h1>
              <p id="login-p1">
                Lorem ipsum dolor sit amet,consecutor <br></br> adispiscing elit
              </p>
              <img id="login-image1" src={backgroundimage}></img>
            </div>
            <Form>
              <div className="login-form">
                <div className="login-inputs">
                  <div className="login-corner">
                    <img id="login-cornerleft" src={rightlogo}></img>
                  </div>
                  <div className="login-details">
                    <h1 id="login-h2">Login</h1>
                    <p id="login-p2">
                      Hello! Please enter your details for login.
                    </p>
                  </div>
                  <div className="login-corner2">
                    <img id="login-cornerright" src={stardesign}></img>
                  </div>
                </div>
                <div className="loginForm-input">
                  <div className="col-md-12 mt-4">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                    ></Field>
                    <p className="text-danger">
                      <ErrorMessage name="email"></ErrorMessage>
                    </p>
                  </div>
                  <div className="col-md-12 mt-4">
                    <Field
                      type="text"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                    ></Field>
                    <p className="text-danger">
                      <ErrorMessage name="password"></ErrorMessage>
                    </p>
                  </div>
                </div>
                <Link to="/reset_password_email" id="login-forgot">
                  Forgot Password!
                </Link>
                <div className="loginB">
                  <button type="submit" id="login-submit1">
                    Login
                  </button>
                </div>
                <hr className="login-hr"></hr>
                <p id="login-p3">I don't have an account on Review & Rate</p>
                <Link to="/" id="login-register">
                  Register
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </Formik>
    </>
  );
};

export default UserLogin;
