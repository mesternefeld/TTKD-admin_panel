import React from "react"
import { GoogleLogin } from 'react-google-login';

export const checkLogin = () => {
	if(sessionStorage.getItem("email") !== null){
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

	onSignIn(googleUser) {
		var id_token = googleUser.getAuthResponse().id_token;
	}
	
	responseGoogle(response){
		console.log(response.profileObj);
		
		if(response.profileObj && response.profileObj.email !== undefined){
			this.setState({
				isSignedIn: true
			  });
			sessionStorage.setItem("email", response.profileObj.email);
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