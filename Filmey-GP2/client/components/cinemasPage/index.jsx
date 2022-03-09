import React from "react";
import { Link } from "react-router-dom";
import "./cinemasPage.css";
import Header from "../header";

function cinemasPage(props) {

      const {
        logo,
        footerText1,
        footerText2,
      } = props;
    
      const runCallback = (cb) => {
        return cb();
      };
      
  return (
      <div className="cinemasPage screen">
        <div className="cinemasPageContainer">
          <div className="cinemasPageBackground"></div>
          <img className="cinemasPageBackgroundImage" src={props.backgroundImage} />
            {/* Header */}
            <header>
              <Header />
            </header>
            
            {runCallback(() => {
                  const row = [];
                  for (var i = 0; i < 3; i++) {
                    row.push(
                      <div key={i}>
                        {
            <div className="cinemasContainer">
              <div className="AMCcinemaContainer">
                 <div className="cinmeaContainer roboto-normal-white-20px">
                    <a
                    href="https://www.amctheatres.com/"
                    target="_blank"
                    >
                    <img
                      src="/img/amcLogo.png"
                      height="250"
                      width="350"
                    />
                    </a>
                  <div className="cinemaDescription">
                     AMC des
                  </div>
                   <div className="readMoreCinemaDes">
                    <Link to="/cinemaInfoPage/amc"> 
                    <div className="readMoreText">
                       <strong> Read more..</strong>
                    </div>
                    </Link>
                  </div>  
                 </div>
              </div>
            
              <div className="MuvicinemaContainer">
                 <div className="cinmeaContainer roboto-normal-white-20px">
                  <a
                    href="https://www.muvicinemas.com/en"
                    target="_blank"
                  >
                  <img
                      src="/img/muviLogo.png"
                      height="200"
                      width="350"
                    />
                  </a>
                  <div className="cinemaDescription">
                      muvi des
                  </div>    
                  <div className="readMoreCinemaDes">
                    <Link to="/cinemaInfoPage/muvi"> 
                    <div className="readMoreText">
                       <strong> Read more..</strong>
                    </div>
                    </Link>
                 </div>         
                 </div>
              </div>
            

              <div className="VOXcinemaContainer">
                 <div className="cinmeaContainer roboto-normal-white-20px">
                  <a
                    href="https://ksa.voxcinemas.com/"
                    target="_blank"
                  >
                  <img
                      src="/img/voxLogo.png"
                      height="250"
                      width="200"
                    />
                  </a>
                  
                  <div className="cinemaDescription">
                      vox des
                  </div>   
                  <div className="readMoreCinemaDes">
                    <Link to="/cinemaInfoPage/vox"> 
                      <div className="readMoreText">
                        <strong> Read more..</strong>
                      </div>
                      </Link>
                  </div>  
                 </div>
              </div>
            
            </div>
            }
          </div>
           );
          }
          return row;
         })}
        </div>

        {/* footer */}
          <footer className="cinemasPagefooter">
          <img className="cinemasPagefooterLogo" src={logo} />
          <div className="cinemasPagefooterText1">{footerText1}</div>
          <div className="cinemasPagecopyRightText inter-light-bon-jour-35px2">
              <span>{footerText2}</span>
          </div>
          </footer>
      </div>
  );
}

export default cinemasPage;
