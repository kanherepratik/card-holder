import React from 'react';
import { DragSource } from 'react-dnd';

import { setCard } from '../misc/game';

const cardSource = {
  beginDrag(prop) {
    setCard(prop);
    return {};
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

@DragSource('Card', cardSource, collect)
export default class Card extends React.Component{
	constructor(par){
		super();
		this.state = {
			value : par.value,
			ID: par.ID,
			pos: par.pos
		};
	}
	render(){
		let pos = {};
		pos.x = parseInt(this.state.pos/13);
		pos.y = this.state.pos%13;
		let cur_class= "card_" + pos.x + "_" + pos.y;
		const { connectDragSource } = this.props;
		const classes = cur_class + " card";
		return connectDragSource(
			<div className={classes}>Card </div>
		);
	}
}
