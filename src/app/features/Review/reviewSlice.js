import { createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { ADD_REVIEW_API } from "../../Server";

const initialState ={
    review_msg:"",
    loading:"false",
    error:"",
};

export const companyReview = createAsyncThunk(
    "review/companyReview",
    async(body,thunkAPI)=>{
        const res = await axios.post(
            `${ADD_REVIEW_API}`,
            body,
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                    Accept:"application/json",
                    "Content-Type":"application/json",
                },
            }
        );
        return res.data;
    }
);

// Slice for 
const reviewSlice = createSlice({
    name:"review",
    initialState,
    reducers:{
        clearCompanyState:(state)=>{
            state.cmplist_msg="";
            state.cmpcreate_msg="";
            state.company_data ="";
            state.loading=false;
            state.error="";
            return state;
        },

    extraReducers:{
        // ---------- create company review------
        [companyReview.pending]:(state,{payload})=>{
            state.loading=true;
            state.error="";
            state.cmpcreate_msg="";
        },
        [companyReview.fulfilled]:(state,{payload})=>{ 
            state.loading=false;
          if(payload.error){
            state.error=payload.error;
            state.review_msg ="";
          }else{
            state.review_msg=payload.message;
            state.error="";
          }
        },
        [companyReview.rejected]:(state,{payload})=>{
            // debugger
            state.loading=false;
            state.error=payload.error;
            state.review_msg="";
        },
    }
    }
})
export default reviewSlice.reducer;
export const { clearReviewState} = reviewSlice.actions;