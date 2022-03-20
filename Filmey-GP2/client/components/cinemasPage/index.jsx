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
                      className="cinemaLogo"
                      src="/img/amcLogo.png"
                      height="200"
                      width="350"
                    />
                    </a>
                  <div className="cinemaDescription">
                  <strong> AMC Cinemas </strong> is dedicated to innovating the way you see movies. Don’t just visit a cinema; experience the AMC difference of premium formats that bring you superior acoustics, richer imagery, and a choice between Real D® 3D, Dolby Cinema®, and IMAX® technologies. Taste our special menu of elevated cinema favorites and enjoy bolder flavors, wider variety, and superior quality movie snacks. Reserve your seats when you purchase tickets online and on our app and relax into the spacious comforts of our luxe recliners. Come and enjoy the very best of cutting-edge entertainment when you choose AMC Cinemas.
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
                      className="cinemaLogo"
                      src="/img/muviLogo.png"
                      height="180"
                      width="350"
                    />
                  </a>
                  <div className="cinemaDescription">
                  <strong> Muvi Cinemas </strong>is the first home-grown cinema brand and the market leader in terms of screen count in the Kingdom of Saudi Arabia. Established in 2019 with headquarters in Riyadh, it is owned and operated by muvi Cinemas Co. muvi continues its expansion plan in the upcoming years across the kingdom offering state-of-the-art technology, diverse and immersive experiences combined with unlimited options from our delicious menu to give moviegoers complete and exceptional cinema experience.
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
                      className="cinemaLogo"
                      src="/img/voxLogo.png"
                      height="160"
                      width="300"
                    />
                  </a>
                  
                  <div className="cinemaDescription">
                  <strong> VOX Cinemas </strong>  the MENA region’s largest cinema operator, is honoured to be awarded one of the first licenses to operate cinemas in Saudi Arabia. Its brand-new cinema, which will be the first multiplex in Saudi Arabia will open at Riyadh Park Mall. VOX Cinemas will start delivering on an ambitious plan to bring its world-class cinema entertainment portfolio to Saudi Arabia and support the growth of audio-visual and creative talent across the Kingdom. VOX Cinemas parent company Majid Al Futtaim, the leading shopping mall, communities, retail and leisure pioneer across the Middle East...
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
