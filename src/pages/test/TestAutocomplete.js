import React, { Component } from 'react';
import { MoviesData, renderMovieTitle } from './movies-data';
import Autocomplete from 'react-autocomplete';
import './TestAutocomplete.css';

var table = [];

var wordListJson = require("word-list-json");
for (var i=0; i<=1; i++ ){
  //console.log(wordListJson[i]);
  table.push( { "title": `${wordListJson[i]}` })

}

const tableData = () => {
  return table;
}

console.log(table);


class TestAutocomplete extends Component {
  
  state = { val: '' };
 
  render() {
    
    return (
      <div className="autocomplete-wrapper">
        <h3>React Autocomplete Demo</h3>
        <Autocomplete
          value={this.state.val}
          items={tableData()}
          getItemValue={item => item.title}
          shouldItemRender={renderMovieTitle}
          renderMenu={item => (  //map function only 5 items
            <div className="dropdown">
              {item}
            </div>
          )}
          renderItem={(item, isHighlighted) =>
            <div className={`item ${isHighlighted ? 'selected-item' : ''}`}>
              {item.title}
            </div>
          }
          onChange={(event, val) => this.setState({ val })}
          onSelect={val => this.setState({ val })}
          
        />
      </div>
    );
  }
}

export default TestAutocomplete;

