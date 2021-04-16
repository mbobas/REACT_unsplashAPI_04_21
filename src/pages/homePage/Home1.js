import React from 'react';
import "./home.css"
import { Redirect} from 'react-router-dom';


class Home extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
        text: "",
        redirectTo: false,
    }
}
    
    goToResultsPage = (e, newText) => {
       //e.preventDefault();
       this.setState({redirectTo: true});
       console.log("ENTER: " + newText + this.state.redirectTo);
    }

    handleInputChnge = (e) => {
        this.setState({text: e.target.value});
        console.log("wpisuje");
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
            </div>
        );
    }
}
}
export default Home;