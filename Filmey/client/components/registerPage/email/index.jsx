import React from "react";
import "./email.css";

function email() {
  return (
    <div className="email">
      <div className="title-9 nunito-normal-river-bed-18px">Email</div>
      <div className="overlap-group2">
        <input
          className="nouf3gmailcom roboto-normal-pink-swan-16px"
          name="nouf3gmailcom"
          placeholder="nouf3@gmail.com"
          type="email"
          required
        />
      </div>
    </div>
  );
}

export default email;
