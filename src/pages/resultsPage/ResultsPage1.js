import React, { useState, useEffect } from 'react';
import { createApi, toJson } from "unsplash-js";
import "./resultPage.css"
import { useParams } from 'react-router';
import Autocomplete from 'react-autocomplete';
import '../test/TestAutocomplete.css';

const api = createApi({
    // Don't forget to set your access token here!
    // See https://unsplash.com/developers
    accessKey: "sDI3L3I2mgA91a4deHN4BevefU63v8_yMhgYmrtHy6k"
  });
  
  const PhotoComp = ({ photo }) => {
    const { user, urls } = photo;
  
    return (
      <>
        <img className="img" src={urls.regular} alt="img" />
        <a
          className="credit"
          target="_blank"
          rel="noreferrer"
          href={`https://unsplash.com/@${user.username}`}
        >
          {user.name}
        </a>
      </>
    );
  };
  
  
  

export default function ResultPage() { 
    const { resultsPage } = useParams();
    const recivedPhotoShort = resultsPage.slice(1, resultsPage.length);
    const [val, setValue] = useState(recivedPhotoShort);
   
    const [data, setPhotosResponse] = useState(null);
    const [dataID, setDataId] = useState([]);
    
    let counter = 0;
    
    useEffect(() => {
      

      if (val) {
      console.log("useEffect" + val + counter)
      counter++;
      api.search
        .getPhotos({ query: `${val}`, page: 1, perpage: 20, orientation: "landscape" })
        .then(result => {
          setPhotosResponse(result);
           data.response.results.map((item) => {
             //console.log(item)
             dataID.push(item)
             console.log("dataID: " + item.alt_description)
           
           })

        })
        .catch(() => {
          console.log("something went wrong!");
        });
    }}, [val]);

    const Body = () => {
      console.log("BODY")
      if (data === null) {
        return <div>Loading...</div>;
      } else if (data.errors) {
        return (
          <div>
            <div>{data.errors[0]}</div>
            <div>PS: Make sure to set your access token!</div>
          </div>
        );
      } else {
        return (
          <div className="feed">
            <ul className="columnUl">
              {data.response.results.map(photo => (
                <li key={photo.id} className="li">
                  <PhotoComp photo={photo} />
                </li>
              ))}
            </ul>
          </div>
        );
      }
    };

    function photosData ()  {
      return dataID;
    }
    function renderPhotos(state, val) {
      return (
       state.alt_description.toLowerCase().indexOf(val.toLowerCase()) !== -1
    );

    }

        return (
            <>
            <p>ResultPage {recivedPhotoShort}</p>
            
            <div className="autocomplete-wrapper">
            <h3>React Autocomplete Demo</h3>
                <Autocomplete
                    value={val}
                    //items={MoviesData()}
                    items={photosData()}
                    getItemValue={item => item.alt_description}
                    //shouldItemRender={renderMovieTitle}
                    shouldItemRender={renderPhotos}
                    renderMenu={item => (
                        <div className="dropdown">
                            {item}
                        </div>
                    )}
                    renderItem={(item, isHighlighted) =>
                        <div   div className={`item ${isHighlighted ? 'selected-item' : ''}`}>
                            {item.alt_description}
                        </div>
                        }
                    onChange={(event, val) => setValue(val)}
                    onSelect={val => setValue(val)}
                />
            </div>
           
            </>
            
        );
}

