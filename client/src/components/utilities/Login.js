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
		return await checkLoginToken(token);
	} else {
		return false;
	}
};

export const checkLoginToken = async (token) => {
	console.log(token);
	var tokenValid = await fetch(`/checkToken`, {
		method: "POST",
		headers: {'Content-Type': 'application/json; charset=utf-8', },
		body: token
	});
	console.log(tokenValid["status"] !== 200);
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

	componentDidMount() {
		var log = checkLogin();
		console.log(log);
		this.state.loggedIn = log;
	
	}
	
	responseGoogle(response){
		console.log(response.tokenObj.id_token);
		var token = {};
		token["id_token"] = response.tokenObj.id_token;
		var tokenStr = JSON.stringify(token);
		
		var tokenValid = checkLoginToken(tokenStr);

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