import React from "react"
import { GoogleLogin } from 'react-google-login';

export const checkLogin = () => {
	var token = sessionStorage.getItem("token");
	if(sessionStorage.getItem("token") !== null){
		return checkLoginToken(token);
	} else {
		return false;
	}
};

export const checkLoginToken = (token) => {
	var tokenValid = fetch(`/checkToken`, {
		method: "POST",
		headers: {'Content-Type': 'application/json; charset=utf-8', },
		body: tokenStr
	});
	return tokenValid;
};

export class Login extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			isSignedIn: false
		};

	}
	
	responseGoogle(response){
		console.log(response.tokenObj.id_token);
		var token = {};
		token["id_token"] = response.tokenObj.id_token;
		var tokenStr = JSON.stringify(token);
		
		var tokenValid = checkLoginToken(tokenStr);

		if(response.profileObj && response.profileObj.email !== undefined){
			sessionStorage.setItem("token", response.tokenObj.id_token);
		}
		window.location = "/";
	}

	render() {
		const successCallback = this.responseGoogle.bind(this);
		if (checkLogin()) {
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
	sessionStorage.clear();
	window.location = "/";
};