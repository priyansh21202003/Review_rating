import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./CompanyList.css"
import { Navbar } from "../Navbar/Navbar";
import { clearCompanyState } from "../../features/company/companySlice";
import { getCompany } from "../../features/company/companySlice";
import enterImg from "../../assests/next.image.jpg";
import star_rating from "../../assests/5 star image.webp";


export const CompanyList = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company);
  console.log("companies", companies);
  const { cmplist_msg, company_data, error } = companies;

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(clearCompanyState());
    }
    if (cmplist_msg) {
      toast.success(cmplist_msg, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [error, cmplist_msg]);

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);


  return (
    <>
      <div>
        <Navbar />
        <ToastContainer />
        <div>
          <div
            id="lable" 
          >
            Select City
          </div>
          <div id="sorting">Sort:</div>
          <br />
          <div className="second_div1">
            <div className="select_city">
              <input
                type="search"
                placeholder="Search"
                id="select_city"
                value="indore, Madhaya Pradesh,India "
              />
            </div>
            <div className="find_company">
              <button type="button" id="find_company">
                Find Company
              </button>
            </div>
            <div className="add_company">
              <Link to={"/createCompany"} style={{ fontSize: "0.7rem" }}>
                <button type="submit" id="add_company">
                  + Add company
                </button>
              </Link>
            </div>
          </div>
        </div>
        <hr id="hr_tag" />
        <div id="result_found">Result Found:3</div>
        <div className="third_div">
          <ul>
            {company_data &&
              company_data.map(
                ({
                  _id,
                  company_logo,
                  companyName,
                  location,
                  city,
                  founded,
                }) => (
                  <Link to={`/company_details/${_id}`} key={_id} style={{textDecoration:"none"}}>
                    <div className="list_1">
                      <img src={ `http://localhost:9000${company_logo}`} id="company_img" />

                      <div id="align">
                        <h6 id="Founded1 ">Founded {founded}</h6>
                        <h2>{companyName}</h2>
                        <h6 id="location">{location}</h6>
                        <h7 id="reating">4.5</h7>
                        <img
                          src={star_rating}
                          alt="star_rating"
                          id="star_rating"
                        />
                        <h6 id="Founded">45 Reviews</h6>
                      </div>
                     <div id="enter_img"> <div ><img src={enterImg}  /></div></div> 

                    </div>
                  </Link>
                )
              )}
          </ul>
        </div>
      </div>
    </>
  );
};
export default CompanyList