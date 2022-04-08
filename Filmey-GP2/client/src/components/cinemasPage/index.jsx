import React from "react";
import { Link } from "react-router-dom";
import "./cinemasPage.css";
import Header from "../header";
import Footer from "../Footer";

//import images
import amcLogo from   "../../dist/img/amcLogo.png";
import muviLogo from  "../../dist/img/muviLogo.png";
import voxwhite from  "../../dist/img/voxWhite.png";
import backgroundImg from "../../static/img/backgroundImage.png";




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
          <img className="cinemasPageBackgroundImage" src={backgroundImg} />
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
                      src= {amcLogo}
                      // src="/img/amcLogo.png"
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
                      src={muviLogo}
                      // src="/img/muviLogo.png"
                      height="180"
                      width="350"
                    />
                  </a>
                  <div className="cinemaDescription">
                  <strong> uvi Cinemas </strong>is the first home-grown cinema brand and the market leader in terms of screen count in the Kingdom of Saudi Arabia. Established in 2019 with headquarters in Riyadh, it is owned and operated by muvi Cinemas Co. muvi continues its expansion plan in the upcoming years across the kingdom offering state-of-the-art technology, diverse and immersive experiences combined with unlimited options from our delicious menu to give moviegoers complete and exceptional cinema experience.
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
                      src ={voxwhite}
                      // src="../../dist/img/voxwhite.png"
                      height="160"
                      width="160"
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
        <Footer />
      </div>
  );
}

export default cinemasPage;
