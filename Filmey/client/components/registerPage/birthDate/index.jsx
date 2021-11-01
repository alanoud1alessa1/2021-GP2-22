import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import "./birthDate.css";

function birthDate() {
  const [value, onChange] = useState(new Date());

  return (
<div className="he">
      <div className="fir">
        <DatePicker
          onChange={onChange}
          value={value}
          dateFormat="Pp"
          format="MM/dd/yyyy"
          className="sec"
          placeholder="select your birth date"
          customStyles={{
            dateInput:{borderWidth: 0,marginLeft:40},
            dateIcon: {
              position: 'absolute',
              left: 292222,
              top: 4,
      
              marginRight:9999999,
              marginLeft: 2222
            } }  }  
            onDateChange={(date) => {
              this.setState({date: date})
            }}

    
        />
     </div>
     </div>
    
  );
}
export default birthDate;

