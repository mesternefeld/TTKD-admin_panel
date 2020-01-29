import React from "react"
import { GoogleLogin } from 'react-google-login';

export const checkLogin = () => {
	if(sessionStorage.getItem("email") !== null){
		return true;
	} else {
		return false;
	}
};
function initialLogin(self) {
	const url = `${window.events.hostname}/api/initial_login`;
	const data = new URLSearchParams();

	data.append("email", sessionStorage.getItem("email"));
	data.append("first_name", sessionStorage.getItem("fname"));
	data.append("last_name", sessionStorage.getItem("lname"));

	fetch(url, {
		method: "post",
		body: data
	})
	.then((res) => res.json())
	.then((response) => {
		//console.log(response);
		sessionStorage.setItem("id", response.user_id);
		sessionStorage.setItem("permission", response.permission);

		self.setState({
			loggedIn: true
		});
	})
	.catch((error) => {
		console.error(error);
		// Should probably do some real error handling LOL
	});
}

export class Login extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			loggedIn: false
		};

		this.check = this.check.bind(this);
	}
	
	check(response){
		if(response.w3 && response.w3.U3 !== undefined){
			sessionStorage.setItem("email", response.w3.U3);
			sessionStorage.setItem("fname", response.w3.ofa);
			sessionStorage.setItem("lname", response.w3.wea);
			initialLogin(this);
		}
	}

	render() {
		if(!this.state.loggedIn) {
			return (
				<div>
					<div className="container">
					<div className="center">
						<h2>To sign into the Event Management System, please use Google.</h2>
						
						<GoogleLogin
							socialId="402862016858-cpmh4k9ajrf6le3v5h3726rs1sqllv97.apps.googleusercontent.com"
							className="google-login"
							fetchBasicProfile={true}
							responseHandler={this.check}
							buttonText=""
						/>
						</div>
					</div>
				</div>
			);
		} else {
			window.location = "/";
			return (
				<div></div>
			);
		}
	}
}
export const logout = (response) => {
	sessionStorage.clear();
	window.location = "/";
};