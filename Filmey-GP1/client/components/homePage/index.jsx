import React from "react";
import { Link } from "react-router-dom";
import "./homePage.css";
import Axios from "axios";
import { useState } from "react";
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
// import Loop from "../loop";



function homePage(props) {


  const runCallback = (cb) => {
    return cb();
  };

  
  const {
    fireIcon,
    logo,
    footerText1,
    footerText2,
    registerText,
    loginText,
    genresText,
    homeText,
    top10Text,
    icon,
  } = props;

  var registered =false;
  var username="";

  const cookies = new Cookies();
  try{
    const token=cookies.get('token');
    var decoded = jwt_decode(token);
    username=decoded.username;
    registered=true;

  }
  catch{
    registered=false;
    console.log("guest user");}
    
  const logOut=()=>
  {
   cookies.remove('token', { path: '/' });
    window.location.reload();
   }
   

  const api = Axios.create({
    baseURL: "http://localhost:3000/api/v1",
    // headers :{
    //  // 'authorization' : token
})


const [poster1,setPoster1]=useState('');
const [poster2,setPoster2]=useState('');
const [poster3,setPoster3]=useState('');
const [poster4,setPoster4]=useState('');
const [poster5,setPoster5]=useState('');
const [poster6,setPoster6]=useState('');
const [poster7,setPoster7]=useState('');
const [poster8,setPoster8]=useState('');
const [poster9,setPoster9]=useState('');
const [poster10,setPoster10]=useState('');



const posters = [poster1 , poster2 , poster3, poster4 , poster5,
  poster6 , poster7 , poster8 , poster9 , poster10]
  

  const getMovie1 = () =>{
  api.get(`/movies/1`).then((response)=>{

   console.log(response);
   setPoster1(response.data[0].poster);

    })
  }
  getMovie1();

  const getMovie2 = () =>{
    api.get(`/movies/2`).then((response)=>{
  
     console.log(response);
     setPoster2(response.data[0].poster);
  
      })
    }
    getMovie2();


    const getMovie3 = () =>{
      api.get(`/movies/3`).then((response)=>{
    
       console.log(response);
       setPoster3(response.data[0].poster);
    
        })
      }
      getMovie3();

      const getMovie4 = () =>{
        api.get(`/movies/4`).then((response)=>{
      
         console.log(response);
         setPoster4(response.data[0].poster);
      
          })
        }
        getMovie4();

        const getMovie5 = () =>{
          api.get(`/movies/5`).then((response)=>{
        
           console.log(response);
           setPoster5(response.data[0].poster);
        
            })
          }
          getMovie5();

          const getMovie6 = () =>{
            api.get(`/movies/6`).then((response)=>{
          
             console.log(response);
             setPoster6(response.data[0].poster);
          
              })
            }
            getMovie6();

            const getMovie7 = () =>{
              api.get(`/movies/7`).then((response)=>{
            
               console.log(response);
               setPoster7(response.data[0].poster);
            
                })
              }
              getMovie7();

              const getMovie8 = () =>{
                api.get(`/movies/8`).then((response)=>{
              
                 console.log(response);
                 setPoster8(response.data[0].poster);
              
                  })
                }
                getMovie8();

                const getMovie9 = () =>{
                  api.get(`/movies/9`).then((response)=>{
                
                   console.log(response);
                   setPoster9(response.data[0].poster);
                
                    })
                  }
                  getMovie9();

                  const getMovie10 = () =>{
                    api.get(`/movies/10`).then((response)=>{
                  
                     console.log(response);
                     setPoster10(response.data[0].poster);
                  
                      })
                    }
                    getMovie10();


  return (
    <div className="PageCenter">
      <div className="homePage screen">
        <div className="homePageContainer">
          <body>

            {/* Header */}
            <header>
              <div className="header"> 
                <Link to="/home-page">
                  <img className="headerLogo" src={logo} />
                </Link>     
                <div>
                  <Link to="/home-page">
                    <div className="homeText darkergrotesque-medium-white-35px2">{homeText}</div>
                  </Link>
                </div>
                <div>
                  <Link to="/genresPage">
                    <div>
                      <div className="genresText darkergrotesque-medium-white-35px2">{genresText}</div>
                    </div>
                  </Link>
                </div>

                {/* unregisterd user */}
                {(!registered) && (
                <div className="clickable">
                  <Link to="/login-page">
                    <img className="loginIcon" src={icon} />
                    <div>
                      <div className="loginText roboto-normal-white-18px2">{loginText}</div>
                    </div>
                  </Link>
                </div>)}

                 {(!registered) && (
                <div className="clickable">
                  <Link to="/registerPage/reg-page">
                    <img className="registerIcon" src={icon} /> 
                    <div>
                      <div className="registerText roboto-normal-white-18px2">{registerText}</div>
                    </div>
                  </Link>     
                </div>)}
                 {/* registerd user */}
                 {(registered) && (
                <ul>
                    <img  className="regUserIcon" src="/img/regUser.png"/>
                    <li className="dropdown">
                        <a className="dropbtn ">{username}</a>
                        <div className="dropdownContent">
                        <button className="logout" onClick={logOut}>Logout</button>
                        {/* <button className="logout" onClick={logOut}>Logout</button> */}
                        </div>
                    </li>
                </ul>)}    
                
              </div>
            </header>
          
            {/* main */}
            <div className="body">
            </div>

              {/* Title */}
              <div>
                <img className="fireIcon" src={fireIcon} />
                <h1 className="top10Text animate-enter">{top10Text}</h1>
              </div>
  
              <marquee behavior="alternate" direction="left"  scrollamount="12" className="top10Movies" >	
                {/* movies loop	 */}
                {runCallback(() => {
                const row = [];
              
                for (var i = 1; i <= 10; i++) {
                  const url = `/movieInfoPage/ViewMovie/${i}`;
                  const poster = posters[i-1];
                  row.push(
                  <div key={i}>
                  {
                  <div className="moviesLoop">  
                  <Link to={url}>
                  <img className="homeMoviePoster" src={poster}  height="652"  width="512"/>
                  </Link> 
                  </div>
                  }
                  </div>
                  );
                }
                return row;
              })}
              </marquee>

            {/* footer */}
            <footer>
              <div className="footer"> </div>
                <img className="footerLogo" src={logo} />
                <div className="footerText1"> {footerText1}</div>
                <div className="copyRightText inter-light-bon-jour-35px2">
                  <span>{footerText2}</span>
                </div>
            </footer>
          </body>
          
        </div>
      </div>
    </div>
  );
}

export default homePage;
