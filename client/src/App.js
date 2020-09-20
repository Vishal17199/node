import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Navbar from "./components/navbar"
import Signup from "./components/signup"
import Signin from "./components/signin"
import PublicChat from "./components/publicChat"
import PrivateChat from "./components/privateChat"
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       
        <Route path="/signup">
        <Navbar />
          <Signup />
        </Route>
        <Route path="/signin">
    <Navbar/>
          <Signin />
        </Route>

        <Route path="/public">
        <Navbar />
          <PublicChat />
        </Route>
        <Route path="/private">
          <Navbar />
          <PrivateChat/>
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
