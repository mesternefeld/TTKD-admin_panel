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
  Video,
  Content
} from "./components/pages";

function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
        <div className="container">
              <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route exact path="/List" component={List}/>
                <Route exact path= "/Dashboard" component={Dashboard}/>
                <Route exact path="/FileStructure" component={FileStructure}/>
                <Route exact path="/Audio" component={Audio}/>
                <Route exact path="/Steps" component={Steps}/>
                <Route exact path="/Video" component={Video}/>
                <Route exact path="/Content" component={Content}/>
              </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
