import React from "react";
import "./addMoviePage.css";
import Select from 'react-select';
import Header from "../header";
import CreatableSelect from 'react-select/creatable';
import  { useState } from 'react';
import Axios from "axios";
import { ActionMeta, OnChangeValue } from 'react-select';




function addMoviePage(props) {
  
 
  const [titleState,setTitle]=useState('');
  const [genreState,setGenre]=useState('');
  const [languageState,setLanaguage]=useState('');
  const [yearState,setYear]=useState('');
  const [hoursState,setHours]=useState('');
  const [minutesState,setMinutes]=useState('');
  const [ageGuideSate,setAgeGuide]=useState('');
  const [trailerState,setTrailer]=useState('');
  const [posterSate,setPoster]=useState('');
  const [descriptionState,setDescription]=useState('');
  const [directorState,setDirector]=useState('');
  const [writerState,setWriter]=useState('');
 // const [actorsArray,setActorArray]=useState([]);
  const [actorImageArrayState,setActorImageArrayState]=useState([]);
  const [actorNameArrayState,setActorNameArrayState]=useState([]);
  const [actorRoleArrayState,setActorRoleArrayState]=useState([]);
  const [allGenres,setAllGenres]=useState([]);
  const [allLanguages,setAllLanguages]=useState([]);
  const [allAgeGuide,setallAgeGuide]=useState([]);
  const [allDirectors,setAllDirectors]=useState([]);
  const [allWriters,setAllWriters]=useState([]);
  const [allActors,setAllActors]=useState();
  const [allRoles,setAllRoles]=useState([]);


  var length=hoursState + 'h ' + minutesState+'min';


  var setGenreFunction=(e)=>{
    console.log(Array.isArray(e)?e.map(x=>x.label):[]);
    setGenre(Array.isArray(e)?e.map(x=>x.label):[]);

  }


  var setLanguageFunction=(e)=>{
    console.log(Array.isArray(e)?e.map(x=>x.label):[]);
    setLanaguage(Array.isArray(e)?e.map(x=>x.label):[]);
  }

  var setDirectorFunction=(e)=>{
    console.log(Array.isArray(e)?e.map(x=>x.label):[]);
    setDirector(Array.isArray(e)?e.map(x=>x.label):[]);
  }

  var setWriterFunction=(e)=>{
    console.log(Array.isArray(e)?e.map(x=>x.label):[]);
    setWriter(Array.isArray(e)?e.map(x=>x.label):[]);
  }

//var actorRoleArray=[];


var actorNameArray = [...actorNameArrayState];
var actorImageArray=[...actorImageArrayState];
var actorRoleArray=[...actorRoleArrayState];

const setActorName  = index =>(newValue, actionMeta) => {
  console.log("setActorName");
  console.log(index);
  console.log(newValue.label);
  actorNameArray[index] =newValue.label;
  console.log(actorNameArray);
  setActorNameArrayState(actorNameArray);
  //console.log(actorNameArrayState);
  console.log("actorImageArray");
  console.log(actorImageArray);
  const getActorImage =  Axios.get(
  `http://localhost:3000/api/v1/movies/getActorImage/${actorNameArray[index]}`
  )
  .then((res)=>{
    console.log(res.data);

    if(res.data.NoActorImage)
    {
      actorImageArray[index]="";
      console.log(actorImageArray);
      setActorImageArrayState(actorImageArray);
    }
    else{
    console.log("else");
    actorImageArray[index]=res.data;
    console.log(actorImageArray)
    setActorImageArrayState(actorImageArray);
    }
  })
 

};


const setActorRole  = index =>(newValue, actionMeta) => {
  actorRoleArray[index] =newValue.label;
  console.log(actorRoleArray);
  setActorRoleArrayState(actorRoleArray);
  console.log(actorRoleArrayState);
};

const setActorImage = (index, value) => {
  // console.log(index);
  // console.log(value);
  actorImageArray[index] =value;
  console.log(actorImageArray)
  setActorImageArrayState(actorImageArray);
  console.log(actorImageArrayState)
};


  const addMovie=()=>{
    console.log(length);
    console.log("length");

    console.log(titleState,
     genreState,
      languageState,
      yearState,
     length,
     ageGuideSate,
      trailerState,
      posterSate,
      descriptionState,
      directorState,
      writerState,
      actorNameArray,
      actorRoleArray,
      actorImageArray);

   
  const addMovieRes =  Axios.post("http://localhost:3000/api/v1/movies/addMovie",{
    title:titleState,
    genres:genreState,
    languages:languageState,
    year:yearState,
    length:length,
    age_guide:ageGuideSate,
    trailer_url:trailerState,
    poster:posterSate,
    description:descriptionState,
    directors:directorState,
    writers:writerState,
    actorNames:actorNameArray,
    actorRoles:actorRoleArray,
    actorImages:actorImageArray,
  }
  )
  .then((addMovieRes)=>{
    console.log(addMovieRes)
  })

  }

  const yearsArray = [];
  const hoursArray = [];
  const minutesArray = [];


  var year =1950;
     
      for (var i = 0; i < 72 ; i++) {
        
        yearsArray[i] = {value:year++, label: year++};
      }
      console.log(yearsArray);

      //hoursArray
      var hour = 1;
      for (var i = 0; i < 10 ; i++) {
        hoursArray[i] = {value:i, label: hour++};
        
      }

      //minutesArray
      var minute = 0;
      for (var i = 0; i < 60 ; i++) {
        minutesArray[i] = {value:i, label: minute++};
    }

  React.useEffect(() => {
      

    const res =Axios.get("http://localhost:3000/api/v1/movies/allGenres/1").then((response) => {
      const genresArray = [...allGenres];
      console.log(response.data);

      for (var i = 0; i < response.data.length; i++) {

        genresArray[i] = {value:i, label: response.data[i].genre};
      }
      console.log(genresArray)
      setAllGenres(genresArray);

    });

    const res1 =Axios.get("http://localhost:3000/api/v1/movies/allLanguages/1").then((response) => {
      const languageArray = [...allLanguages];

      for (var i = 0; i < response.data.length; i++) {
        languageArray[i] = {value:i, label: response.data[i].language};
      }
      console.log(languageArray);
      setAllLanguages(languageArray);

    });

    const res2 =Axios.get("http://localhost:3000/api/v1/movies/allAgeGuide/1").then((response) => {
      const ageGuideArray = [...allLanguages];

      for (var i = 0; i < response.data.length; i++) {
        ageGuideArray[i] = {value:i, label: response.data[i].age_guide};
      }
      setallAgeGuide(ageGuideArray);

    });

    const res3 =Axios.get("http://localhost:3000/api/v1/movies/allDirectors/1").then((response) => {
      const directorsArray = [...allDirectors];

      for (var i = 0; i < response.data.length; i++) {
        directorsArray[i] = {value:i, label: response.data[i].director};
      }
      setAllDirectors(directorsArray);

    });

    const res4 =Axios.get("http://localhost:3000/api/v1/movies/allWriters/1").then((response) => {
      const writersArray = [...allWriters];

      for (var i = 0; i < response.data.length; i++) {
        writersArray[i] = {value:i, label: response.data[i].writer};
      }
      setAllWriters(writersArray);

    });

    const res5 =Axios.get("http://localhost:3000/api/v1/movies/allActors/1").then((response) => {
      const actorsArray = [...allWriters];

      for (var i = 0; i < response.data.length; i++) {
        actorsArray[i] = {value:i, label: response.data[i].actor};
      }
      setAllActors(actorsArray);

    });

    const res6 = Axios.get("http://localhost:3000/api/v1/movies/allRoles/1").then((response) => {
      const rolesArray = [...allRoles];

      for (var i = 0; i < response.data.length; i++) {
        rolesArray[i] = {value:i, label: response.data[i].role};
      }
      setAllRoles(rolesArray);

    });
  }, []);

  const runCallback = (cb) => {
    return cb();
  };



  const {
    addmovietext,
    movieInformation,
    title,
    inputType,
    inputPlaceholder,
    genre,
    lanaguage,
    yearTitle,
    movielenadd,
    hoursandmins,
    ageguide,
    trailer,
    poster,
    description,
    inputType2,
    inputPlaceholder2,
    directorWriter,
    directoradd,
    writer,
    topCast,
    actorname,
    actorcharacteradd,
    actorimage,
    addbutton,
  } = props;

  return (
    <div className="PageCenter">
     {/* <img className="addMoviebackgroundImage" src="/img/backgroundImage.png" /> */}
      <div className="addmovie screen">
      <header>
           <Header/> 
      </header>
        <div className="addMovieflex-col">
          {/* Movie Information */}
          <div className="addMovieoverlap-group1">
            <div className="addMoviemovie-information neuton-normal-white-60px5">{movieInformation}</div>
            <img className="addMovieline1" src="/img/oneline@1x.svg" />
          </div>

          {/* Title */}
          <div className="addMovietitle neuton-bold-white-30px7">{title}</div>
            <input
              className="addMovietitle-placholder"
              name="titleplacholder"
              placeholder="Enter movie name"
              type="text"
              required
              onChange={
                (e)=>{
                  setTitle(e.target.value); 
                } 
              }
            />
          

          {/* Genre */}
          <div className="addMovieflex-col-item neuton-bold-white-30px7">{genre}</div>
          <Select 
                 isMulti 
                 options={allGenres}
                 onChange={setGenreFunction}
                 closeMenuOnSelect={false} 
                 isSearchable
                 className="addMoviegenre-container"
                 placeholder="Select movie genres"
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
                    minHeight: 66,
                    background:'#fcfcfc',
                    outline: 'none',            
                    border: "0px solid black",
                    fontSize:"16px",
                    boxShadow: state.isFocused ? '0px 4px 4px red' :'0px 4px 4px #00000040',
                    borderRadius: 5,
                    paddingLeft: 20,
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

          {/* lanaguage */}
          <div className="addMovielanaguage neuton-bold-white-30px7">{lanaguage}</div>
          <Select isMulti //options={genres} 
                // options={allGenres}
                //  onChange={getGenres}
                //options={allLanguages}
                options={allLanguages}
                onChange={setLanguageFunction}
                 //onChange={getGenres}
                // filterOption={filterOption}
                 closeMenuOnSelect={false} 
                 isSearchable
                 className="addMovielanaguage-container"
                 placeholder="Select movie lanaguages"
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
                    minHeight: 66,
                    background:'#fcfcfc',
                    outline: 'none',            
                    border: "0px solid black",
                    fontSize:"16px",
                    boxShadow: state.isFocused ? '0px 4px 4px red' :'0px 4px 4px #00000040',
                    borderRadius: 5,
                    paddingLeft: 20,
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

          {/* year */}
          <div className="addMovieyear neuton-bold-white-30px7">Year</div>
          <select
          onChange={
            (e)=>{
              setYear(e.target.value);
              //console.log(e.target.value); 
            } 
          }>

            {yearsArray.map((option) => (

              <option value={option.label}>{option.label}</option>

            ))
            
            }

          </select>

        {/* Movie Length  */}
        <div className="addMoviemovie-len-add neuton-bold-white-30px7">{movielenadd}</div>
        <div className="addMovieflex-row">  

        {/* Hours */}
        <div className="hoursMovieLength neuton-bold-white-30px"> Hours :  </div>
        <select
          onChange={
            (e)=>{
              setHours(e.target.value); 
              console.log()
            } 
          }>

            {hoursArray.map((option) => (

              <option value={option.label}>{option.label}</option>

            ))
            
            }

          </select>

          {/* Minutes */}
          <div className="minMovieLength neuton-bold-white-30px"> Minutes :  </div>
          <select
          onChange={
            (e)=>{
              setMinutes(e.target.value); 
              console.log()
            } 
          }>

            {minutesArray.map((option) => (

              <option value={option.label}>{option.label}</option>

            ))
            
            }

          </select>

        </div>

          {/* Age guide */}
          <div className="addMovieage-guide neuton-bold-white-30px7">{ageguide}</div>
        <select
         onChange={
          (e)=>{
            setAgeGuide(e.target.value); 
          } 
        }>

            {allAgeGuide.map((option) => (

              <option value={option.label}>{option.label}</option>

            ))
            
            }

          </select> 

          {/* Trailer  */}
          <div className="addMovietrailer neuton-bold-white-30px7">{trailer}</div>
          <div className="addMovietrailer-container border-1px-black">
          <input
              className="trailerInput"
              name="titleplacholder"
              placeholder="Enter URL of movie trailer"
              type="text"
              required
              onChange={
                (e)=>{
                  setTrailer(e.target.value); 
                } 
              }
            />
          </div>
          

          {/* Poster */}
          <div className="addMovieposter neuton-bold-white-30px7">{poster}</div>
          <div className="addMovieposter-container border-1px-black">
             <input
              className="trailerInput"
              name="titleplacholder"
              placeholder="Enter URL of movie poster"
              type="text"
              required
              onChange={
                (e)=>{
                  setPoster(e.target.value); 
                } 
              }
            />
          </div>

          {/* Description */}
          <div className="addMoviedescription neuton-bold-white-30px7">{description}</div>
          <div className="addMovieoverlap-group3"> 
            <textarea
              className="addMoviedescription-placholder"
              name="descriptionplacholder"
              placeholder={inputPlaceholder2}
              rows="15" 
              cols="154"
              onChange={
                (e)=>{
                  setDescription(e.target.value); 
                } 
              }
            >
            </textarea>
          </div>

          {/* Directior-Writer */}
          <div className="addMoviedirector-writer neuton-normal-white-60px5">{directorWriter}</div>
          <img className="addMovieline2" src="/img/twoline@1x.svg" />

          {/* Director */}
          <div className="addMovieflex-col-item neuton-bold-white-30px7">{directoradd}</div>
          <CreatableSelect
          isSearchable
          isMulti
          formatCreateLabel={(inputText) => `${inputText}`}
          className="addMoviedirector-container"
          placeholder="Select or write movie directors"
          options={allDirectors}
          onChange={setDirectorFunction}
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
              minHeight: 66,
              background:'#fcfcfc',
              outline: 'none',            
              border: "0px solid black",
              fontSize:"16px",
              boxShadow: state.isFocused ? '0px 4px 4px red' :'0px 4px 4px #00000040',
              borderRadius: 5,
              paddingLeft: 20,
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
        />

          {/* Writer */}
          <div className="addMoviewriter neuton-bold-white-30px7">{writer}</div>
          <CreatableSelect
          isSearchable
          formatCreateLabel={(inputText) => `${inputText}`}
          isMulti
          className="addMoviewriter-container"
          placeholder="Select or write movie writers"
         // options={allWriters}
          options={allWriters}
          onChange={setWriterFunction}
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
              minHeight: 66,
              background:'#fcfcfc',
              outline: 'none',            
              border: "0px solid black",
              fontSize:"16px",
              boxShadow: state.isFocused ? '0px 4px 4px red' :'0px 4px 4px #00000040',
              borderRadius: 5,
              paddingLeft: 20,
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
        />
          
          

          {/* Top Cast */}
        <div className="addMovieoverlap-group2">
            <img className="addMovieline3" src="/img/threeline@2x.svg" />
            <div className="addMovietop-cast neuton-normal-white-60px5">{topCast}</div>
          </div> 

 {/* Actors */}
  <div className="addMovieflex-row-1 nunito-normal-white-35px">
            <div className="addMovieactor-name neuton-bold-white-30px7">{actorname}</div>
            <div className="addMovieactor-character-add neuton-bold-white-30px7">{actorcharacteradd}</div>
            <div className="addMovieactor-image-1 neuton-bold-white-30px7">{actorimage}</div>
          </div>
      

              {/*1st Actor */}

            <div>  
                  <div className="addMovieflex-row-2"> 

                  {/* actor name */}
                 <CreatableSelect
                    isSearchable
                    className="addMovieactor"
                    formatCreateLabel={(inputText) => `${inputText}`}
                    placeholder="Select or write actor name"
                    options={allActors} 
                    // onChange={
                    //   (e) =>{
                    //   // actorNameArray[1]=e.target.value
                    //   console.log(e.target.value)
                    //   }
                    // }
                    onChange={setActorName(0)}
                    //onInputChange={handleInputChange}
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
                        minHeight: 66,
                        width: 320, 
                        background:'#fcfcfc',
                        outline: 'none',            
                        border: "0px solid black",
                        fontSize:"16px",
                        boxShadow: state.isFocused ? '0px 4px 4px red' :'0px 4px 4px #00000040',
                        borderRadius: 5,
                        paddingLeft: 10,
                      }),
                    }}
                  /> 

                  
                  

                  {/* actor role */}
                  <CreatableSelect
                    isSearchable
                    className="addMovieactor-role"
                    placeholder="Select or write actor role"
                    formatCreateLabel={(inputText) => `${inputText}`}
                    options={allRoles}
                    onChange={setActorRole(0)}
                  //  onChange={
                  //   (e) =>{
                  //   actorRoleArray[1]=e.target
                  //   }
                  // }
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
                        minHeight: 66,
                        width: 320, 
                        background:'#fcfcfc',
                        outline: 'none',            
                        border: "0px solid black",
                        fontSize:"16px",
                        boxShadow: state.isFocused ? '0px 4px 4px red' :'0px 4px 4px #00000040',
                        borderRadius: 5,
                        paddingLeft: 10,
                      }),
                    }}
                  />

                  {/* actor image */}
                  <input
                    className="addMovieactor-image"
                    placeholder="Enter URL of actor image"
                    name="actorImage"
                    type="text"
                    required
                   // value={actorImageArray[0]}
                  // value={actorImageArrayState[0]}
                    value={actorImageArray[0]}
                    //onChange={setActorImage[0]}
                    onChange={
                      (e) =>{
                        setActorImage(0,e.target.value);
                      }
                    }
                    //value={this.state.value}
                   // onChange={this.handleChange}
                     //onChange={actorImageArray[]=value}
                    //onChange={(val)=>{onchangeInput(val, i)}}
                    //onChange={setActorImage(i)}
                    // onChange={
                    //     (e)=>{
                    //       //setActorImage.findIndex(item => item.name === e.target.value);


                    //       actorImageArray[0]=e.target.value;
                    //       //setActorImage(e.target.value)
                    //       console.log(actorImageArray); 
                    //     } 
                    //   }
                  // onText={setActorImage(i)}
                  //onChange={console.log(i) }
                  // onChange={
                  //   (e)=>{
                  //     actorImageArray[y]=e.target.value;
                  //     //setActorImage(e.target.value)
                  //    console.log(y); 
                  //   } 
                  // }
                    
                  />
                  </div>
            </div>

              {/*2nd Actor */}

            <div>  
                  <div className="addMovieflex-row-2"> 

                  {/* actor name */}
                 <CreatableSelect
                    isSearchable
                    className="addMovieactor"
                    formatCreateLabel={(inputText) => `${inputText}`}
                    placeholder="Select or write actor name"
                    options={allActors} 
                    //onChange={setActorName(i)}
                    onChange={setActorName(1)}
                    //onInputChange={handleInputChange}
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
                        minHeight: 66,
                        width: 320, 
                        background:'#fcfcfc',
                        outline: 'none',            
                        border: "0px solid black",
                        fontSize:"16px",
                        boxShadow: state.isFocused ? '0px 4px 4px red' :'0px 4px 4px #00000040',
                        borderRadius: 5,
                        paddingLeft: 10,
                      }),
                    }}
                  /> 

                  
                  

                  {/* actor role */}
                  <CreatableSelect
                    isSearchable
                    className="addMovieactor-role"
                    placeholder="Select or write actor role"
                    formatCreateLabel={(inputText) => `${inputText}`}
                    options={allRoles}
                    onChange={setActorRole(1)}
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
                        minHeight: 66,
                        width: 320, 
                        background:'#fcfcfc',
                        outline: 'none',            
                        border: "0px solid black",
                        fontSize:"16px",
                        boxShadow: state.isFocused ? '0px 4px 4px red' :'0px 4px 4px #00000040',
                        borderRadius: 5,
                        paddingLeft: 10,
                      }),
                    }}
                  />

                  {/* actor image */}
                  <input
                    className="addMovieactor-image"
                    placeholder="Enter URL of actor image"
                    name="actorImage"
                    type="text"
                    required
                    value={actorImageArray[1]}
                    //onChange={setActorImage[1]}
                    onChange={
                      (e) =>{
                        setActorImage(1,e.target.value);
                      }
                    }
                    //value={actorImageArrayState[1]}
                    //value={this.state.value}
                   // onChange={this.handleChange}
                    //onChange={actorImageArray[i]=value}
                    //onChange={(val)=>{onchangeInput(val, i)}}
                    //onChange={setActorImage(i)}
                    // onChange={
                    //     (e)=>{
                    //      // setActorImage.findIndex(item => item.name === e.target.value);


                    //       actorImageArray[1]=e.target.value;
                    //       //setActorImage(e.target.value)
                    //      console.log(i); 
                    //     } 
                    //   }
                  // onText={setActorImage(i)}
                  //onChange={console.log(i) }
                  // onChange={
                  //   (e)=>{
                  //     actorImageArray[y]=e.target.value;
                  //     //setActorImage(e.target.value)
                  //    console.log(y); 
                  //   } 
                  // }
                    
                  />
                  </div>
            </div>

             {/*3rd Actor */}

             <div>  
                  <div className="addMovieflex-row-2"> 

                  {/* actor name */}
                 <CreatableSelect
                    isSearchable
                    className="addMovieactor"
                    formatCreateLabel={(inputText) => `${inputText}`}
                    placeholder="Select or write actor name"
                    options={allActors} 
                    onChange={setActorName(2)}
                    //onInputChange={handleInputChange}
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
                        minHeight: 66,
                        width: 320, 
                        background:'#fcfcfc',
                        outline: 'none',            
                        border: "0px solid black",
                        fontSize:"16px",
                        boxShadow: state.isFocused ? '0px 4px 4px red' :'0px 4px 4px #00000040',
                        borderRadius: 5,
                        paddingLeft: 10,
                      }),
                    }}
                  /> 

                  
                  

                  {/* actor role */}
                  <CreatableSelect
                    isSearchable
                    className="addMovieactor-role"
                    placeholder="Select or write actor role"
                    formatCreateLabel={(inputText) => `${inputText}`}
                    options={allRoles}
                    onChange={setActorRole(2)}
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
                        minHeight: 66,
                        width: 320, 
                        background:'#fcfcfc',
                        outline: 'none',            
                        border: "0px solid black",
                        fontSize:"16px",
                        boxShadow: state.isFocused ? '0px 4px 4px red' :'0px 4px 4px #00000040',
                        borderRadius: 5,
                        paddingLeft: 10,
                      }),
                    }}
                  />

                  {/* actor image */}
                  <input
                    className="addMovieactor-image"
                    placeholder="Enter URL of actor image"
                    name="actorImage"
                    type="text"
                    required
                    //value={actorImageArrayState[2]}
                    value={actorImageArray[2]}
                    //onChange={setActorImage[2]}
                    onChange={
                      (e) =>{
                        setActorImage(2,e.target.value);
                      }
                    }
                    //value={this.state.value}
                   // onChange={this.handleChange}
                    //onChange={actorImageArray[i]=value}
                    //onChange={(val)=>{onchangeInput(val, i)}}
                    //onChange={setActorImage(i)}
                    // onChange={
                    //     (e)=>{
                    //       //setActorImage.findIndex(item => item.name === e.target.value);


                    //       actorImageArray[2]=e.target.value;
                    //       //setActorImage(e.target.value)
                    //      //console.log(i); 
                    //     } 
                    //   }
                  // onText={setActorImage(i)}
                  //onChange={console.log(i) }
                  // onChange={
                  //   (e)=>{
                  //     actorImageArray[y]=e.target.value;
                  //     //setActorImage(e.target.value)
                  //    console.log(y); 
                  //   } 
                  // }
                    
                  />
                  </div>
            </div>

             {/*4th Actor */}

             <div>  
                  <div className="addMovieflex-row-2"> 

                  {/* actor name */}
                 <CreatableSelect
                    isSearchable
                    className="addMovieactor"
                    formatCreateLabel={(inputText) => `${inputText}`}
                    placeholder="Select or write actor name"
                    options={allActors} 
                    onChange={setActorName(3)}
                    //onInputChange={handleInputChange}
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
                        minHeight: 66,
                        width: 320, 
                        background:'#fcfcfc',
                        outline: 'none',            
                        border: "0px solid black",
                        fontSize:"16px",
                        boxShadow: state.isFocused ? '0px 4px 4px red' :'0px 4px 4px #00000040',
                        borderRadius: 5,
                        paddingLeft: 10,
                      }),
                    }}
                  /> 

                  
                  

                  {/* actor role */}
                  <CreatableSelect
                    isSearchable
                    className="addMovieactor-role"
                    placeholder="Select or write actor role"
                    formatCreateLabel={(inputText) => `${inputText}`}
                    options={allRoles}
                    onChange={setActorRole(3)}
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
                        minHeight: 66,
                        width: 320, 
                        background:'#fcfcfc',
                        outline: 'none',            
                        border: "0px solid black",
                        fontSize:"16px",
                        boxShadow: state.isFocused ? '0px 4px 4px red' :'0px 4px 4px #00000040',
                        borderRadius: 5,
                        paddingLeft: 10,
                      }),
                    }}
                  />

                  {/* actor image */}
                  <input
                    className="addMovieactor-image"
                    placeholder="Enter URL of actor image"
                    name="actorImage"
                    type="text"
                    required
                    //value={actorImageArrayState[3]}
                    value={actorImageArray[3]}
                    //onChange={setActorImage[3]}
                    onChange={
                      (e) =>{
                        setActorImage(3,e.target.value);
                      }
                    }
                    //value={this.state.value}
                   // onChange={this.handleChange}
                    //onChange={actorImageArray[i]=value}
                    //onChange={(val)=>{onchangeInput(val, i)}}
                    //onChange={setActorImage(i)}
                    // onChange={
                    //     (e)=>{
                    //     //  setActorImage.findIndex(item => item.name === e.target.value);


                    //       actorImageArray[3]=e.target.value;
                    //       //setActorImage(e.target.value)
                    //     // console.log(i); 
                    //     } 
                    //   }
                  // onText={setActorImage(i)}
                  //onChange={console.log(i) }
                  // onChange={
                  //   (e)=>{
                  //     actorImageArray[y]=e.target.value;
                  //     //setActorImage(e.target.value)
                  //    console.log(y); 
                  //   } 
                  // }
                    
                  />
                  </div>
            </div>

             {/*5th Actor */}

             <div>  
                  <div className="addMovieflex-row-2"> 

                  {/* actor name */}
                 <CreatableSelect
                    isSearchable
                    className="addMovieactor"
                    formatCreateLabel={(inputText) => `${inputText}`}
                    placeholder="Select or write actor name"
                    options={allActors} 
                    onChange={setActorName(4)}
                    //onInputChange={handleInputChange}
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
                        minHeight: 66,
                        width: 320, 
                        background:'#fcfcfc',
                        outline: 'none',            
                        border: "0px solid black",
                        fontSize:"16px",
                        boxShadow: state.isFocused ? '0px 4px 4px red' :'0px 4px 4px #00000040',
                        borderRadius: 5,
                        paddingLeft: 10,
                      }),
                    }}
                  /> 

                  
                  

                  {/* actor role */}
                  <CreatableSelect
                    isSearchable
                    className="addMovieactor-role"
                    placeholder="Select or write actor role"
                    formatCreateLabel={(inputText) => `${inputText}`}
                    options={allRoles}
                    onChange={setActorRole(4)}
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
                        minHeight: 66,
                        width: 320, 
                        background:'#fcfcfc',
                        outline: 'none',            
                        border: "0px solid black",
                        fontSize:"16px",
                        boxShadow: state.isFocused ? '0px 4px 4px red' :'0px 4px 4px #00000040',
                        borderRadius: 5,
                        paddingLeft: 10,
                      }),
                    }}
                  />

                  {/* actor image */}
                  <input
                    className="addMovieactor-image"
                    placeholder="Enter URL of actor image"
                    name="actorImage"
                    type="text"
                    required
                    value={actorImageArray[4]}
                    //onChange={setActorImage[4]}
                    onChange={
                      (e) =>{
                        actorImageArray[4] =e.target.value;
                        console.log(actorImageArray);
                        setactorImageArrayState(actorImageArray);
                      }
                    }
                    //value={actorImageArrayState[4]}
                    //value={this.state.value}
                   // onChange={this.handleChange}
                    //onChange={actorImageArray[i]=value}
                    //onChange={(val)=>{onchangeInput(val, i)}}
                    //onChange={setActorImage(i)}
                    // onChange={
                    //     (e)=>{
                    //       //setActorImage.findIndex(item => item.name === e.target.value);


                    //       actorImageArray[4]=e.target.value;
                    //       //setActorImage(e.target.value)
                    //     // console.log(i); 
                    //     } 
                    //   }
                  // onText={setActorImage(i)}
                  //onChange={console.log(i) }
                  // onChange={
                  //   (e)=>{
                  //     actorImageArray[y]=e.target.value;
                  //     //setActorImage(e.target.value)
                  //    console.log(y); 
                  //   } 
                  // }
                    
                  />
                  </div>
            </div>

        </div> 

        <button className="addMovieadd-button neuton-bold-white-30px7" onClick={addMovie}>{addbutton}</button>
      </div>
    </div>

  );
}

export default addMoviePage;
