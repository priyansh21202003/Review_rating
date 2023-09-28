// import React from 'react';
// import {Formik,Form,Field,ErrorMessage} from 'formik';
// import * as yup from 'yup';
// import { Button } from 'bootstrap';

// const Signup = () => {
//   const defaultValue={
//     name:"",
//     emai:"",
//     password:""
//   };
//   //2 nd validationSchema
   
//   const validationSchema =yup.object().shape({
//     name:yup.string().required("please enter your name"),
//     email:yup.string().required().email("please enter your message"),
//     password:yup.string().required("please enter your password")
//   });
//   // 3rd submit

//   const handleSubmit =(values)=>{
//     console.log("values:",values);
//   }
//   return(
//   <>
//     <Formik 
//     initialValues={defaultValue}
//     validationSchema={validationSchema}
//     onSubmit={handleSubmit}
//     >
//       <Form>
//         <div className='col-md-12 mt-4'>
//           <Field 
//           type="text"
//           name="name"
//           placeholder="Enter your name"
//           className="form-control"
//           ></Field>
//           <p className='text-danger'>
//           <ErrorMessage name='name'></ErrorMessage> 
//           </p>
//         </div>

//         <div className='col-md-12 mt-4'>
//           <Field 
//           type="email"
//           name="email"
//           placeholder="Enter your email"
//           className="form-control"
//           ></Field>
//           <p className='text-danger'>
//           <ErrorMessage name='email'></ErrorMessage> 
//           </p>
//         </div>
//         <div className='col-md-12 mt-4'>
//           <Field 
//           type="text"
//           name="password"
//           placeholder="Enter your password"
//           className="form-control"
//           ></Field>
//           <p className='text-danger'>
//           <ErrorMessage name='password'></ErrorMessage> 
//           </p>
//         </div>
//         <br></br>
//         <button style={{marginLeft:"50%"}}>submit</button>

//       </Form>
    
//     </Formik>
//   </>
//   )
// }
// export default Signup

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cmpList_msg:"",
    cmpCreate_msg:"",
    cmpDetail_msg:"",
    company_data:"",
    company_details:"",
    company_count:"",
    loading:false,
    error:""
}

export const createCompany = createAsyncThunk(
    "company/create",
    async (body,thunkAPI)=>{
        const res = await axios.post("http://localhost:9000/company/create",body,{
            headers:{
                "Content-type":"multipart/form-data",
            }
        });
        return res.data
        // let data = await res.json()
        // if(data.success==="success"){
        //     return data
        // }else{
        //     return thunkAPI.rejectWithValue(data)
        // }
    }
)
// get company

export const getCompany = createAsyncThunk(
    "company/getCompanies",
    async (thunkAPI)=>{
        const resResult = await fetch("http://localhost:9000/company/list",{
            method:"get",
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`,
                // "Content-type":"multipart/form-data",
            }
        })
        // return res.data
        let data = await resResult.json()
        if(data.success){
            return data
        }else{
            return thunkAPI.rejectWithValue(data)
        }
    }
)
// get Company Details
export const getCompanyDetails = createAsyncThunk(
    "company/getCompanyDetails",
    async(id,thunkAPI)=>{
        console.log('id thunk' ,id)
        const res = await fetch(`http://localhost:9000/company/details/${id}`,{
            method:'get',
            headers:{
                Accept:'application/json',
                "Content-Type":"application/json",
            },
        })
        let data =await res.json();
        console.log(data)
        if(data.success){
            return data
        }else{
            return thunkAPI.rejectWithValue(data)
        }
    }
)

/// slice create company
 const companySlice=createSlice({
    name:"company",
    initialState,
    reducers:{
        clearCompanyState:(state)=>{
            state.cmpCreate_msg = "";
            state.cmpDetail_msg="";
            state.cmpList_msg="";
            state.company_data = "";
            state.company_details = "";
            state.company_count = "";
            state.error = ""
            // return state
        }
    },
    /// create company extra reducer
    extraReducers:{
        [createCompany.pending]:(state)=>{
            state.loading=true;
            state.error = "";
            state.cmpCreate_msg = "";
        },
        [createCompany.fulfilled]:(state,{payload})=>{
            state.loading = false;
            if(payload.error){
                state.error = payload.error;
                state.cmpCreate_msg = ""
            }else{
                state.cmpCreate_msg = payload.message;
                state.error = "";
            }
        },
        [createCompany.rejected]:(state,{payload})=>{
            state.loading = false;
            state.error = payload.error;
            state.cmpCreate_msg = ""
        },

        // get company extaReducer

        [getCompany.pending]:(state)=>{
            state.loading = true;
        },
        [getCompany.fulfilled]:(state,{payload})=>{
            state.loading = false;
            if(payload.error){
                state.error = payload.error;
                state.cmpList_msg = "";
                state.company_data = "";
                state.company_count = "";
            }else{
                state.cmpList_msg = payload.message;
                state.company_data = payload.companies;
                state.company_count = payload.count;
                state.error = ""
            }
        },
        [getCompany.rejected]:(state,{payload})=>{
            state.loading = false;
            state.error = payload.error
            state.cmpList_msg = "";
            state.company_data = ""
            state.company_count = ""
        },
        // get company details extraReducers
        
        [getCompanyDetails.pending]:(state)=>{
            state.loading = true;
            state.error = "";
            state.company_details = "";
            state.cmpDetail_msg = "";
        },
        [getCompanyDetails.fulfilled]:(state,{payload})=>{
            state.loading = false;
            if(payload.error){
                state.error = payload.error
                state.company_details = "";
                state.cmpDetail_msg = "";
            }else{
                
                state.company_details = payload.compDetails;
                state.cmpDetail_msg = payload.message
            }
        },
        [getCompanyDetails.rejected]:(state,{payload})=>{
            state.loading = false;
            state.error = payload.error;
            state.company_details = "";
            state.cmpDetail_msg = "";
        }
    }

    
})





export default companySlice.reducer;
export const {clearCompanyState} = companySlice.actions;