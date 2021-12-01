import React from "react";
import "./addMoviePage.css";
import Select from 'react-select';
import Header from "../header";
import CreatableSelect from 'react-select/creatable';
// import MultiStep from 'react-multistep' ;
// import { MultiStep } from '@loft/multistep-form';


function addMoviePage(props) {

    const runCallback = (cb) => {
    return cb();
  };

    const options = [
        { value: 'drama', label: 'drama' },
        { value: 'action', label: 'action' },
        { value: 'comedy', label: 'comedy' },
      ]

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
            />
          

          {/* Genre */}
          <div className="addMovieflex-col-item neuton-bold-white-30px7">{genre}</div>
          <Select 
                 isMulti 
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

          {/* year */}
          <div className="addMovieyear neuton-bold-white-30px7">{year}</div>
          <CreatableSelect
          isSearchable
          noOptionsMessage="hi"
          className="addMovieyear-placholder"
          placeholder="Select or write movie year"
          formatCreateLabel={(inputText) => `${inputText}`}
          options={options}
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

        {/* Movie Length  */}
        <div className="addMoviemovie-len-add neuton-bold-white-30px7">{movielenadd}</div>
        <div className="addMovieflex-row">  

        {/* Hours */}
        <div className="hoursMovieLength neuton-bold-white-30px"> Hours :  </div>

           <CreatableSelect
            isSearchable
            className="addMoviemovie-length1"
            placeholder="Select or write movie hours"
            formatCreateLabel={(inputText) => `${inputText}`}
            options={options}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
              ...theme.colors,
                text: 'var(--cardinal)',
                primary: 'var(--cardinal)',
                color: 'black',
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
                color: 'black',
              }),
            }}
          />
         
          {/* Minutes */}
          <div className="minMovieLength neuton-bold-white-30px"> Minutes :  </div>
          <CreatableSelect
            isSearchable
            className="addMoviemovie-length2"
            placeholder="Select or write movie minutes"
            formatCreateLabel={(inputText) => `${inputText}`}
            options={options}
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
          <CreatableSelect
          isSearchable
          isMulti
          formatCreateLabel={(inputText) => `${inputText}`}
          className="addMoviedirector-container"
          placeholder="Select or write movie director"
          options={options}
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
          options={options}
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
          {runCallback(() => {
          const row = [];
          for (var i = 0; i < 5; i++) {
            row.push(
            <div key={i}>
            {
            <div>  
                  <div className="addMovieflex-row-2">
                  <CreatableSelect
                    isSearchable
                    className="addMovieactor"
                    formatCreateLabel={(inputText) => `${inputText}`}
                    placeholder="Select or write actor name"
                    options={options}
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
                  <CreatableSelect
                    isSearchable
                    className="addMovieactor-role"
                    placeholder="Select or write actor role"
                    formatCreateLabel={(inputText) => `${inputText}`}
                    options={options}
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

                  <CreatableSelect
                    isSearchable
                    className="addMovieactor-image"
                    formatCreateLabel={(inputText) => `${inputText}`}
                    placeholder="Enter URL of actor image"
                    options={options}
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
                  </div>
            </div>
            }
            </div>
            );
          }
          return row;
          })}

        </div>

        <button className="addMovieadd-button neuton-bold-white-30px7">{addbutton}</button>
      </div>
    </div>

  );
}

export default addMoviePage;
