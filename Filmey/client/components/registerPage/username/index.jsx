import React from "react";
import "./username.css";

function username() {
  return (
        <div className="overlap-group1-1">
            <div className="r1"></div>
            <input
             className="name roboto-normal-pink-swan-16px"
             name="name"
             placeholder="Enter username"
             type="text"
             required
            />
            <div className="title-1 nunito-normal-river-bed-18px">Username</div>
        </div>
  );
}

export default username;
