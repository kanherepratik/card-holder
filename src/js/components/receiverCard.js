import React from 'react';
import { DropTarget } from 'react-dnd';

import { canMove, moveCard } from '../misc/game';

const squareTarget = {
  canDrop(props) {
  	return true;
  },

  drop(props) {
  	moveCard(props);
  },
};

function collect(connect, monitor){
	return{
		connectDropTarget: connect.dropTarget(),
    	isOver: monitor.isOver(),
    	canDrop: monitor.canDrop(),
	};
}

@DropTarget('Card', squareTarget, collect)
export default class ReceiverCard extends React.Component{
	constructor(par){
		super();
		let curr_class = "card_"+par.pos;
		this.state = {
			value : par.value,
			curr_class
		};
	}
	render(){
		    const { connectDropTarget } = this.props;
		const classes = this.state.curr_class+" card pull-bottom"
		return connectDropTarget(
			<div className={classes}>{this.state.value}</div>
		);
	}
}

