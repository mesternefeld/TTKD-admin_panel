import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { checkLogin } from "../utilities/Login.js";



class Homepage extends React.Component {
    constructor(props){
		super(props);
    }
 
  render(){
    if (checkLogin()) {
      return <p>hello user, you're signed in </p>
    }
  }
}

export default Homepage;