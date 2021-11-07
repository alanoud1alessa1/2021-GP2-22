import React from "react";
import { Link } from "react-router-dom";
import "./homePage.css";
import Axios from "axios";
import { useState } from "react";
// import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink } from 'mdb-react-ui-kit';
// import ScriptTag from 'react-script-tag';
// import {Helmet} from "react-helmet";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
} from 'mdb-react-ui-kit';


function homePage(props) {

  // const Demo = props => (
  //   <ScriptTag type="text/javascript" src="./dropdown.js" />
  //   )

  // const Demo = props => (
  //   <div className="application">
  //               <Helmet>
  //                 <script src="/dropdown.js" type="text/javascript" />
  //               </Helmet>
  //               ...
  //           </div>
      
  //   );

  var myFunction = function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
    window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
  }
    
  };

  
  const {
    fireIcon,
    logo,
    footerText1,
    footerText2,
    registerText,
    loginText,
    genresText,
    languageText,
    homeText,
    top10Text,
    icon,
    homeMoviePoster,
  } = props;

  // const token = '';
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
                <img className="headerLogo" src={logo} />
                <div className="clickable">
                  <div className="languageContainer"></div>
                  <div className="languageText">{languageText}</div>
                </div>
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
                <div className="clickable">
                  <Link to="/login-page">
                    <img className="loginIcon" src={icon} />
                    <div>
                      <div className="loginText roboto-normal-white-18px2">{loginText}</div>
                    </div>
                  </Link>
                </div>
                <div className="clickable">
                  <Link to="/registerPage/reg-page">
                    <img className="registerIcon" src={icon} /> 
                    <div>
                      <div className="registerText roboto-normal-white-18px2">{registerText}</div>
                    </div>
                  </Link>     
                </div>
              </div>
            </header>
          
            {/* main */}
            <div className="body"></div>
              {/* Title */}
              <div>
                <img className="fireIcon" src={fireIcon} />
                <h1 className="top10Text animate-enter">{top10Text}</h1>
              </div>
  
              <marquee behavior="alternate" direction="left" className="top10Movies">		
                {/* Movie1 */}
                  <Link to="/movieInfoPage/ViewMovie/1">
                      <img className="homeMoviePoster" src={poster1}  height="652"  width="512"/>
                  </Link>

                {/* Movie2 */}
                  <Link to="/movieInfoPage/ViewMovie/2">
                      <img className="homeMoviePoster" src={poster2}  height="652"  width="512"/>
                  </Link>                 

                {/* Movie3 */}
                  <Link to="/movieInfoPage/ViewMovie/3">
                      <img className="homeMoviePoster" src={poster3}  height="652"  width="512"/>
                  </Link>

                {/* Movie4 */}
                <Link to="/movieInfoPage/ViewMovie/4">
                  <img className="homeMoviePoster" src={poster4}  height="652"  width="512"/>
                </Link>

                {/* Movie5 */}
                <Link to="/movieInfoPage/ViewMovie/5">
                      <img className="homeMoviePoster" src={poster5}  height="652"  width="512"/>
                </Link>

                {/* Movie6 */}        
                  <Link to="/movieInfoPage/ViewMovie/6">
                      <img className="homeMoviePoster" src={poster6}  height="652"  width="512"/>
                  </Link>

                
                {/* Movie7 */}
                <Link to="/movieInfoPage/ViewMovie/7">
                  <img className="homeMoviePoster" src={poster7}  height="652"  width="512"/>
                </Link>                

                {/* Movie8 */}
                <Link to="/movieInfoPage/ViewMovie/8">
                  <img className="homeMoviePoster" src={poster8}  height="652"  width="512"/>
                </Link>
  
                {/* Movie9 */}
                <Link to="/movieInfoPage/ViewMovie/9">
                  <img className="homeMoviePoster" src={poster9}  height="652"  width="512"/>
                </Link>

                {/* Movie10 */}
                <Link to="/movieInfoPage/ViewMovie/10">
                  <img className="homeMoviePoster" src={poster10}  height="652"  width="512"/>
                </Link>
              </marquee>

            {/* footer */}
            <footer>
              <div className="footer"> </div>
                <img className="footerLogo" src={logo} />
                <div className="footerText1">{footerText1}</div>
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
