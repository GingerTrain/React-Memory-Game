import React, { Component } from 'react';
import Card from './Card.js';

class Board extends Component {
    renderCard(i) {
        return (
        <Card
            cardsClass={this.props.cardsClass[i]}
            img={this.props.img[i]}
            // alt={JSON.stringify(this.props.img[i]).split(/[\\/]/g).pop().split('.')[0]}
            alt={JSON.stringify(this.props.img[i]).split('/')[3].split('.')[0]}
            onClick={() => this.props.onClick(i)}
        />
        );
    }

    render() {
        return (
        <div className="Board">
            {this.renderCard(0)}
            {this.renderCard(1)}
            {this.renderCard(2)}
            {this.renderCard(3)}
            {this.renderCard(4)}
            {this.renderCard(5)}
            {this.renderCard(6)}
            {this.renderCard(7)}
            {this.renderCard(8)}
            {this.renderCard(9)}
            {this.renderCard(10)}
            {this.renderCard(11)}
        </div>
        );
    }
}

export default Board;
