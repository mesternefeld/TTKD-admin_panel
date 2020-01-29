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
                  <Route exact path="/" component={Homepage}/>
                  <Route exact path="" component={Homepage}/>
                  <Route exact path="/List" component={List}/>
                </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }else{
    return (
      <Login />
    );
  }
}

export default App;
