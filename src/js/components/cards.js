
class IDGenerator{
	constructor(){
		this.length = 8;
		this.timestamp = +new Date;
	}
		 
 	_getRandomInt( min, max ) {
		return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
 	}
	generate() {
		var ts = this.timestamp.toString();
		var parts = ts.split( "" ).reverse();
		var id = "";
		 
		for( var i = 0; i < this.length; ++i ) {
			var index = this._getRandomInt( 0, parts.length - 1 );
			id += parts[index];	 
		}
		return id;
	}	
}

class Card{
	constructor(val){
		this.value = val;
		this.ID = new IDGenerator().generate();
	}
}

export default class Cards{
	constructor(params){
		this.cards = [];
		this.receiverCards = [];
		this.cardType = ['clubs','diamonds','hearts','spades'];
		for(var i = 0; i <4; i++){
			if(params){
				for(var j= 1; j<=13; j++){
					this.cards.push(new Card(this.cardType[i]+j));
				}
			}
			this.receiverCards.push(new Card(this.cardType[i]));		
		}
		const {cards} = this;
		var shuffle_card = this.shuffleArray(cards);
		this.state = {
			cards
		};
	}
	shuffleArray(array){
		var m = array.length, t, i;
  		// While there remain elements to shuffle…
  		while (m) {
    	// Pick a remaining element…
    	i = Math.floor(Math.random() * m--);

	    // And swap it with the current element.
	    t = array[m];
	    array[m] = array[i];
	    array[i] = t;
  		}
  		return array;
	}
}