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

const customStyles = {
  control: base => ({
    ...base,
    height: 56,
    minHeight: 35,
    background:'#fcfcfc',
    outline: 'none',            
    border: "0px solid black",
    fontSize:"16px",
    boxShadow: '0px 4px 4px #00000040',
    borderRadius: 5,
  })
};

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
      <div>
          <div style={{width: '580px', padding: "18px 15px"}}>
      <Select 
        className="select"
        classNamePrefix="react-select"
        isMulti
        options={options}
        closeMenuOnSelect={false}
        onInputChange={this.handleInputChange}
        inputValue={this.state.value}
        styles={customStyles}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
          ...theme.colors,
            text: 'var(--cardinal)',
            primary25: 'var(--cardinal)',
            primary: 'var(--cardinal)',
          }, 
        })}
      /> 
      </div>
    </div>
    );
  }
}
export default MultiChoices;
