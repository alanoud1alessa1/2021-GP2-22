import React, { Component } from "react";
import Select from "react-select";
import "./MultiChoices.css";


let options = [ 
  { value: "Drama", label: "Drama"}, 
  { value: "Comedy", label: "Comedy" },
  { value: "Horror", label: "Horror"},
  { value: "Action", label: "Action"},
  { value: "Other", label: "Other" },
];


class MultiChoices extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  handleInputChange = (value, e) => {
    if (e.action === "input-change") {
      this.setState({ value });
    }
  };


  render() {
    return (
      
      <div className="start">
          <div classNeme="lol" style={{width: '580px', padding: "18px 15px"}}>
      <Select 
        className="react-select"
        classNamePrefix="react-select"
        isMulti
        myFontSize="18px" 
        options={options}
        closeMenuOnSelect={false}
        onInputChange={this.handleInputChange}
        inputValue={this.state.value}
      /> 
      </div>
      </div>
    );
  }
}
export default MultiChoices;
