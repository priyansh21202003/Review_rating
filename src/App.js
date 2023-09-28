import React from 'react';
// // import Signup from './Signup'
 import UserLogin from './app/component/auth/UserLogin';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import UserSignup from './app/component/auth/UserSignup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompanyList from "./app/component/company/CompanyList";
import CreateCompany from "./app/component/company/CreateCompany"
import CompanyDetails from './app/component/company/CompanyDetails';
import CompanyReview from "./app/component/company/Review/CompanyReview";
import  ResetPassword  from "./app/component/auth/ResetPassword";
import { ResetPasswordEmail } from "./app/component/auth/ResetPasswordEmail";


const App=() =>{
  return (
    <>
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<UserSignup/>}/>
      <Route path='/login' element={<UserLogin/>}/>
      <Route path="/user/reset-password/:id/:token" element={<ResetPassword/>}/>
      <Route path="/reset_password_email" element={<ResetPasswordEmail/>}/>
      <Route path='/company_list' element={<CompanyList/>}/>
      <Route path='/createCompany' element={<CreateCompany/>}/>
      <Route path='/company_details/:id' element={<CompanyDetails/>} />
      <Route path='/review/:id' element={<CompanyReview/>}/>
    </Routes>
   </BrowserRouter>
   
   
 
    </>
  );
};
  export default App