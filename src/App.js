import React from 'react';
import "./App.css";
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './pages/homePage/Home';
import ResultsPage from './pages/resultsPage/ResultsPage';
import TestAutocomplete from './pages/test/TestAutocomplete';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path="/"  component={Home} />
                    <Route path="/home" component={Home} />
                    <Route exact path="/TestAutocomplete" component={Home} />
                    <Route exact path="/:resultsPage" component={ResultsPage} />
                    
                </Switch>
            </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
