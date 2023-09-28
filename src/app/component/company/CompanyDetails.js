import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCompanyDetails } from "../../features/company/companySlice";
import { clearCompanyState } from "../../features/company/companySlice";

import "./CompanyDetails.css";
import { Navbar } from "../Navbar/Navbar";
import star_rating from "../../assests/5 star image.webp";


export const CompanyDetails = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const companies = useSelector((state) => state.company);
  console.log("companies", companies);
  const { compDetails_msg, company_details, error, loading } = companies;
  const { companyDetails, comments } = company_details;
  console.log("company details", companyDetails);
  console.log("comment", comments);
  const { companyName, location, city, founded, company_logo } = {
    ...companyDetails,
  };

  useEffect(() => {
    dispatch(getCompanyDetails(id));
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <ToastContainer />

      {/* <!--  --> */}
      {/* <!-- second div for selected company--> */}
      {/* <!-- company selected_1 --> */}
      <div className="background-color">
        <div className="selected">
          <div className="company-border">
            <div className="company-details">
              <img
                src={`http://localhost:9000${company_logo}`}
                alt="grafersid"
                id="company-img"
              />
              <div id="details-align">
                <h6 id="Founded1">Founded {founded}</h6>
                <h2>{companyName}</h2>
                <h6 id="location">{location}</h6>
                <div id="rating-align">
                  <h6 id="reating">4.5</h6>
                  <img
                    src={star_rating}
                    alt="star_rating"
                    id="star_rating"
                  />{" "}
                  <h6 id="Founded">45 Reviews</h6>
                </div>
              </div>
              <div className="add-review-btn">
                <Link id="add-review" to={`/review/${id}`}>
                  + Add Review
                </Link>
              </div>
            </div>

            <div id="underline">
              <hr></hr>
            </div>
            <div className="company-reviews">
              <ul className="reviews-list">
                {comments &&
                  comments.map(
                    ({ _id, subject, review, rating, createdAt }) => ( 
                      <div id="user-reviews">
                        {/* <img
                          id="profile"
                          src={`http://localhost:9000${user.profilePic}`}
                          height="45px"
                          alt="Profile_pic"
                        /> */}
                        <div id="reviews-align">
                          <div id="reviews-subject">
                            <h6>{subject}</h6>
                            <div id="reviews-rating">{rating}</div>
                          </div>
                          <div id="reviews-createdAt">{createdAt}</div>
                          <div id="reviews-review">{review}</div>
                        </div>
                      </div>
                    )
                  )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CompanyDetails