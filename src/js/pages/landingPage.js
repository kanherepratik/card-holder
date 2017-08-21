import React from "react";
import {hashHistory} from "react-router";

export default class LandingPage extends React.Component{
	constructor(par){
		super();

		this.state = {email: ''};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.emailChange = this.emailChange.bind(this);
	}

	handleSubmit(event){
		hashHistory.push(`cards/${this.state.email}`);
	}

	emailChange(event){
		this.setState({email: event.target.value});
	}

	render(){
		return(
			<div class="header">
					<h1>Game</h1>
				<form onSubmit={this.handleSubmit}>
					<label>Enter your email </label> <input type="email" value={this.state.email} onChange={this.emailChange} required/>
					<input type="submit" value="Submit"/>
				</form>
			</div>
			)
	}
}