import * as yup from "yup";
import { useEffect } from "react";
import { ErrorMessage, Form,Field, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {  Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./reset_email_form.css";
import { clearState, passwordResetEmail } from "../../features/auth/AuthSlice";


 export const ResetPasswordEmail = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const data = useSelector((state)=> state.user);
  const {msg , error} = data;
  console.log("Data", data);
  console.log("Result if Login:",msg ,error);

  useEffect(()=>{
    if(error){
        toast.error(error);
        dispatch(clearState());
    }
    if(msg){
        alert(msg);
        toast.success(msg,{
            position:toast.POSITION.TOP_CENTER,
        });
        dispatch(clearState());
        navigate("/");
    }
  },[error,msg]);
  // defaultValues
  const defaultValue = {
    email: "",
  };
  const validationSchema = yup.object().shape({
    email: yup.string().required().email("Please enter a valid email"),
  });
  const handleSubmit = (value) => {
    const {email} = value;
    dispatch(passwordResetEmail({email})); 
  };

  return (
    <>
    <center>  
        <div>ResetPasswordEmail</div></center>
      <ToastContainer/>

      <Formik
      initialValues={defaultValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
      <Form >
        <div className="reset_email_form" >
          <label htmlFor="email">Email</label>
          <div className="p-input">
            <Field
              type="email "
              name="email"
              placeholder="&#xf0e0;  Email"
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
              <ErrorMessage name="email" />
            </p>
          </div>
          <button id= "button" type="submit"> send Email</button>
          <Link to ="/userSignUp"  > Register</Link>
        </div>
        </Form>
      </Formik>

    </>
  );
};
