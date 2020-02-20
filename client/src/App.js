import React from 'react';
import './App.css';
import {Header} from "./components/header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, BrowserRouter} from "react-router-dom";
import {
  Homepage,
  List,
  Dashboard,
  FileStructure,
  Audio, 
  Steps, 
  Video
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
                <Route exact path="/List" component={List}/>
                <Route exact path= "/Dashboard" component={Dashboard}/>
                <Route exact path="/FileStructure" component={FileStructure}/>
                <Route exact path="/Audio" component={Audio}/>
                <Route exact path="/Steps" component={Steps}/>
                <Route exact path="/Video" component={Video}/>
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
