import * as yup from "yup";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorMessage, Form, Field, Formik } from "formik";

import "./CompanyReview.css";
import {
  clearReviewState,
  companyReview,
} from "../../../features/Review/reviewSlice";
import { Navbar } from "../../Navbar/Navbar";
import sideCicle from "../../../assests/design.png";


export const Review = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id of review",id);
  const data = useSelector((state) => state.review);
  const { review_msg, loading, error } = data;
  console.log("this is loading", loading);
  console.log("this is review", review_msg);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("this is an useEffect error");
      dispatch(clearReviewState());
    }
    if (review_msg) {
      // alert(review_msg)
      toast.success(review_msg, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearReviewState());
      console.log("Navigate from create Company");
      navigate(`/companyDetails/${id}`);
    }
  }, [error, review_msg]);

  // initialState
  const defaultValue = {
    subject: "",
    review: "",
    rating: "",
  };

  // validation schema
  const validationSchema = yup.object().shape({
    subject: yup.string().required("Please enter company subject"),
    review: yup.string().required("Please enter company review"),
    rating: yup.number().required("Please  enter company rating"),
  });
  // 3rd after handle submit
  const handleSubmit = (values, action) => {
    // debugger
    const user = JSON.parse(localStorage.getItem("user"));
    const review_obj = { ...values, user_id: user._id, company_id: id };
    console.log("Before dispatch", review_obj);
    dispatch(companyReview(review_obj));
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Formik
        initialValues={defaultValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <div className="review-main">
          <div className="review-right">
            <div className="review-imgg">
              <div className="review-dStar">
                <img className="review-sideCicle" src={sideCicle} alt="" />
              </div>
              <div className="review-star">
              <Link to={`/company_details/${id}`} className="close"></Link>
              </div>
            </div>
            <div className="review-heading">
              <h1>Add Review</h1>
            </div>
            <div className="review-heading">{/* <h1>Sign Up</h1> */}</div>
            <div className="review-formarea">
              <Form className="form">
                <div className="p-input">
                <label htmlFor="fname" className="from_label">Subject</label>
                  <Field
                    type="text"
                    name="subject"
                    placeholder="Enter"
                    style={{ fontFamily: "Arial, FontAwesome" }}
                    className="input"
                  />
                  <p
                    style={{
                      fontSize: "0.6rem",
                      margin: "0 10px",
                      color: "red",
                    }}
                  >
                    <ErrorMessage name="subject" />
                  </p>
                </div>
                <div className="p-input">
                <label htmlFor="fTextArea" className="from_label">Enter Your Review</label>
                  <Field 
                  as="textarea"
                    rows="4"
                    cols="5"
                    name="review"
                    placeholder="Description..."
                    style={{ fontFamily: "Arial, FontAwesome" , }}
                    className="input"
                  />
                  <p
                    style={{
                      fontSize: "0.6rem",
                      margin: "0 10px",
                      color: "red",
                    }}
                  >
                    <ErrorMessage name="review" />
                  </p>
                </div>
                <div className="p-input">
                <label htmlFor="fname" className="from_label">Rating</label>
                  <Field
                    type="select"
                    name="rating"
                    placeholder="Enter rating"
                    style={{ fontFamily: "Arial, FontAwesome" }}
                    className="input"
                  >
                       </Field>
                  <p
                    style={{
                      fontSize: "0.6rem",
                      margin: "0 10px",
                      color: "red",
                    }}
                  >
                    <ErrorMessage name="rating" />
                  </p>
                </div>
                <button type="submit" className="review-btn">
                  save
                </button>
              </Form>
            </div>
          </div>
        </div>
      </Formik>
    </>
  );
};
export default Review 

