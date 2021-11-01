
import React from "react";
import "./gender.css";

function gender() {
  return (

    
    <div className="gender">
    <div className="flex-col">
        <div className="title-3 nunito-normal-river-bed-18px">Gender</div>
        <div className="overlap-group7 border-2px-cardinal">
            <div class="radio_genre">   
                <input  className="ellipse-5 border-2px-cardinal"  type="radio" value="Female" name="gender" /> 
               <span className="title-4 nunito-normal-river-bed-18px"> Female</span> 
             </div>
        </div>
    </div>
    <div className="overlap-group6 border-2px-cardinal">
            <div class="radio_genre"> 
                < input  className="ellipse-6" type="radio" value="Male" name="gender" /> 
                <span className="title-5 nunito-normal-river-bed-18px"> Male</span> 
            </div>
   </div>
</div>


  );
}

export default gender;
