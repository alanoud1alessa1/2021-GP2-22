import React from "react";
import "./addMoviePage.css";
import Select from 'react-select';
// import Creatable, { useCreatable } from 'react-select/creatable';
// import CreatableSelect from 'react-select/creatable';
// import  { Component, KeyboardEventHandler } from 'react';
// import { ActionMeta, OnChangeValue } from 'react-select';
// import MultipleValueTextInput from 'react-multivalue-text-input';
import Header from "../header";
// import DurationPicker from 'react-duration-picker' ;





function addMoviePage(props) {

  // const onChange = duration => {
  //   const { hours, minutes, seconds } = duration;
  //   ({ hours, minutes, seconds });
  // };

    const options = [
        { value: 'drama', label: 'drama' },
        { value: 'action', label: 'action' },
        { value: 'comedy', label: 'comedy' },
        { value: 'Ostatni', label: 'other' }
      ]

    //   const filterOption = (option, inputValue) => {
    //     // tweak the filterOption to render Ostatni only if there's no other option matching + set hasExtraValue to true in case you want to display an message
    //     if (option.label === "Ostatni"){
    //       const {options} = this.state
    //       const result = options.filter(opt => opt.label.includes(inputValue))
    //       this.setState({ hasExtraValue: !result.length})
    //        return !result.length
    //        };
    
    //     return option.label.includes(inputValue);
    //   };
      
  const {
    addmovietext,
    movieInformation,
    title,
    inputType,
    inputPlaceholder,
    genre,
    lanaguage,
    year,
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
          {/* <h1 className="addMovieadd-movie-text">{addmovietext}</h1> */}
          {/* Movie Information */}
          <div className="addMovieoverlap-group1">
            <div className="addMoviemovie-information neuton-normal-white-60px5">{movieInformation}</div>
            <img className="addMovieline1" src="/img/oneline@1x.svg" />
          </div>

          {/* Title */}
          {/* <DurationPicker
      // onChange={onChange}
      initialDuration={{ hours: 1, minutes: 2}}
      maxHours={5}
      noSec	={true}
    /> */}
          <div className="addMovietitle neuton-bold-white-30px7">{title}</div>
            <input
              className="addMovietitle-placholder"
              name="titleplacholder"
              placeholder="Enter movie name"
              type="text"
              required
            />
          

          {/* Genre */}
          <div className="addMovieflex-col-item neuton-bold-white-30px7">{genre}</div>
          <Select isMulti //options={genres} 
                // options={allGenres}
                //  onChange={getGenres}
                options={options}

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
{/* 
                <MultipleValueTextInput
	// onItemAdded={(item, allItems) => console.log(`Item added: ${item}`)}
	// onItemDeleted={(item, allItems) => console.log(`Item removed: ${item}`)}
	label="Items"
	name="item-input"
	placeholder="Enter whatever items you want; separate them with COMMA or ENTER."
/> */}
          {/* lanaguage */}
          <div className="addMovielanaguage neuton-bold-white-30px7">{lanaguage}</div>
          <Select isMulti //options={genres} 
                // options={allGenres}
                //  onChange={getGenres}
                options={options}
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
{/* 
                <CreatableSelect
        // components={components}
        // inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        // onChange={this.handleChange}
        // onInputChange={this.handleInputChange}
        // onKeyDown={this.handleKeyDown}
        placeholder="Type something and press enter..."
        // value={value}
      /> */}

           {/* year */}
          <div className="addMovieyear neuton-bold-white-30px7">{year}</div>
          <div className="addMovieyear-container border-1px-black">
          <input
              className="addMovieyear-placholder"
              name="titleplacholder"
              placeholder="Enter movie year (4 characters)"
              type="text"
              maxLength="4"
              required
            />
          </div>

          {/* Movie Length  */}
          <div className="addMoviemovie-len-add neuton-bold-white-30px7">{movielenadd}</div>
          <div className="addMovieflex-row">
            <div className="addMoviemovie-length1 border-1px-black"> Hours</div>            
            <div className="addMoviemovie-length2 border-1px-black"> Minutes</div>
          </div>

          {/* Age guide */}
          <div className="addMovieage-guide neuton-bold-white-30px7">{ageguide}</div>
          <Select 
                options={options}
                 isSearchable
                 className="addMovieage-guide-container"
                 placeholder="Select movie age guide"
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

          {/* Trailer  */}
          <div className="addMovietrailer neuton-bold-white-30px7">{trailer}</div>
          <div className="addMovietrailer-container border-1px-black">
          <input
              className="trailerInput"
              name="titleplacholder"
              placeholder="Enter URL of movie trailer"
              type="text"
              required
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
            >
            </textarea>
          </div>

          {/* Directior-Writer */}
          <div className="addMoviedirector-writer neuton-normal-white-60px5">{directorWriter}</div>
          <img className="addMovieline2" src="/img/twoline@1x.svg" />

          {/* Director */}
          <div className="addMovieflex-col-item neuton-bold-white-30px7">{directoradd}</div>
          <div className="addMoviedirector-container border-1px-black"></div>

          {/* Writer */}
          <div className="addMoviewriter neuton-bold-white-30px7">{writer}</div>
          <div className="addMoviewriter-container border-1px-black"></div>

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
          <div className="addMovieflex-row-2">
            <div className="addMovieactor border-1px-black"></div>
            <div className="addMovieactor-role border-1px-black"></div>
            <div className="addMovieactor-image border-1px-black"></div>
          </div>

        </div>
        <div className="addMovieflex-row-4">
          <div className="addMovieflex-col-1">
            <div className="addMovieactor border-1px-black"></div>
            <div className="addMovieactor-1 border-1px-black"></div>
            <div className="addMovieactor-name5 border-1px-black"></div>
          </div>
          <div className="addMovieflex-row-5">
            <div className="addMovieflex-col-2">
              <div className="addMovieactor border-1px-black"></div>
              <div className="addMovieactor-1 border-1px-black"></div>
              <div className="addMovieactor-1 border-1px-black"></div>
            </div>
            <div className="addMovieflex-col-3">
              <div className="addMovieactor border-1px-black"></div>
              <div className="addMovieactor-1 border-1px-black"></div>
              <div className="addMovieactor-1 border-1px-black"></div>
            </div>
          </div>
        </div>
        <div className="addMovieoverlap-group">
          <div className="addMovieadd-button neuton-bold-white-30px7">{addbutton}</div>
        </div>
      </div>
    </div>
  );
}

export default addMoviePage;
