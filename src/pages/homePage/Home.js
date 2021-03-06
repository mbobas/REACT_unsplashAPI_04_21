import React from 'react';
import "./home.css"
import { Redirect, Link} from 'react-router-dom';



class Home extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
        text: "",
        redirectTo: false,
        matches: []
    }
}

componentDidMount() {
      this.searchStates("a");
  }

        searchStates = (searchText) => {
            let data = require('./state.json');
            for (var i = 0; i < data.length; i++)
        {
            var obj = data[i];
            //console.log(`Name: ${obj.name}`);
        }
        
        // searchStates = async searchText => {
        // // console.log("searchStates method")
        // // const res = await fetch('./state.json');
        // // const states = await res.json();

        //Get matches to current text input 
        this.state.matches = data.filter(item => {
            const regex = new RegExp(`^${searchText}`, 'gi');
            return item.name.match(regex) || item.abbr.match(regex);
        });

        if (searchText.length === 0 ) {
            this.matches = [];
        }
        console.log(this.state.matches.slice(0,5));
        //outputHtml(matches.slice(0,2));
    
        };

    goToResultsPage = (e, newText) => {
       //e.preventDefault();
       this.setState({redirectTo: true});
       console.log("ENTER: " + newText + this.state.redirectTo);
    }

    handleInputChnge = (e) => {
        this.setState({text: e.target.value});
        console.log("wpisuje");
        this.searchStates(e.target.value)
    }

    render () {
        if (this.state.redirectTo === true) {
            return <Redirect to={'/:'+this.state.text} />
           
        } else {
        
        return (
            <div className="wrapper">
                <form
                autoComplete="off"
                className="form"
                onSubmit={(e)=> this.goToResultsPage(e, this.state.text)}
                >

                <input
                    onChange={this.handleInputChnge}
                    value={this.state.text}
                    name="searchBar"
                    label="SearchBar"
                    />

                </form>
                {this.searchStates}
            </div>
            
        );
    }
}
}
export default Home;