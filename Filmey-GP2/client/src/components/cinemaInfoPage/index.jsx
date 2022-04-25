import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { GrLocation } from "react-icons/gr";

import { useParams } from "react-router-dom";
import Footer from "../Footer";
import Header from "../header";
import "./cinemaInfoPage.css";
import api from "../../api/axiosAPI";

//import images
import amcLogo from   "../../dist/img/amcLogo.png";
import muviLogo from  "../../dist/img/muviLogo.png";
import voxwhite from  "../../dist/img/voxWhite.png";


const cinemaInfoPage = (props) => {
  const runCallback = (cb) => {
    return cb();
  };

  const { logo, footerText1, footerText2 } = props;

  const [cinemaCitys, setCinemaCitys] = useState([]);
  const [cinemaLocations, setCinemaLocations] = useState([]);
  const [numOfLocations, setNumOfLocations] = useState(0);

  let { cinema } = useParams();
  console.log(cinema);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    api.get(`/cinema/cinemaLocations/${cinema}`).then((response) => {
      //console.log(response.data)
      setNumOfLocations(response.data.length);
      var cinemaCityArray = [...cinemaCitys];
      var cinemaLocationArray = [...cinemaLocations];

      for (var i = 0; i < response.data.length; i++) {
        cinemaCityArray[i] = response.data[i].city.charAt(0).toUpperCase() + response.data[i].city.slice(1);
        cinemaLocationArray[i] = response.data[i].location.charAt(0).toUpperCase() + response.data[i].location.slice(1);
      }

      setCinemaCitys(cinemaCityArray);
      setCinemaLocations(cinemaLocationArray);
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* header  */}
      <Header />

      {/* main content  */}

      <div className="cinema-info-page">
        <Container className="py-5">
          <Row className="g-0">
            <Col md={4}>
              {/* logos  */}
              <div>
                {cinema == "muvi" && (
                  <div className="cinema-info-logo-Container">
                    <a href="https://www.muvicinemas.com/en" target="_blank">
                      <img
                        src={muviLogo}
                        className="cinema-info-logo"
                      />
                    </a>
                  </div>
                )}

                {cinema == "vox" && (
                  <div className="cinema-info-logo-Container">
                    <a href="https://ksa.voxcinemas.com/" target="_blank">
                      <img
                        src={voxwhite}
                        className="cinema-info-logo-vox"
                      />
                    </a>
                  </div>
                )}

                {cinema == "amc" && (
                  <div className="cinema-info-logo-Container">
                    <a href="https://www.amctheatres.com/" target="_blank">
                      <img
                        src={amcLogo}
                        className="cinema-info-logo"
                      />
                    </a>
                  </div>
                )}
              </div>
            </Col>
            <Col md={8}>
              {/* description  */}
              <div>
                <h3 className="cinema-info-title section-title neuton-normal-white-60px5">
                  {" "}
                  About
                </h3>
                {cinema == "vox" && (
                  <p className="about-cinema">
                    <strong> VOX Cinemas </strong>, the MENA region’s largest
                    cinema operator, is honoured to be awarded one of the first
                    licenses to operate cinemas in Saudi Arabia. Its brand-new
                    cinema, which will be the first multiplex in Saudi Arabia
                    will open at Riyadh Park Mall. VOX Cinemas will start
                    delivering on an ambitious plan to bring its world-class
                    cinema entertainment portfolio to Saudi Arabia and support
                    the growth of audio-visual and creative talent across the
                    Kingdom. VOX Cinemas parent company Majid Al Futtaim, the
                    leading shopping mall, communities, retail and leisure
                    pioneer across the Middle East, Africa and Asia is an active
                    supporter of the Kingdom’s Vision 2030. Majid Al Futtaim has
                    already announced project investments valued at SAR 14
                    billion across their mall asset, fashion, leisure and retail
                    offerings in the Kingdom of Saudi Arabia. This commitment is
                    expected to create more than 114,000 direct and indirect job
                    opportunities.
                  </p>
                )}
                {cinema == "amc" && (
                  <p className="about-cinema">
                    <strong> AMC Cinemas </strong> is dedicated to innovating
                    the way you see movies. Don’t just visit a cinema;
                    experience the AMC difference of premium formats that bring
                    you superior acoustics, richer imagery, and a choice between
                    Real D® 3D, Dolby Cinema®, and IMAX® technologies. Taste our
                    special menu of elevated cinema favorites and enjoy bolder
                    flavors, wider variety, and superior quality movie snacks.
                    Reserve your seats when you purchase tickets online and on
                    our app and relax into the spacious comforts of our luxe
                    recliners. Come and enjoy the very best of cutting-edge
                    entertainment when you choose AMC Cinemas.
                  </p>
                )}
                {cinema == "muvi" && (
                  <p className="about-cinema">
                    <strong> Muvi Cinemas </strong> is the first home-grown
                    cinema brand and the market leader in terms of screen count
                    in the Kingdom of Saudi Arabia. Established in 2019 with
                    headquarters in Riyadh, it is owned and operated by muvi
                    Cinemas Co. muvi continues its expansion plan in the
                    upcoming years across the kingdom offering state-of-the-art
                    technology, diverse and immersive experiences combined with
                    unlimited options from our delicious menu to give moviegoers
                    complete and exceptional cinema experience.
                  </p>
                )}
              </div>
              {/* locations  */}
              <div>
                <h3 className="cinema-info-title section-title neuton-normal-white-60px5">
                  Locations
                </h3>
                <Row className="g-0">
                  <Col sm={6} md={10}>
                    <div>
                      {runCallback(() => {
                        const row = [];
                        for (var i = 0; i < numOfLocations; i++) {
                          row.push(
                            <div key={i}>
                              {
                                <div className="cinema-location">
                                  <div className="cinema-location-icon">
                                    <GrLocation  size="25px" />{" "}
                                  </div>
                                  <p>
                                    {cinemaLocations[i]} -{" "}
                                    <strong> {cinemaCitys[i]}</strong>{" "}
                                  </p>
                                </div>
                              }
                            </div>
                          );
                        }
                        return row;
                      })}
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* main content  */}
      {/* footer  */}
      <Footer />
    </div>
  );
};

export default cinemaInfoPage;
