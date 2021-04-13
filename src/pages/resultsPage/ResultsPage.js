import React, { useState, useEffect } from 'react';
//import Unsplash, { toJson } from 'unsplash-js';
import { createApi } from "unsplash-js";
import "./resultPage.css"
import { useParams } from 'react-router';
import { MoviesData, renderMovieTitle } from '../test/movies-data';
import Autocomplete from 'react-autocomplete';
import '../test/TestAutocomplete.css';
import env from '../../env.json';

const api = createApi({
    // Don't forget to set your access token here!
    // See https://unsplash.com/developers
    accessKey: "sDI3L3I2mgA91a4deHN4BevefU63v8_yMhgYmrtHy6k"
  });
  
  const PhotoComp = ({ photo }) => {
    const { user, urls } = photo;
  
    return (
      <>
        <img className="img" src={urls.regular} />
        <a
          className="credit"
          target="_blank"
          href={`https://unsplash.com/@${user.username}`}
        >
          {user.name}
        </a>
      </>
    );
  };
  
  const Body = () => {
    const [data, setPhotosResponse] = useState(null);
  
    useEffect(() => {
      api.search
        .getPhotos({ query: "cat", orientation: "landscape" })
        .then(result => {
          setPhotosResponse(result);
        })
        .catch(() => {
          console.log("something went wrong!");
        });
    }, []);
  
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


export default function ResultPage() { 
    const { resultsPage } = useParams();
    const recivedPhotoShort = resultsPage.slice(1, resultsPage.length);
    const [val, setValue] = useState("");
    const [data, setPhotosResponse] = useState(null);



        return (
            <>
            <p>ResultPage {recivedPhotoShort}</p>
            
            <div className="autocomplete-wrapper">
            <h3>React Autocomplete Demo</h3>
                <Autocomplete
                    value={val}
                    items={MoviesData()}
                    getItemValue={item => item.title}
                    shouldItemRender={renderMovieTitle}
                    renderMenu={item => (
                        <div className="dropdown">
                            {item}
                        </div>
                    )}
                    renderItem={(item, isHighlighted) =>
                        <div   div className={`item ${isHighlighted ? 'selected-item' : ''}`}>
                            {item.title}
                        </div>
                        }
                    onChange={(event, val) => setValue(val)}
                    onSelect={val => setValue(val)}
                />
            </div>
            <Body />
            </>
            
        );
}

