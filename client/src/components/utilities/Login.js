import React from "react"
import { GoogleLogin } from 'react-google-login';

export const checkLogin = async() => {
	var token = "";
	var cookie = document.cookie;
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf("token") === 0) {
			token = c.substring("token".length + 1, c.length);
		}
	  }
	
	if(token !== ""){
		var tokenJSON = {};
		tokenJSON["id_token"] = token;
		var tokenStr = JSON.stringify(tokenJSON);
		return await checkLoginToken(tokenStr);
	} else {
		return false;
	}
};

export const checkLoginToken = async (token) => {
	var tokenValid = await fetch(`https://nuymeuulnc.execute-api.us-east-1.amazonaws.com/checkToken`, {
		method: "GET",
		headers: {'Authorization': JSON.parse(token).id_token}
	});
	console.log(tokenValid);
	if(tokenValid["status"] !== 200){
		return false;
	}else{
		return true;
	}
};

export class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			loggedIn: false
		}
	}
	
	responseGoogle(response){
		var token = {};
		console.log(response);
		token["id_token"] = response.tokenObj.id_token;
		var tokenStr = JSON.stringify(token);
		
		var tokenValid = checkLoginToken(tokenStr);
		this.setState({"loggedIn": tokenValid});

		if(tokenValid){
			document.cookie = "token=" + response.tokenObj.id_token;
		}
		window.location = "/";
	}

	render() {
		const successCallback = this.responseGoogle.bind(this);
		if (this.state.loggedIn) {
			return (
				<div></div>
			);
		} else {
		return(
			<div>
			<GoogleLogin
				clientId="402862016858-3316mp00ucrloj1fih46qmf1dgf6cdh8.apps.googleusercontent.com"
				buttonText="Login"
				onSuccess={successCallback}
				onFailure={successCallback}
				cookiePolicy={'single_host_origin'}
			> 
			<span> Login with Google</span>
			</GoogleLogin>
			</div>
		);
		}
	}
}
export const logout = (response) => {
	document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	window.location = "/";
};