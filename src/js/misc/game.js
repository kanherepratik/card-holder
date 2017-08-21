let currentcard = null;
let observer = null;


function emitChange() {
  observer(currentcard);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();

  return () => {
    observer = null;
  };
}

export function setCard(card){
	currentcard = card;
	// return true;
}

export function canMove(card){
	//get letters from current card
	let cardType = currentcard.value.match(/[a-zA-Z]+/g,'')[0];
	return cardType === card.value;
}

export function moveCard(card){
	let cardType = currentcard.value.match(/[a-zA-Z]+/g,'')[0];
	if(cardType === card.value)
		emitChange();	
  else{
    
  }
}