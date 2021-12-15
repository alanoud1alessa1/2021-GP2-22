import React from "react";
import  { useState } from 'react';
import DatePicker from 'react-date-picker';
import { Link } from "react-router-dom";
import "./regPage.css";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from 'universal-cookie';
import Select from 'react-select';
import moment from 'moment';
import validator from 'validator'





function regPage(props) {

  const {
    backgroundImage,
    logo,
    text1,
    text2,
    text3,
    text4,
    text5,
    text6,
    text7,
  } = props;

  
  const [username,setUsername]=useState('');
  const [userEmail,setUserEmail]=useState('');
  const [userPassword,setUserPassword]=useState('');
  const [userRegion,setUserRegion]=useState('');
  const [userGender,setUserGender]=useState('');
  const [userBirthDate,setUserBirthDate]=useState('');
  const [username_error_message,setUsername_Error_message]=useState('');
  const [email_error_message,setEmail_Error_message]=useState('');
  const [password_error_message,setPassword_Error_message]=useState('');
  const [incorrectpassword_error_message,setIncorrectpassword_Error_message]=useState('');
  const [incorrectEmail_error_message,setIncorrectemail_Error_message]=useState('');

  var [Displayvalue,getvalue]=useState('');
  const [value, onChange] = useState();

  const [allGenres,setAllGenres]=useState([]);


  var usernameMessage="";
  var emailMessage="";
  var passwordMessage="";


  const isEnabled = username.length > 0 && userEmail.length > 0 && userPassword.length > 0 && userGender!='' 
  && userRegion!='' && Displayvalue!='' && value != undefined && incorrectpassword_error_message=="" && incorrectEmail_error_message=="";


  
//incorrect password
  const checkPassword = (value) => {
    if( value.length<8 ){
      setIncorrectpassword_Error_message('Password length should be at least 8 characters');
      }

     else {
      setIncorrectpassword_Error_message('');
  }

}


//incorrect email
const checkEmail= (value) => {

  if( validator.isEmail(value)){
    setIncorrectemail_Error_message("");
    }

   else {
    setIncorrectemail_Error_message("Email is invalid");
}

}

  //var a=[];
  var getGenres=(e)=>{
    console.log(Array.isArray(e)?e.map(x=>x.label):[]);
    getvalue(Array.isArray(e)?e.map(x=>x.label):[]);

  }
  console.log(Displayvalue);

  const API_URL = "http://localhost:3000/api/v1/";

  React.useEffect(() => {

      const genresArray = [...allGenres];
      const allGens = [ "Action","Adventure","Animation", "Comedy","Crime", "Documentary","Drama", "Family","History","Horror"];

      for (var i = 0; i < 10; i++) {

        genresArray[i] = {value:i, label: allGens[i]};
      }
      console.log(genresArray)
      setAllGenres(genresArray);

    // });
  }, []);



  const  Register=()=>{
    console.log(userEmail);
    console.log(username);
    console.log(userPassword);
    console.log(userGender);
    console.log(userRegion);
    console.log(value);

    const res =  Axios.post(API_URL + "users/register",{
      email: userEmail,
      username: username,
      password:userPassword,
      date_of_birth : value,
      gender: userGender,
      location:userRegion,
      genres:Displayvalue,
    }
    )
    
    .then((res)=>{
      console.log("inside res");
      
      //console.log(userPassword.length);
      try{
      if(res.data.usernameMessage.usernameMessage)
      {
        usernameMessage=res.data.usernameMessage.usernameMessage;
        console.log(res.data.usernameMessage.usernameMessage);
        setUsername_Error_message(usernameMessage);
      }
      else{
        setUsername_Error_message("");
      }
    
      if (res.data.emailMessage.emailMessage){
        emailMessage=res.data.emailMessage.emailMessage;
        console.log(res.data.emailMessage.emailMessage);
        setEmail_Error_message(emailMessage);
      }
      else{
        setEmail_Error_message(emailMessage);
      }
      if (res.data.passwordMessage.passwordMessage){
        console.log("inside password condition");
        
        passwordMessage=res.data.passwordMessage.passwordMessage;
        setPassword_Error_message(passwordMessage);
      }
      else {
        setPassword_Error_message("");
      }
      

    }
      catch{
         if (passwordMessage||emailMessage||usernameMessage){
          return;
        }
        else{
            console.log("inside res data");
           const cookies = new Cookies();
            cookies.set('token', res.data, { path: '/' });
            alert("Welcome "+username+"! you have successfully registerd.");
           window.location = '/home-page';}
          }
      })
    }
      
    

  return (
    <div className="PageCenter">
      <div className="regPage screen">
        <div className="regPageContainer">
         <div className="leftSide"></div>
         <img className="regBackgroundImage" src={backgroundImage} />
         <Link to="/home-page">
          <img className="logo" src={logo} />
         </Link>    
         <div className="regText1">{text1}</div>
         <div className="regText2 inter-light-bon-jour-35px1">
           <span className="inter-light-bon-jour-35px1">{text2}</span>
         </div>
         <div className="regComponents">
           <h1 className="regText3"> {text3}</h1> 
           <div className="regText4">{text4}</div>
           <div>
             <Link to="/login-page">
               <div className="gologinPage">
                 <span className="regText5"> <strong> {text5} </strong> </span>
               </div>
             </Link>
           </div>
          </div>

          <form onSubmit={Register}>
            {/* username */}
            <div className="usernameContainer">
            <div className="regErrorMessage nunito-normal-river-bed-18px"> <strong>  {username_error_message}   </strong>  </div>
            <div className="usernameText nunito-normal-river-bed-18px">Username</div>
              <div className="usernameBox"></div>
              <input
              className="username roboto-normal-pink-swan-16px"
              name="username"
              placeholder="Enter username"
              type="text"
              required
              onChange={
                (e)=>{
                  setUsername(e.target.value); 
                } 
              }
              />
            </div>

            {/* email */}
            <div className="emailContainer">
              <div className="emailText nunito-normal-river-bed-18px">Email</div>
              <div className="emailBox">
                <input
                  className="email roboto-normal-pink-swan-16px"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  required
                  onChange={
                    (e)=>{
                      setUserEmail(e.target.value); 
                      checkEmail(e.target.value);
                    }
                  }
                />
              </div>
              <div className="regErrorMessage nunito-normal-river-bed-18px">  <strong>  {email_error_message} {incorrectEmail_error_message} </strong>  </div>
            </div>

            {/* password */}
            <div className="passwordContainer">
              <div className="passwordText nunito-normal-river-bed-18px">Password</div>
              <div className="passwordBox">
                <input
                  className="password roboto-normal-pink-swan-16px"
                  name="password"
                  placeholder="at least 8 characters "
                  type="password"
                  required
                  onChange={
                    (e)=>{
                      setUserPassword(e.target.value); 
                      checkPassword(e.target.value); 
                    }
                  }
                  minlength="8"
                />
              </div>
              <div className="regErrorMessage nunito-normal-river-bed-18px"> <strong>  {password_error_message} {incorrectpassword_error_message}  </strong>  </div>
            </div>

            {/*Gender*/}
            <div className="genderContainer">
              <div className="genderBoxes">
                  <div className="genderText nunito-normal-river-bed-18px">Gender</div>
                  <div className="femalBox border-2px-cardinal">
                      <div class="genreRadio">   
                        <input  className="femaleOption border-2px-cardinal"  
                        type="radio" 
                        value="Female"
                         name="gender" 
                         onChange={
                          (e)=>{
                            setUserGender(e.target.value); 
                          }
                        }
                          /> 
                        <span className="femaleText nunito-normal-river-bed-18px"> Female</span> 
                      </div>
                  </div>
              </div>
              <div className="maleBox border-2px-cardinal">
                      <div class="genreRadio"> 
                          < input  className="maleOption"
                           type="radio" 
                           value="Male" 
                           name="gender" 
                           onChange={
                            (e)=>{
                              setUserGender(e.target.value); 
                            }
                          } /> 
                          <span className="maleText nunito-normal-river-bed-18px"> Male</span> 
                      </div>
              </div>
            </div>

            {/*Region*/}
            <div className="regionContainer">
              <div className="regionText nunito-normal-river-bed-18px">Region</div>
              <div>
                  <select   className="regionBox" 
                  required 
                  onChange={(e)=>{setUserRegion(e.target.value);}}> 
                      <option selected disabled hidden className="selectText roboto-normal-pink-swan-16px" value=""> Select your region..</option>
                      <option className="regionOption roboto-normal-pink-swan-16px" value="Riyadh" >Riyadh</option>
                      <option className="regionOption roboto-normal-pink-swan-16px" value="Makkah">Makkah</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="Medina">Medina</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="Qassim">Qassim</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="Sharqia">Sharqia</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="Asir">Asir</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="Tabuk">Tabuk</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="Hail">Hail</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="NorthernBorder">Northern Border</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="Jazan">Jazan</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="Najran">Najran</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="AlBaha">AlBaha</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="Al-Jawf">Al-Jawf</option>
                  </select> 
              </div>          
            </div>
            <div className="bdContainer">
              <div className="regText6 nunito-normal-river-bed-18px">{text6}</div>

              {/* BOD */}
                  <DatePicker
                    valueDefault={""}
                    onChange={onChange}
                    value={value}
                    dateFormat="Pp"
                    format="MM/dd/yyyy"
                    className="datePicker"
                    placeholder="select your birth date"
                    placeholder="select date"
                    dayPlaceholder="date"
                    monthPlaceholder="month"
                    yearPlaceholder="year"
                    required 
                    maxDate={moment().toDate()}
                    onDateChange={(date) => {
                        this.setState({date: date})
                      }}
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 400,
                        marginLeft: 0,
                      },
                      dateInput: {
                        marginLeft: 36,
                        color: 'red',
                        backgroundColor: 'black',
                      },
                    }}
                  />
            </div>

            <div className="genreContainer">
              <div className="regText7 nunito-normal-river-bed-18px">{text7}</div>
              <div className="multiSelect"> 

                <Select isMulti //options={genres} 
                options={allGenres}
                 onChange={getGenres}
                 closeMenuOnSelect={false} 
                 isSearchable
                 className="favGenre"
                 placeholder="Select your favorite movie genres.."
                 theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                  ...theme.colors,
                    text: 'var(--cardinal)',
                    primary: 'var(--cardinal)',
                  }, 
                })}
                styles={{
                 control: (provided, state) => ({
                    ...provided,
                    minHeight: 56,
                    background:'#fcfcfc',
                    outline: 'none',            
                    border: "0px solid black",
                    fontSize:"16px",
                    boxShadow: state.isFocused ? '0px 4px 4px red' :'0px 4px 4px #00000040',
                    borderRadius: 5,
                  }),

                 multiValueLabel: (base) => ({
                    ...base,
                    backgroundColor: 'var(--white-3)',
                    color: 'black',
                  }),

                  multiValueRemove: (base) => ({
                    ...base,
                    backgroundColor: 'var(--cardinal)',
                    color: 'white',
                  }),
                }}
                 >
                   
                 </Select>

               </div>
            </div>

            {/* creat button */}
              <button type="button" className="creatButtonBox" disabled={!isEnabled} onClick={Register}  > 
                <div className="createText roboto-bold-white-28px" >Create</div>
              </button>           
          </form>
        </div>
      </div>
    </div>
    
  );
}

export default regPage;

