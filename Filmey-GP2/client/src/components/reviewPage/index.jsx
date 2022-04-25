import React from "react";
import "./reviewPage.css";
import { Link } from "react-router-dom";
import Header from "../header";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import utf8 from "utf8";
import Filter from "bad-words";
import Footer from "../Footer";
import { Container } from "react-bootstrap";
import api from "../../api/axiosAPI";

const reviewPage = (props) => {
  const {
    logo,
    homeText,
    genresText,
    languageText,
    footerText1,
    footerText2,
    submitText,
    inputPlaceholder,
  } = props;

  var username;

  const cookies = new Cookies();
  try {
    const token = cookies.get("token");
    var decoded = jwt_decode(token);
    username = decoded.user_id;
  } catch {}

  const [review, setReview] = useState("");
  var reviewVar = "";
  const isEnabled = review.length > 0;

  let { id, isEdit } = useParams();
  id = parseInt(id);
  isEdit = parseInt(isEdit);

  const Review = () => {
    const filter = new Filter();
    try {
      reviewVar = utf8.encode(filter.clean(review));
    } catch {
      reviewVar = utf8.encode(review);
    }

    if (isEdit == 0) {
      const res = api.post("/users/Review", {
        userID: decoded.userID,
        movieID: id,
        review: reviewVar,
      }).then((res) => {
        if (res.data.reviewErrorMessage) {
          alert(res.data.reviewErrorMessage);
        } else {
          if (res.data) {
            window.location = `/movieInfoPage/${id}`;
          }
        }
      });
    }
    if (isEdit == 1) {
      const res = api.post("/users/editReview", {
        userID: decoded.userID,
        movieID: id,
        review: reviewVar,
      }).then((res) => {
        if (res.data) {
          window.location = `/movieInfoPage/${id}`;
        }
      });
    }
  };

  const [userReview, setUserReview] = useState("");

  React.useEffect(() => {
    var userID = decoded.userID;

    if (isEdit == 1) {
      api.get(
        `/users/getUserReview/${id}/${userID}`
      ).then((response) => {
        setUserReview(response.data[0]);
      });
    }
  });
  return (
    <div>
      {/* header  */}
      <Header />
      {/* main content  */}
      <div className="review-page">
        <Container className="py-5">
          <div className="text-center">
            <textarea
              defaultValue={userReview}
              id="1"
              className="write-review"
              name="writeReview"
              placeholder={inputPlaceholder}
              rows="5"
              maxlength="255"
              autofocus="true"
              onChange={(e) => {
                setReview(e.target.value);
              }}
            ></textarea>
            <div className="text-center">
              <button
                type="submit"
                className="review-submit-btn"
                onClick={Review}
                disabled={!isEnabled}
              >
                {submitText}
              </button>
            </div>
          </div>
        </Container>
      </div>
      {/* main content  */}
      {/* footer  */}
      <Footer />
    </div>
  );
};

export default reviewPage;
