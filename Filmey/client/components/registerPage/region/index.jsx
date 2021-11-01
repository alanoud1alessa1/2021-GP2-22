import React from "react";
import "./region.css";
import { useState } from "react";
import ReactDOM from "react-dom";

function Region () {
  return (

    <div className="region">
        <div className="title-2 nunito-normal-river-bed-18px">Region</div>
        <div>
            <select className="overlap-group5">
                <option className="name-1 roboto-normal-pink-swan-16px" value="Riyadh" >Riyadh</option>
                <option className="name-1 roboto-normal-pink-swan-16px" value="Makkah">Makkah</option>
                <option className="name-1 roboto-normal-pink-swan-16px"value="Medina">Medina</option>
                <option className="name-1 roboto-normal-pink-swan-16px"value="Qassim">Qassim</option>
                <option className="name-1 roboto-normal-pink-swan-16px"value="Sharqia">Sharqia</option>
                <option className="name-1 roboto-normal-pink-swan-16px"value="Asir">Asir</option>
                <option className="name-1 roboto-normal-pink-swan-16px"value="Tabuk">Tabuk</option>
                <option className="name-1 roboto-normal-pink-swan-16px"value="Hail">Hail</option>
                <option className="name-1 roboto-normal-pink-swan-16px"value="NorthernBorder">Northern Border</option>
                <option className="name-1 roboto-normal-pink-swan-16px"value="Jazan">Jazan</option>
                <option className="name-1 roboto-normal-pink-swan-16px"value="Najran">Najran</option>
                <option className="name-1 roboto-normal-pink-swan-16px"value="AlBaha">AlBaha</option>
                <option className="name-1 roboto-normal-pink-swan-16px"value="Al-Jawf">Al-Jawf</option>
            </select> 

         </div>          
    </div>


  );
}

export default Region ;
