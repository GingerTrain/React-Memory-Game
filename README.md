# react-memory-game

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), and inspired by Marina Ferria's [Vanilla JavaScript Memory Game](https://marina-ferreira.github.io/projects/js/memory-game/).

A simple React memory card game to help me practice React, Git, Markdown, and CSS, among other things.

## Table of Contents
- [Lore](#lore)
- [How it Works](#how-it-works)
- [Components](#components)
- [TODO](#todo)
- [Special Thanks](#special-thanks)

## Lore

After finishing the official React Tic-Tac-Toe tutorial I wanted to practice what I learned. I saw Marina Ferria's Vanilla JavaScript Memory Game a while ago on freeCodeCamp and decided I would try my hand at re-creating it in React. For this project I wanted to test myself as much as possible, so I restricted myself to only the React Docs, my React Tic-Tac-Toe game, and Marina's game. I was only allowed to Google for CSS problems, because this project wouldn't get done otherwise.

## How it Works

Download the .zip here or `git clone`

Run `npm install` then `npm start` to start the server

Enjoy the game :)

## Components
### Card
Takes the props data from the Board component, checks if the cards are flipped or unflipped properly, and returns two images representing the front and back of the card.

### Board
Takes the state data from the Game component, returns the respective card number when clicked, and renders a grid of Cards.

### Game (Main)
Contains all the game logic, controls the flipping animation by modifying the CSS class of the elements, and controls the following state:

- cards - An array of shuffled images
- cardsClass - An array tracking which cards are flipped or unflipped, controls animation
- hasFlippedCard - A boolean tracking whether the user has already flipped a card
- firstCard - An object containing the image and position of the first card the user flipped
- secondCard - An object containing the image and position of the second card the user flipped
- won - A boolean tracking whether the user has won the game or not

Renders the Board, a hidden victory message, and a reset button. When a card is clicked it checks whether the card is already flipped, whether the user has already flipped a card, and whether the cards match. When all the cards are flipped the victory message is visible. When the reset button is clicked it resets the state, hides the victory message, and renders another Board.

## TODO

- Explain game simply, include pictures and/or gifs
- Improve visuals and website
- Responsive / mobile-friendly / resizeability
- Maximum browser compatibility and support
- Improve animation
- Comment more and better
- Refactor and improve redundant / inefficient code

### Special Thanks

Shoutout to my brother Randy for:
- Helping simplify my algorithm to dynamically get the alt text
- Listening to me complain about CSS a lot
