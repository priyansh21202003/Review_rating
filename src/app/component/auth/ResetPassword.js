import * as yup from "yup";
import React, { useEffect } from "react";
import { ErrorMessage, Form, Field, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {  Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { clearState, resetPassword } from "../../features/auth/AuthSlice";


export const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data =useSelector((state)=> state.user);
  console.log("Data:",data);
  const {message , error} = data;
  const {id,token}= useParams();
  console.log("id,token:",id,token);
  console.log("message , error:",message,error);

  useEffect(()=>{
    if(error){
        console.log("this is useEffect error",error);
        toast.error(error,{
            position:toast.POSITION.TOP_CENTER,
        });
        dispatch(clearState());
    }
    if(message){
        toast.success(message,{
            position:toast.POSITION.TOP_CENTER,
        });
        dispatch(clearState());
        navigate("/")
    }
  } ,[error,message]);
  // defaultValues
  const defaultValue = {
    newPassword: "",
    confirmPassword:"",
  };
//   validations
//   const validationSchema = yup.object().shape({
//     // newPassword: yup.string().required("enter new password"),
//     // confirmPassword:yup.string().required("enter password again"),
//   });
//   3rd handle submit
  const handleSubmit = (values) => {
   console.log("inside handle submit")
   const passwordObj = {...values, id:id,token:token};
   console.log("password obj**", passwordObj);
    dispatch(resetPassword(passwordObj));
  };
  return (
    <>
    <center><div>ResetPassword</div></center>  
    <ToastContainer/>
      <Formik
       initialValues={defaultValue}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit} 
      >
    
      <Form>
      
        <div>
        <label htmlFor="email">New Password</label>
          <div className="p-input">
            <Field
              type="text"
              name="password"
              placeholder="&#xf0e0;   Enter Password"
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
              <ErrorMessage name="newPassword" />
            </p>
          </div>
          <label htmlFor="confirmPassword">New Password(confirmation )</label>
          <div className="p-input">
          <Field
              type="text "
              name="password"
              placeholder="&#xf0e0;  Enter Password"
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
              <ErrorMessage name="confirmPassword" />
            </p>
          </div>
        
          
          <button id="button" type="submit">
            {" "}
            Reset Password
          </button>
          {" "}
          <Link to ="/userSignUp"  > Register</Link>
        </div>
        </Form>
      </Formik>
    </>
  );
};
export default ResetPassword