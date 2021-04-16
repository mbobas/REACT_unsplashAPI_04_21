import React, { useState } from 'react';
import { MoviesData, renderMovieTitle } from './movies-data';
import Autocomplete from 'react-autocomplete';
import './TestAutocomplete.css';

export default function TestAutocomplete() {
  
  const [val, setValue] = useState("");

    return (
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
            <div className={`item ${isHighlighted ? 'selected-item' : ''}`}>
              {item.title}
            </div>
          }
          onChange={(event, val) => setValue(val)}
          onSelect={val => setValue(val)}
        />
      </div>
    );
}

