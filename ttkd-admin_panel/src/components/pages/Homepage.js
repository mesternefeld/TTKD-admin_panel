import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './btn_google_signin_light_normal_web@2x.png'
import { Button, Form } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';


class Homepage extends React.Component {
    constructor(props){
		super(props);
    }
 
  render(){
    if (sessionStorage.getItem("email") !== null) {
      return <p>hello user, you're signed in </p>
    }
  }
}

export default Homepage;