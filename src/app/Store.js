import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import AuthSlice from "./features/auth/AuthSlice";
import CompanySlice from "./features/company/companySlice";
import reviewSlice from "./features/Review/reviewSlice";

 const store = configureStore(
  {
reducer:{
  user:AuthSlice,
   company:CompanySlice,
   review:reviewSlice,

},
  },
  applyMiddleware(thunk)
);
export default store


