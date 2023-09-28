import * as yup from "yup";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";

import {
  clearCompanyState,
  createCompany,
} from "../../features/company/companySlice";
import { Navbar } from "../Navbar/Navbar";
import "./CreateCompany.css";
import sideCircle from "../../assests/design.png";


export const CreateCompany = () => {
  const [company_logo, setCompany_logo] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.company);
  console.log("this is create",data);
  const { cmpcreate_msg, error, loading } = data;

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearCompanyState());
    }
    if (cmpcreate_msg) {
      toast.success(cmpcreate_msg, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearCompanyState());
      console.log("Navigate from create company");
      navigate("/companylist  ");
    }
  }, [error, cmpcreate_msg]);

  const defaultValues = {
    companyName: "",
    location: "",
    city: "",
    founded: "",
  };
  const addUserPic = (e) => {
    setCompany_logo(e.target.files[0]);
  };
  const validationSchema = yup.object().shape({
    companyName: yup.string().required("username must be 6 character long"),
    location: yup.string().required("please enter company name"),
    city: yup.string().required(),
    founded: yup.string().required("please enter founded on"),
  });
  const handleSubmit = (values) => {
    const user = JSON.parse(localStorage.getItem("user"));
    let comp_obj = { ...values, userId: user._id, company_logo: company_logo };
    console.log(" Create Company data", comp_obj);
    dispatch(createCompany(comp_obj));
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <Formik
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <div className="createComp-main">
          <div className="createComp-right">
            <div className="createComp-imgg">
              <div className="createComp-dStar">
                <img className="createComp-sideCircle" src={sideCircle} alt="" />
              </div>
              <div className="createComp-star">
                <Link to={`/company_list`} className="close"></Link>
              </div>
            </div>

            <div className="createComp-heading">
              <h1>Add Company</h1>{" "}
            </div>
            <div className="createComp-formarea">
              <Form className="form">
                <div className="p-field">
                  <label htmlFor="fname" className="from_label">
                    Company name
                  </label>
                  <Field
                    type="text"
                    name="companyName"
                    placeholder="Enter"
                    style={{ fontFamily: "Arial, FontAwesome" }}
                    className="field"
                  />
                  <p id="error_message">
                    <ErrorMessage name="companyName" />
                  </p>
                </div>
                <div className="p-field">
                  <label htmlFor="fname" className="from_label">
                    Location
                  </label>
                  <Field
                    type="location"
                    name="location"
                    placeholder="location"
                    style={{ fontFamily: "Arial, FontAwesome" }}
                    className="field"
                  />
                  <p id="error_message">
                    <ErrorMessage name="location" />
                  </p>
                </div>
                <div className="p-field">
                  <label htmlFor="fname" className="from_label">
                    City
                  </label>
                  <Field
                    className="field"
                    as="select"
                    type="field"
                    name="city"
                    placeholder="Select City"
                    style={{ color: "gray" }}
                  >
                    <option>Select City</option>
                    <option>Indore</option>
                    <option>Pune</option>
                    <option>Bangalore</option>
                    <option>Mumbai</option>
                    <option>Hyderabad</option>
                  </Field>
                  <p id="error_message">
                    <ErrorMessage name="city" />
                  </p>
                </div>
                <div className="p-field">
                  <label htmlFor="fname" className="from_label">
                    Founded on
                  </label>
                  <Field
                    type="date"
                    name="founded"
                    placeholder="Founded"
                    style={{ fontFamily: "Arial, FontAwesome" }}
                    className="field"
                  />
                  <p id="error_message">
                    <ErrorMessage name="founded" />
                  </p>
                </div>
                <div className="p-field">
                  <input
                  onChange={addUserPic}
                    type="file"
                    name="company_logo"
                    style={{ fontFamily: "Arial, FontAwesome" }}
                    className="field"
                  />
                </div>
                <button type="submit" className="createComp-btn">
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

export default CreateCompany