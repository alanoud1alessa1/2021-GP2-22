import React from "react";
import { Link } from "react-router-dom";

import "./loginButton.css";

function loginButton() {
  return (

    <div className="create">
          <Link to="/login-page">

      <div className="overlap-group4">
        <div className="create-1 roboto-bold-white-28px">Create</div>
      </div>
      </Link>

    </div>
  );
}

export default loginButton;
