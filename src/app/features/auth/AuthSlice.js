import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { LOGIN_API, SIGNUP_API } from "../../Server";


let initialState = {               
  message: "",
  user: "",
  token: "",
  loading: false,
  error: "",
};

// ------------- SignUp ------------
export const signUpUser = createAsyncThunk(          
 "user/signUpUser",                                           
  async (body, thunkAPI) => { 
    console.log("Sign thunk :", body); 
    const res = await axios.post(
      `${SIGNUP_API}`,
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.data.success) {
      console.log("Signup Thunk res :", res.data);
      return res.data;
    } else {
      return thunkAPI.rejectWithValue(res.data);
    }
  }
);

// ------- Login ---------
export const signInUser = createAsyncThunk(
  "user/signInUser",
  async (body, thunkAPI) => {
    console.log("Body :",body);
    const resResult = await fetch(`${LOGIN_API}`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let data = await resResult.json();
    if (data.success) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  }
);
//Reset Password Email
export const passwordResetEmail = createAsyncThunk(
  "user/passwordResetEmail",
  async (body, thunkAPI) => {
    console.log("Body ", body);
    const res = await fetch(
      "http://localhost:9000/user/send-reset-password-email",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    let data = await res.json();
    if (data.success) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  }
);
//Generate Password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (body, thunkAPI) => {
    console.log("reset slice :", body);
    const res = await axios
      .post("http://localhost:9000/user/reset-password", body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        let data = await response.json();
        if (data.success) {
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      });
  }
);

//Slice for auth(Signup&Login)
const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state) => {
      state.message = "";
      state.user = "";
      state.token = "";
      state.loading = false;
      state.error = "";
      return state;
    },
    addToken: (state, action) => {
      state.token = localStorage.getItem("token");
    },
    addUser: (state, action) => {
      state.user = localStorage.getItem("user");
    },
    logout: (state, action) => {
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers: {
    // //-------- Loginuser------------------
    [signInUser.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [signInUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.error) {
        state.error = payload.error;
      } else {
        state.message = payload.message;
        state.token = payload.token;
        state.user = payload.userData;
        localStorage.setItem("message", payload.message);
        localStorage.setItem("user", JSON.stringify(payload.userData));
        localStorage.setItem("token", payload.token);
      }
    },
     [signInUser.rejected]: (state, { payload }) => {
      state.loading = true;
      state.error = payload.error;
      state.message = "";
    },
    //-------- Signupuser------------------
    [signUpUser.pending]: (state, { payload }) => {
      // debugger
      state.loading = true;
      state.error = "";
      state.message = "";
    },
    [signUpUser.fulfilled]:(state,{payload})=>{
    state.loading=false;
    if(payload.error){
      state.error=payload.error;
      state.message="";
    }else{
      state.message=payload.message;
      state.error="";
    }
    },
    [signUpUser.rejected]:(state,{payload})=>{
      state.loading=false;
      state.error=payload.error;
      state.message="";
    },
    //-------- Resetpassword Email------------------
    [passwordResetEmail.pending]: (state, { payload }) => {
      // debugger
      state.loading = true;
      state.error = "";
      state.message = "";
    },
    [passwordResetEmail.fulfilled]: (state, { payload }) => {
      //debugger
      state.loading = false;
      if (payload.error) {
        state.error = payload.error;
        state.message= "";
      } else {
        state.message = payload.message;
        state.error = "";
      }
    },
    [passwordResetEmail.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
      state.message = "";
    },
    // -------- Generate New Password------------------
    [resetPassword.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = "";
      state.message = "";
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.error) {
        state.error = payload.error;
        state.message = "";
      } else {
        state.message = payload.message;
        state.error = "";
      }
    },
    [resetPassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = "";
    },
  },
});

export const {  addUser } = authSlice.actions;
export default authSlice.reducer;
export const { clearState } = authSlice.actions;

