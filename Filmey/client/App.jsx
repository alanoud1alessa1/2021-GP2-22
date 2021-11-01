import "./App.css";
import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import RegPage from "./components/registerPage/regPage";
import LoginPage from "./components/loginPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/registerPage/reg-page"> 
          <RegPage {...regPageData} />
        </Route>
        <Route path="/:path(|login-page)">
          <LoginPage {...loginPageData} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
const regPageData = {
    text1: <>Let’s End Boredom <br />Find The Best <br />Movies</>,
    text2: <>Filmey © 2021<br /></>,
    text3: "Get Started",
    text4: "Already have an account?",
    text5: "Login",
    backgroundImage: "/img/bgclg@1x.png",
    logo: "/img/screen-shot-1443-02-29-at-5-28-2@2x.png",
    text6: "Birth date",
    text7: "Which of these is your favorite movie genre?",
};

const loginPageData = {
    backgroundImage: "/img/bgclg@1x.png",
    logo: "/img/screen-shot-1443-02-29-at-5-28-2@2x.png",
    text1: "WELCOME BACK!",
    text2: "Don’t have a account,",
    text3: "Register",
    emailUsername: "Email / Username",
    emailUsernameinputType: "text",
    emailUsernamePlaceholder: "Enter your name or email",
    password: "Password",
    passwordinputType: "password",
    passwordPlaceholder: "Enter your password",
    text4: "Log In",
};

