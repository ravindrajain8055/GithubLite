import React,{Fragment} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const App = () => 
    <Router>
      <Fragment className="App">
        <Navbar />
        <Route exact path='/' component={ Landing } />  
      </Fragment>
    </Router>
    

export default App;
