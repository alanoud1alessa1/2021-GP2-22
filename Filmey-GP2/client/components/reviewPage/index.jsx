import React from "react";
import "./reviewPage.css";
import { Link } from "react-router-dom";
import Header from "../header";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import Axios from "axios";
import utf8 from "utf8";
import Filter from "bad-words";

function reviewPage(props) {
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
      const res = Axios.post("http://localhost:3000/api/v1/users/Review", {
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
      const res = Axios.post("http://localhost:3000/api/v1/users/editReview", {
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
      Axios.get(
        `http://localhost:3000/api/v1/users/getUserReview/${id}/${userID}`
      ).then((response) => {
        setUserReview(response.data[0]);
      });
    }
  });

  return (
    <div className="PageCenter">
      <div className="reviewPage screen">
        <div className="reviewPageContainer"></div>

        {/* Header */}
        <header>
          <Header />
        </header>

        {/* main */}
        <main>
          <div className="reviewBody"></div>
          <div>
            <div className="reviewBox"></div>
            <textarea
              defaultValue={userReview}
              id="1"
              className="writeReview"
              name="writeReview"
              placeholder={inputPlaceholder}
              rows="5"
              cols="73"
              maxlength="255"
              autofocus="true"
              onChange={(e) => {
                setReview(e.target.value);
              }}
            ></textarea>
            <div className="submitButton">
              <button
                type="submit"
                className="submitButtonContainer"
                onClick={Review}
                disabled={!isEnabled}
              >
                {submitText}
              </button>
            </div>
          </div>
        </main>

        {/* footer */}
        <footer>
          <div className="reviewFooter"> </div>
          <img className="reviewFooterLogo" src={logo} />
          <div className="reviewfooterText1">{footerText1}</div>
          <div className="reviewcopyRightText inter-light-bon-jour-35px2">
            <span>{footerText2}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default reviewPage;
