import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


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
        console.log("body of createCompany",body)
        const res = await axios.post("http://localhost:9000/company/create",body,{
            headers:{
                "Content-type":"multipart/form-data",
                Authorization:`Bearer ${localStorage.getItem("token")}`,

            }
        });
        return res.data
    }
)
// get company
export const getCompany = createAsyncThunk(
    "company/getCompanies",
    async (thunkAPI)=>{
        const resResult = await fetch("http://localhost:9000/company/list",{
            method:"get",
            headers:{
                "Content-type":"multipart/form-data",
                Authorization:`Bearer ${localStorage.getItem("token")}`,  
            }
        })
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
            state.error = "";
            return state;
        }
    },
    /// create company extraReducer
    extraReducers:{
        [createCompany.pending]:(state,{payload})=>{
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

        // get company extraReducer
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
        // get companyDetails extraReducers     
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
                state.cmpList_msg = ""
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

