import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Signup.css";
import backgroundimage from "../../assests/background image.png";
import design from "../../assests/design.png";
import stardesign from "../../assests/Star design.png";
import { clearState, signUpUser } from "../../features/auth/AuthSlice";

function UserSignup() {
  const [profilePic, setProfilePic] = useState("");
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
      navigate("/login");
    }
  }, [error, message]);

  const defaultValue = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    city: "",
    state: "",
  };
  //2 nd validationSchema
  const validationSchema = yup.object().shape({
    name: yup.string().required("please enter your name"),
    email: yup.string().required().email("please enter your message"),
    password: yup.string().required("please enter your password"),
    phoneNumber: yup.string().required("please enter your phone number"),
    city: yup.string().required("please enter your city name"),
    state: yup.string().required("please enter your state name"),
  });
  const addUserPic = (e) => {
    setProfilePic(e.target.files[0]);
  };
  // 3rd submit
  const handleSubmit = (values) => {
    let userObj = { ...values, profilePic: profilePic };
    dispatch(signUpUser(userObj));
  };

  return (
    <>
      <Formik
        initialValues={defaultValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <div className="body_SignUp">
          <div className="signup-section">
            <div className="signup-section1">
              <h1 id="signup-heading1">Welcome</h1>
              <p id="signup-paragraph1">
                Lorem ipsum dolor sit amet,consecutor <br></br> adispiscing elit
              </p>
              <img id="signup-image1" src={backgroundimage} alt=""></img>
            </div>
            <Form>
              <div className="signup-section2">
                <div className="signup-input">
                  <div className="signup-corner1">
                    <img id="signup-corner1image" src={design} alt=""></img>
                  </div>
                  <h1 id="signup-heading2">sign up</h1>
                  <div className="signup-corner2">
                    <img id="signup-corner2image" src={stardesign} alt=""></img>
                  </div>
                </div>
                <div className="signupForm-input">
                  <div className="col-md-12 mt-4">
                    <Field
                      type="text"
                      name="name"
                      placeholder="Full name"
                      className="form-control"
                    ></Field>
                    <p className="text-danger">
                      <ErrorMessage name="name"></ErrorMessage>
                    </p>
                  </div>

                  <div className="col-md-12 mt-4">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email ID"
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
                  <div className="col-md-12 mt-4">
                    <Field
                      type="text"
                      name="phoneNumber"
                      placeholder="phone Number"
                      className="form-control"
                    ></Field>
                    <p className="text-danger">
                      <ErrorMessage name="phoneNumber"></ErrorMessage>
                    </p>
                  </div>
                  <div className="col-md-12 mt-4">
                    <Field
                      as="select"
                      name="city"
                      placeholder="City"
                      className="form-control"
                    >
                      <option> City </option>
                      <option>Indore</option>
                      <option>Bhopal</option>
                      <option>Harda</option>
                      <option>Hosangabad</option>
                      <option>Ujjan</option>
                    </Field>
                    <p className="text-danger">
                      <ErrorMessage name="city"></ErrorMessage>
                    </p>
                  </div>
                  <div className=" col-md-12 mt-4">
                    <Field
                      as="select"
                      name="state"
                      placeholder="state"
                      className="form-control"
                    >
                      <option>State</option>
                      <option>Madhya pradesh</option>
                      <option>Rajasthan</option>
                      <option>Maharastra</option>
                      <option>Gujrat</option>
                      <option>Punjab</option>
                    </Field>
                    <p className="text-danger">
                      <ErrorMessage name="state"></ErrorMessage>
                    </p>
                  </div>
                  <input
                    type="file"
                    name=""
                    className="form-control-file"
                    onChange={addUserPic}
                  ></input>
                  <br></br>
                  <button type="submit" id="signup-button">
                    Signup
                  </button>
                </div>
                <hr></hr>
                <p id="signup-paragraph2">I already have an account</p>
                <Link to="/login">
                  <h5 id="signup-heading3">Login</h5>
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </Formik>
    </>
  );
}

export default UserSignup;
