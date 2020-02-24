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
		console.log(response.tokenObj.id_token);
		
		if(response.profileObj && response.profileObj.email !== undefined){
			this.setState({
				isSignedIn: true
			  });
			sessionStorage.setItem("email", response.profileObj.email);
		}

		var jsonTest = "{\"id_token\":\"eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc5YzgwOWRkMTE4NmNjMjI4YzRiYWY5MzU4NTk5NTMwY2U5MmI0YzgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNDAyODYyMDE2ODU4LTMzMTZtcDAwdWNybG9qMWZpaDQ2cW1mMWRnZjZjZGg4LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDAyODYyMDE2ODU4LTMzMTZtcDAwdWNybG9qMWZpaDQ2cW1mMWRnZjZjZGg4LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE2NDIyOTg1OTE5Nzk1ODM4NTg1IiwiaGQiOiJnLnJpdC5lZHUiLCJlbWFpbCI6Im14czczNTNAZy5yaXQuZWR1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiIxY3UtMFF5R1hGa1hmNDhFbjlVMzB3IiwibmFtZSI6Ik1hcmlhbm5hIFN0ZXJuZWZlbGQiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FBdUU3bUNjeFp0RlFGVFBHUlI0WEo0N0VXbTV4RVp6cW5pZU1qZzdTSzJaa3c9czk2LWMiLCJnaXZlbl9uYW1lIjoiTWFyaWFubmEiLCJmYW1pbHlfbmFtZSI6IlN0ZXJuZWZlbGQiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTU4MjQ4Mzk0MSwiZXhwIjoxNTgyNDg3NTQxLCJqdGkiOiI3ZDU0MzJjOGVkYzQzNjY2NGRlMTdiMDBkOGM3MDdjZDdiMmEwNWZlIn0.ndgXl3B8g0LRKkse_N4qWXfBOQjPWF4-_iWEkxDTvtGB2VXB1F30zuzxBHu8S6AAClLz-beS3wKc7-JIuv1C6VrI218pgQweilWxn2ZojHXGa-2nY1fFjqPyjhXyTckJX48AbBRsOGaDKk6AyLbhGq-UkUkI7ZXyRmWXuC1J0oKuzk1iG4nGRnceGquopQzPjmaulT29RfQbdakdIkQl6ZINF1tbXoJEAtdjsu8AQVA9CAQ-CT5E5srTROcACYHL4nVEcYeZG6FeaUEiX3xpzp0wc9sRw6ltgfqCqxTBIQ8d58OrsOLp4VL3tXvPUjMk5U1MqkGB1KSvGu3b7svlw\"}";

		var token = {};
		token["id_token"] = response.tokenObj.id_token;
		var tokenStr = JSON.stringify(token);
		fetch(`/checkToken`, {
			method: "POST",
			headers: {'Content-Type': 'application/json; charset=utf-8', },
			body: tokenStr//response.tokenObj.id_token
		})
		//window.location = "/";
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