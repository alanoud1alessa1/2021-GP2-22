import React from "react";
import "./cinemaInfoPage.css";
import Header from "../header";
import { HiOutlineLocationMarker} from "react-icons/Hi";
import { useParams } from "react-router-dom";

function cinemaInfoPage(props) {

  const runCallback = (cb) => {
    return cb();
  };

      const {
        logo,
        footerText1,
        footerText2,
      } = props;
    
      React.useEffect(() => {
        window.scrollTo(0, 0);
      })

      let { cinema } = useParams();
      console.log(cinema);
      

  return (
      <div className="cinemasPage screen">
        <div className="cinemasPageContainer">
          <div className="cinemasPageBackground"></div>
          <img className="cinemasPageBackgroundImage" src={props.backgroundImage} />
            {/* Header */}
            <header>
              <Header />
            </header>

            <div className="cinmeaInfoContainer roboto-normal-white-20px">

                {cinema=="muvi" &&
                 <div className="cinemaInfoLogo"> 
                  <a
                    href="https://www.muvicinemas.com/en"
                    target="_blank"
                  >
                  <img
                      src="/img/muviLogo.png"
                      height="250"
                      width="370"
                    />
                  </a>
                </div> 
                }

                {cinema=="vox" &&
                <div className="cinemaInfoLogo"> 
                  <a
                    href="https://ksa.voxcinemas.com/"
                    target="_blank"
                  >
                  <img
                      src="/img/voxLogo.png"
                      height="300"
                      width="250"
                    />
                  </a>
                </div> 
                }

                {cinema=="amc" &&
                <div className="cinemaInfoLogo"> 
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
                </div>
                }

                <div className="cinemaInfo">
                 <div className="aboutText  neuton-normal-white-60px5"> 
                     About 
                 <div className="aboutCinema">
                   des
                  </div>
                  </div>

                 <div className="locationsText  neuton-normal-white-60px5"> 
                   Locations 
                
                <div className="allLocations"> 
                {runCallback(() => {
                  const row = [];
                  for (var i = 0; i < 5; i++) {
                    row.push(
                      <div key={i}>
                        {
                         <div className="cinemaLocation">
                            <div className="cinemaLocationIcon"> <HiOutlineLocationMarker size="30px"/> </div>
                            <div className="cinemaLocationName">  MALL - Riyadh </div>
                          </div>
                        }
                      </div>
                    );
                  }
                  return row;
                })}
                </div>
                </div>

                </div>            
            </div>


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

export default cinemaInfoPage;
