import moment from "moment";
import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { Link } from "react-router-dom";
import Select from "react-select";
import Cookies from "universal-cookie";
import validator from "validator";
import Footer from "../Footer";
import "./registerPage.css";
import api from "../../api/axiosAPI"

//import images
import logo from "../../dist/img/Logo.png";

const registerPage = (props) => {
  const {
    text1,
    text2,
    text3,
    text4,
    text5,
    text6,
    text7,
  } = props;

  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRegion, setUserRegion] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userBirthDate, setUserBirthDate] = useState("");
  const [username_error_message, setUsername_Error_message] = useState("");
  const [email_error_message, setEmail_Error_message] = useState("");
  const [password_error_message, setPassword_Error_message] = useState("");
  const [incorrectpassword_error_message, setIncorrectpassword_Error_message] =
    useState("");
  const [incorrectEmail_error_message, setIncorrectemail_Error_message] =
    useState("");

  var [Displayvalue, getvalue] = useState("");
  const [value, onChange] = useState();

  const [allGenres, setAllGenres] = useState([]);

  var usernameMessage = "";
  var emailMessage = "";
  var passwordMessage = "";

  const isEnabled =
    username.length > 0 &&
    userEmail.length > 0 &&
    userPassword.length > 0 &&
    userGender != "" &&
    userRegion != "" &&
    Displayvalue != "" &&
    value != undefined &&
    incorrectpassword_error_message == "" &&
    incorrectEmail_error_message == "";

  //incorrect password
  const checkPassword = (value) => {
    if (value.length < 8) {
      setIncorrectpassword_Error_message(
        "Password length should be at least 8 characters"
      );
    } else {
      setIncorrectpassword_Error_message("");
    }
  };

  //incorrect email
  const checkEmail = (value) => {
    if (validator.isEmail(value)) {
      setIncorrectemail_Error_message("");
    } else {
      setIncorrectemail_Error_message("Email is invalid");
    }
  };

  var getGenres = (e) => {
    getvalue(Array.isArray(e) ? e.map((x) => x.label) : []);
  };

  React.useEffect(() => {
    const genresArray = [...allGenres];
    const allGens = [
      "Action",
      "Adventure",
      "Animation",
      "Comedy",
      "Crime",
      "Documentary",
      "Drama",
      "Family",
      "History",
      "Horror",
    ];

    for (var i = 0; i < 10; i++) {
      genresArray[i] = { value: i, label: allGens[i] };
    }
    setAllGenres(genresArray);
  }, []);

  const Register = () => {
    const res = api.post("users/register", {
      email: userEmail,
      username: username,
      password: userPassword,
      date_of_birth: value,
      gender: userGender,
      location: userRegion,
      genres: Displayvalue,
    }).then((res) => {
      try {
        if (res.data.usernameMessage.usernameMessage) {
          usernameMessage = res.data.usernameMessage.usernameMessage;
          setUsername_Error_message(usernameMessage);
        } else {
          setUsername_Error_message("");
        }

        if (res.data.emailMessage.emailMessage) {
          emailMessage = res.data.emailMessage.emailMessage;
          setEmail_Error_message(emailMessage);
        } else {
          setEmail_Error_message(emailMessage);
        }

        if (res.data.passwordMessage.passwordMessage) {
          passwordMessage = res.data.passwordMessage.passwordMessage;
          setPassword_Error_message(passwordMessage);
        } else {
          setPassword_Error_message("");
        }
      } catch {
        if (passwordMessage || emailMessage || usernameMessage) {
          return;
        } else {
          const cookies = new Cookies();
          cookies.set("token", res.data, { path: "/" });
          window.location = "/home-page";
        }
      }
    });
  };

  return (
    <div>
      <div className="register-section">
        <Container fluid>
          <Row>
            <Col sm={6} md={6}>
              <Link to="/home-page">
                <img className="register-logo" src={logo} />
              </Link>
              <div className="reg-title-box">
                <h2 className="reg-title">{text1}</h2>
              </div>
            </Col>
            <Col className="register-form" sm={6} md={6}>
              <div>
                <h3 className="get-start">Get Started</h3>
                <div className=" mb-4">
                  <h4 className="account-text">
                    Already have an account?
                    <Link className="login-text" to="/login-page">
                      <strong>Login</strong>
                    </Link>
                  </h4>
                </div>

                <Form onSubmit={Register}>
                  {/* user name  */}
                  <Form.Group className="mb-3 input-field-box">
                    <Form.Label className="nunito-normal-river-bed-18px mt-3">
                      Username <span className="required">*</span>{" "}
                    </Form.Label>
                    <Form.Control
                      className="input-field"
                      name="username"
                      placeholder="Enter username"
                      type="text"
                      required
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />

                    <p className="error nunito-normal-river-bed-18px">
                      {username_error_message}
                    </p>
                  </Form.Group>
                  {/* email  */}
                  <Form.Group className="mb-5 input-field-box">
                    <Form.Label className="nunito-normal-river-bed-18px mt-3">
                      Email <span className="required">*</span>
                    </Form.Label>
                    <Form.Control
                      className="input-field"
                      name="email"
                      placeholder="Enter your email"
                      type="email"
                      required
                      onChange={(e) => {
                        setUserEmail(e.target.value);
                        checkEmail(e.target.value);
                      }}
                    />
                    <p className="error nunito-normal-river-bed-18px">
                      {email_error_message} {incorrectEmail_error_message}
                    </p>
                  </Form.Group>
                  {/* Password  */}
                  <Form.Group className="mb-5 input-field-box">
                    <Form.Label className="nunito-normal-river-bed-18px mt-3">
                      Password <span className="required">*</span>
                    </Form.Label>
                    <Form.Control
                      className="input-field"
                      name="password"
                      placeholder="at least 8 characters "
                      type="password"
                      required
                      onChange={(e) => {
                        setUserPassword(e.target.value);
                        checkPassword(e.target.value);
                      }}
                      minlength="8"
                    />
                    <p className="error nunito-normal-river-bed-18px">
                      {password_error_message} {incorrectpassword_error_message}
                    </p>
                  </Form.Group>
                  {/* region  */}
                  <Form.Group className="mb-3">
                    <Form.Label className="nunito-normal-river-bed-18px mt-3">
                      Region <span className="required">*</span>
                    </Form.Label>
                    <Form.Select
                      className="input-field"
                      required
                      onChange={(e) => {
                        setUserRegion(e.target.value);
                      }}
                    >
                      <option
                      selected
                      disabled
                      hidden
                      value="" 
                      >Select your region..</option>
                      <option>Riyadh</option>
                      <option>Makkah</option>
                      <option>Medina</option>
                      <option>Qassim</option>
                      <option>Sharqia</option>
                      <option>Asir</option>
                      <option>Tabuk</option>
                      <option>Hail</option>
                      <option>Northern Border</option>
                      <option>Jazan</option>
                      <option>Najran</option>
                      <option>AlBaha</option>
                      <option>Al-Jawf</option>
                    </Form.Select>
                  </Form.Group>
                  {/* Gender  */}
                  <Form.Group className="mb-3">
                    <Form.Label className="nunito-normal-river-bed-18px mt-3">
                      Gender <span className="required">*</span>
                    </Form.Label>
                    <div className="mt-2 d-flex flex-column flex-md-row">
                      <span className="gender-radio">
                        <Form.Check
                          type="radio"
                          inline
                          label="Female"
                          required
                          value="Female"
                          name="gender"
                          onChange={(e) => {
                            setUserGender(e.target.value);
                          }}
                        />
                      </span>
                      <span className="gender-radio">
                        <Form.Check
                          type="radio"
                          inline
                          label="Male"
                          required
                          value="Male"
                          name="gender"
                          onChange={(e) => {
                            setUserGender(e.target.value);
                          }}
                        />
                      </span>
                    </div>
                  </Form.Group>
                  {/* date  */}
                  <Form.Group>
                    <Form.Label className="nunito-normal-river-bed-18px mt-3">
                      Birth date <span className="required">*</span>
                    </Form.Label>
                    <DatePicker
                      valueDefault={""}
                      onChange={onChange}
                      value={value}
                      dateFormat="Pp"
                      format="MM/dd/yyyy"
                      className="date-picker input-field"
                      placeholder="select your birth date"
                      dayPlaceholder="date"
                      monthPlaceholder="month"
                      yearPlaceholder="year"
                      required
                      maxDate={moment().toDate()}
                      onDateChange={(date) => {
                        this.setState({ date: date });
                      }}
                      customStyles={{
                        dateIcon: {
                          //display: 'none',
                          position: "absolute",
                          left: 0,
                          top: 400,
                          marginLeft: 0,
                        },
                        dateInput: {
                          marginLeft: 36,
                          color: "red",
                          backgroundColor: "black",
                        },
                      }}
                    />
                  </Form.Group>
                  {/* Password  */}
                  <Form.Group className="mb-3 mt-3">
                    <Form.Label className="nunito-normal-river-bed-18px mt-3">
                      Which of these is your favorite movie genre?{" "}
                      <span className="required">*</span>
                    </Form.Label>
                    <div>
                      <div>
                        <Select
                          isMulti //options={genres}
                          options={allGenres}
                          onChange={getGenres}
                          closeMenuOnSelect={false}
                          isSearchable
                          placeholder="Select your favorite movie genres.."
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                              ...theme.colors,
                              text: "var(--cardinal)",
                              primary: "var(--cardinal)",
                            },
                          })}
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              minHeight: 56,
                              background: "#fcfcfc",
                              outline: "none",
                              border: "0px solid black",
                              fontSize: "16px",
                              boxShadow: state.isFocused
                                ? "0px 4px 4px red"
                                : "0px 4px 4px #00000040",
                              borderRadius: 5,
                            }),

                            multiValueLabel: (base) => ({
                              ...base,
                              backgroundColor: "var(--white-3)",
                              color: "black",
                            }),

                            multiValueRemove: (base) => ({
                              ...base,
                              backgroundColor: "var(--cardinal)",
                              color: "white",
                            }),
                          }}
                        ></Select>
                      </div>
                    </div>
                  </Form.Group>
                  {/* creat button */}
                  <div className="text-center d-flex justify-content-center">
                    <button
                      type="button"
                      className="registerBtn roboto-bold-white-28px"
                      disabled={!isEnabled}
                      onClick={Register}
                    >
                      Create
                    </button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* footer  */}
      <Footer />
    </div>
  );
};

export default registerPage;
