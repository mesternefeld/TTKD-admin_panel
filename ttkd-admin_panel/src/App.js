import React from 'react';
import './App.css';
import {Header} from "./components/header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, BrowserRouter} from "react-router-dom";
import {
  Homepage,
  List
} from "./components/pages";
import { checkLogin, Login } from "./components/utilities/Login.js";

function App() {
  if(checkLogin()) {
    return (
      <div className="App">
        <Header/>
        <BrowserRouter>
          <div class="container">
                <Switch>
                  <Route path="/List" component={List}/>
                  <Route path="" component={Homepage}/>
                  <Route exact path="/" component={Homepage}/>
                </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }else{
    return (
      <div className="App">
        <Header/>
        <h1>Please log in below</h1>
        <Login />
      </div>
    );
  }
}

export default App;
