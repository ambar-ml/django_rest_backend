
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Shop from './components/Shop';
import Contact from './components/Contact';
import About from './components/About';
import ItemDetail from './components/ItemDetails'
import React from 'react';

import Search from './components/Search'
import Check from './components/Check'
import Register from './components/Register'
import SignIn  from './components/Login';
import Men from './components/Men';
import Women from './components/Women';

import {BrowserRouter as Router , Switch, Route } from 'react-router-dom';
import Cartdetails from './components/Cartdetails';
import Order from './components/Order';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'



function App() {
  return (
  
    <Router>
    <div className="App">
    
    <Switch>
    
    <Route path="/" exact component={Home}/>
    <Route path="/shop" exact  component={Shop}/>
    
    <Route path="/contact"   component={Contact}/>
    
    <Route path="/shop/:id"  component={ItemDetail}/>
    <Route path="/cart"   component={Cartdetails}/>
    <Route path="/search/:search"   component={Search}/>
    <Route path="/check"   component={Check}/>
    <Route path="/register"   component={Register}/>
    <Route path="/login" component={SignIn}/>
    <Route path="/men/:cat" component={Men}/>
    <Route path="/women/:cat" component={Women}/>
    <Route path='/order' component={Order}/>
    



    </Switch>

      
    </div>
    </Router>
  );
}

export default App;
