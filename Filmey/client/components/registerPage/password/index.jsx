import React from "react";
import "./password.css";

function password() {
  return (
    <div className="password">
      <div className="title-10 nunito-normal-river-bed-18px">Password</div>
      <div className="overlap-group3">
        <input
          className="at-least-8-characters roboto-normal-pink-swan-16px"
          name="atleast8characters"
          placeholder="at least 8 characters "
          type="password"
          required
        />
      </div>
    </div>
  );
}

export default password;
