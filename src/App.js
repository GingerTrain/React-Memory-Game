import React, { Component } from 'react';
import './App.css';

import angular from './img/angular.svg';
import css from './img/css.svg';
import html from './img/html.svg';
import javascript from './img/javascript.svg';
import node from './img/node.svg';
import react from './img/react.svg';
import vue from './img/vue.svg';

function Card(props) {
  // Temp fix for front-card img flip issue TODO: Refactor
  let frontCard = '';
  if(props.cardsClass === 'flip') {
    frontCard = 'unflip';
  }
  else if(props.cardsClass === 'unflip') {
    frontCard = 'flip';
  }

  return (
    <div className='Card' onClick={props.onClick}>
      <img className={'front-card ' + frontCard} src={props.img} alt={props.alt} />
      <img className={'back-card ' + props.cardsClass} src={react} alt={'react'} />
    </div>
  );
}

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

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: shuffleCards(),
      cardsClass: Array(12).fill(''),
      hasFlippedCard: false,
      firstCard: {img: '', pos: '',},
      secondCard: {img: '', pos: '',},
      won: false,
    };
  }

  handleClick(i) {
    // Duplicate state data TODO: Refactor?
    let cards = this.state.cards.slice();
    let cardsClass = this.state.cardsClass.slice();
    let hasFlippedCard = this.state.hasFlippedCard;
    let firstCard = this.state.firstCard;
    let secondCard = this.state.secondCard;

    // Prevent user from clicking an already flipped card
    if(cardsClass[i] === 'flip') {
      return;
    }

    // If a card is already flipped
    if(hasFlippedCard) {
      secondCard.img = cards[i];
      secondCard.pos = i;

      if(isMatch(firstCard, secondCard)) {
        cards[i] = secondCard.img;
        cardsClass[i] = 'flip';
      } else { // TODO: Fix bugs with flipping cards (delay)
        cards[i] = secondCard.img;
        cardsClass[i] = 'flip';

        this.setState({
          cards: cards,
          cardsClass: cardsClass,
          hasFlippedCard: !this.state.hasFlippedCard,
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

          return;
        }, 1000);
      }
    } else {
      firstCard.img = cards[i];
      firstCard.pos = i;

      cards[i] = cards[i];
      cardsClass[i] = 'flip';
    }

    if(calculateWinner(cardsClass)) {
      console.log("Game over.");
      this.setState({
        cards: cards,
        cardsClass: cardsClass,
        hasFlippedCard: !this.state.hasFlippedCard,
        firstCard: firstCard,
        secondCard: secondCard,
        won: true,
      });
    }

    // Update state accordingly
    this.setState({
      cards: cards,
      cardsClass: cardsClass,
      hasFlippedCard: !this.state.hasFlippedCard,
      firstCard: firstCard,
      secondCard: secondCard,
    });
  }

  render() {
    return (
      <div className='Game'>
        <div className='Game-Board'>
          <Board
            img={this.state.cards}
            cardsClass={this.state.cardsClass}
            onClick={(i) => this.handleClick(i)}
          />
          <div>
            {this.state.won && <h1>Congratulations, you won!</h1>}
          </div>
        </div>
        <button className='ResetBtn' onClick={() => this.resetGame()}>Reset</button>
      </div>
    );
  }

  resetGame() {
    this.setState({
      cards: shuffleCards(),
      cardsClass: Array(12).fill(''),
      hasFlippedCard: false,
      firstCard: {img: '', pos: '',},
      secondCard: {img: '', pos: '',},
      won: false,
    });
  }
}

// Shuffles order of cards each new game
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

// Checkes if the two flipped cards match
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

export default Game;

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
