import React from "react"
import { GoogleLogin } from 'react-google-login';

export const checkLogin = () => {
	console.log("WHAT UP");
	if(sessionStorage.getItem("token") !== null){
		console.log(sessionStorage.getItem("token"));
		return true;
	} else {
		return false;
	}
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
		
		var tokenValid = fetch(`/checkToken`, {
			method: "POST",
			headers: {'Content-Type': 'application/json; charset=utf-8', },
			body: tokenStr
		})
		if(response.profileObj && response.profileObj.email !== undefined){
			this.setState({
				isSignedIn: true
			  });
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