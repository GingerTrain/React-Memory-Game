import React, { Component } from 'react';
import Board from './Board.js';

import angular from '../img/angular.svg';
import css from '../img/css.svg';
import html from '../img/html.svg';
import javascript from '../img/javascript.svg';
import node from '../img/node.svg';
import vue from '../img/vue.svg';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: shuffleCards(),
            cardsClass: Array(12).fill(''),
            hasFlippedCard: false,
            firstCard: {
                img: '',
                pos: '',
            },
            secondCard: {
                img: '',
                pos: '',
            },
            won: false,
        };
    }

    handleClick(i) {
        // Duplicate state data
        let cards = this.state.cards.slice();
        let cardsClass = this.state.cardsClass.slice();
        let hasFlippedCard = this.state.hasFlippedCard;
        let firstCard = this.state.firstCard;
        let secondCard = this.state.secondCard;

        if(cardsClass[i] === 'flip') {
            return;
        }

        if(hasFlippedCard) {
            secondCard.img = cards[i];
            secondCard.pos = i;

            if(isMatch(firstCard, secondCard)) {
                cards[i] = secondCard.img;
                cardsClass[i] = 'flip';
            } else {
                cards[i] = secondCard.img;
                cardsClass[i] = 'flip';

                this.setState({
                    cards: cards,
                    cardsClass: cardsClass,
                    hasFlippedCard: this.state.hasFlippedCard,
                    firstCard: firstCard,
                    secondCard: secondCard,
                });

                setTimeout(() => {
                    cardsClass = unflipCards(firstCard, secondCard, cardsClass);

                    this.setState({
                        cards: cards,
                        cardsClass: cardsClass,
                        hasFlippedCard: !this.state.hasFlippedCard,
                        firstCard: firstCard,
                        secondCard: secondCard,
                    });
                }, 1000);
                return;
            }
        } else {
            firstCard.img = cards[i];
            firstCard.pos = i;

            cardsClass[i] = 'flip';
        }

        if(calculateWinner(cardsClass)) {
            setTimeout(() => {
                this.setState({
                    cards: cards,
                    cardsClass: cardsClass,
                    hasFlippedCard: !this.state.hasFlippedCard,
                    firstCard: firstCard,
                    secondCard: secondCard,
                    won: true,
                });
            }, 500);
        }

        this.setState({
            cards: cards,
            cardsClass: cardsClass,
            hasFlippedCard: !this.state.hasFlippedCard,
            firstCard: firstCard,
            secondCard: secondCard,
        });
    }

    render() {
        return(
            <div className = 'Game' >
                <div className = 'Game-Board' >
                    <Board
                        img = {this.state.cards}
                        cardsClass = {this.state.cardsClass}
                        onClick = {(i) => this.handleClick(i)}
                    />
                    <div className = 'Game-Menu'>
                        {this.state.won && <h1> Congratulations, you won! </h1>}
                        <button className = 'ResetBtn' onClick = {() => this.resetGame()} > Reset </button>
                    </div>
                </div>
            </div>
        );
    }

    resetGame() {
        this.setState({
            cards: shuffleCards(),
            cardsClass: Array(12).fill(''),
            hasFlippedCard: false,
            firstCard: {
                img: '',
                pos: '',
            },
            secondCard: {
                img: '',
                pos: '',
            },
            won: false,
        });
    }
}

// Randomly shuffles cards
function shuffleCards() {
    let cards = [angular, angular, css, css, html, html, javascript, javascript, node, node, vue, vue];
    // Fisher-Yates Shuffle adapted from: https://bost.ocks.org/mike/shuffle/
    let counter = cards.length;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = cards[counter];
            cards[counter] = cards[index];
            cards[index] = temp;
        }

        return cards;
}

// Checkes if the two cards match
function isMatch(firstCard, secondCard) {
    return (firstCard.img === secondCard.img ? true : false);
}

// Unflips the two flipped cards
function unflipCards(firstCard, secondCard, cardsClass) {
    cardsClass[firstCard.pos] = 'unflip';
    cardsClass[secondCard.pos] = 'unflip';

    return cardsClass;
}

// Checks if user won
function calculateWinner(cardsClass) {
    return (cardsClass.every((val) => val === 'flip'));
}

// Alternate board layouts
{/* 3 x 4 board */}
        {/* <div className='Board-row'>
          {this.renderCard(0)}
          {this.renderCard(1)}
          {this.renderCard(2)}
          {this.renderCard(3)}
        </div>
        <div className='Board-row'>
          {this.renderCard(4)}
          {this.renderCard(5)}
          {this.renderCard(6)}
          {this.renderCard(7)}
        </div>
        <div className='Board-row'>
          {this.renderCard(8)}
          {this.renderCard(9)}
          {this.renderCard(10)}
          {this.renderCard(11)} */}

          {/* 4 x 3 board */}
        {/* <div className='Board-row'>
          {this.renderCard(0)}
          {this.renderCard(1)}
          {this.renderCard(2)}
        </div>
        <div className='Board-row'>
          {this.renderCard(3)}
          {this.renderCard(4)}
          {this.renderCard(5)}
        </div>
        <div className='Board-row'>
          {this.renderCard(6)}
          {this.renderCard(7)}
          {this.renderCard(8)}
        </div>
        <div className='Board-row'>
          {this.renderCard(9)}
          {this.renderCard(10)}
          {this.renderCard(11)}
        </div> */}

export default Game;
