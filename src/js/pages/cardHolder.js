import React from "react";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import axios from 'axios';
import {hashHistory} from "react-router";


import GameCntrl from '../misc/gameCntrl';
import Card  from '../components/card';
import ReceiverCard  from '../components/receiverCard';
import { observe } from '../misc/game';


@DragDropContext(HTML5Backend)
export default class CardHolder extends React.Component{
	constructor(params){
		super(params);
		const {email} = params.params;
		console.log(email);
		//init state
		this.state = {
			email: email,
			cards: [],
			receiverCards: {}
		};
		this.gameCntrl = null;
		//fetch saved state
		axios({
			method: 'post',
			url: '/game/fetch',
			data: {
				email: email
			}
		})
		.then((res) => {
			this.gameCntrl = new GameCntrl(res.data.cards);
			this.init(this.gameCntrl);
		})
		.catch((err) => {
			console.log('err',err,new GameCntrl());
			this.gameCntrl = new GameCntrl();
			this.init(this.gameCntrl);
		});

		this.reinit = this.reinit.bind(this);
		this.logout = this.logout.bind(this);
	}

	componentDidMount(){
		
	}

	init(data){
		const {cards, receiverCards} =  data;
		this.setState({
			cards: cards,
			receiverCards: receiverCards
		});
		this.observerContainer = observe(this.handleCardMove.bind(this));

	}

	serialize(){
		return {
			email: this.state.email,
			cards : this.state.cards
		};
	}

	logout(){
		// data.email = this.state.email;
		// data.cards =  this.state.cards;
		this.observerContainer();
		axios({
			method: 'post',
			url: '/game/save',
			data : this.serialize()
		})
		.then((res) => {
			hashHistory.push('/');
		})
		.catch((err) => {
		});

	}

	reinit(){
		this.observerContainer();
		this.gameCntrl = new GameCntrl();
		this.init(this.gameCntrl);
	}

	handleCardMove(card){

		//card matched, find and delete it
		this.gameCntrl.findAndDelete(card);
		const {cards} =  this.gameCntrl;
		//update state
		this.setState({
			cards: cards,
		});

	}

	render(){
		let leftCard = 0, gameOver = true;
		let cards = [], receiverCards = [];
		if(this.state.cards.length !== 0){
			 cards = this.state.cards.map((data,i) => {
				if (data) {
					gameOver = false;
					leftCard++;
					return <Card key={i} value={data.value} ID={data.ID} pos={leftCard}/> 
				}
			});
			receiverCards = this.state.receiverCards.map((data, i) => <ReceiverCard key={i} value={data.value} pos={i}/>);
		}
		return(
				<div>
					<button onClick={this.logout}>Logout</button> 
					<label> Leftover cards : {leftCard}</label>
					<div class="main-cards">
						{cards}
					</div>
					<div class="receiver-cards">
					{receiverCards}
					</div> 
					{ gameOver ? <div className="modal"><button onClick={this.reinit}>Restart</button></div>: null}

				</div>
			);
	}
} 