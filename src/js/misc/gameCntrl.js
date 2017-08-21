import Cards from '../components/cards';


export default class GameCntrl{
	constructor(state){
		if(state){
			this.cards = state;
			this.receiverCards = new Cards(false).receiverCards;
		}
		else
			{
				var {cards, receiverCards} = new Cards(true);
				this.cards = cards;
				this.receiverCards = receiverCards;
			}
	}

	findAndDelete(card){
		for(let i = 0;i<this.cards.length; i++){
			if(card && this.cards[i]){
				if(this.cards[i].ID === card.ID){
					this.cards[i] = null;

				}
			}
		}
		
	}

}