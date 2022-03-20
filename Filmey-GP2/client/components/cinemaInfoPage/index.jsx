import React from "react";
import "./cinemaInfoPage.css";
import Header from "../header";
import { HiOutlineLocationMarker} from "react-icons/Hi";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";

function cinemaInfoPage(props) {

  const runCallback = (cb) => {
    return cb();
  };

  const api = Axios.create({
    baseURL: "http://localhost:3000/api/v1",
  });


      const {
        logo,
        footerText1,
        footerText2,
      } = props;
    

      const [cinemaCitys, setCinemaCitys] = useState([]);
      const [cinemaLocations, setCinemaLocations] = useState([]);
      const [numOfLocations, setNumOfLocations] = useState(0);

     
      let { cinema } = useParams();
      console.log(cinema);

      React.useEffect(() => {
        window.scrollTo(0, 0);
        api.get(`/cinema/cinemaLocations/${cinema}`).then((response) => {
          //console.log(response.data)
          setNumOfLocations(response.data.length)
          var cinemaCityArray = [...cinemaCitys];
          var cinemaLocationArray = [...cinemaLocations];

          for (var i = 0; i < response.data.length; i++) {
            cinemaCityArray[i]=response.data[i].city
            cinemaLocationArray[i]=response.data[i].location
          }

          setCinemaCitys(cinemaCityArray);
          setCinemaLocations(cinemaLocationArray);
        })
        window.scrollTo(0, 0);
      }, []);

      // let { cinema } = useParams();
      // console.log(cinema);
      

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
                      height="200"
                      width="400"
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
            {cinema=="vox"&& 
                 <div className="aboutCinema">
                <strong>  VOX Cinemas </strong>, the MENA region’s largest cinema operator, is honoured to be awarded one of the first licenses to operate cinemas in Saudi Arabia. Its brand-new cinema, which will be the first multiplex in Saudi Arabia will open at Riyadh Park Mall. VOX Cinemas will start delivering on an ambitious plan to bring its world-class cinema entertainment portfolio to Saudi Arabia and support the growth of audio-visual and creative talent across the Kingdom. VOX Cinemas parent company Majid Al Futtaim, the leading shopping mall, communities, retail and leisure pioneer across the Middle East, Africa and Asia is an active supporter of the Kingdom’s Vision 2030. Majid Al Futtaim has already announced project investments valued at SAR 14 billion across their mall asset, fashion, leisure and retail offerings in the Kingdom of Saudi Arabia. This commitment is expected to create more than 114,000 direct and indirect job opportunities.
                 </div>
            }
            {cinema=="amc"&& 
                 <div className="aboutCinema">
                 <strong>  AMC Cinemas </strong>   is dedicated to innovating the way you see movies. Don’t just visit a cinema; experience the AMC difference of premium formats that bring you superior acoustics, richer imagery, and a choice between Real D® 3D, Dolby Cinema®, and IMAX® technologies. Taste our special menu of elevated cinema favorites and enjoy bolder flavors, wider variety, and superior quality movie snacks. Reserve your seats when you purchase tickets online and on our app and relax into the spacious comforts of our luxe recliners. Come and enjoy the very best of cutting-edge entertainment when you choose AMC Cinemas.
                 </div>
            }
            {cinema=="muvi"&& 
                 <div className="aboutCinema">
                 <strong> Muvi Cinemas </strong> is the first home-grown cinema brand and the market leader in terms of screen count in the Kingdom of Saudi Arabia. Established in 2019 with headquarters in Riyadh, it is owned and operated by muvi Cinemas Co. muvi continues its expansion plan in the upcoming years across the kingdom offering state-of-the-art technology, diverse and immersive experiences combined with unlimited options from our delicious menu to give moviegoers complete and exceptional cinema experience.
                 </div>
            }
                  </div>

                 <div className="locationsText  neuton-normal-white-60px5"> 
                   Locations 
                
                <div className="allLocations"> 
                {runCallback(() => {
                  const row = [];
                  for (var i = 0; i < numOfLocations; i++) {
                    row.push(
                      <div key={i}>
                        {
                         <div className="cinemaLocation">
                            <div className="cinemaLocationIcon"> <HiOutlineLocationMarker size="30px"/> </div>
                            <div className="cinemaLocationName">  {cinemaLocations[i]} - <strong> {cinemaCitys[i]}</strong> </div>
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
