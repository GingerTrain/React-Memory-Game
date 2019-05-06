import React from 'react';
import react from '../img/react.svg';

function Card(props) {
    let frontCard = '';

    if(props.cardsClass === 'flip') {
        frontCard = 'unflip';
    }
    else if(props.cardsClass === 'unflip') {
        frontCard = 'flip';
    }

    return (
        <div className = 'Card' onClick = {props.onClick} >
            <img
                className = {'front-card ' + frontCard}
                src = {props.img}
                alt = {props.alt}
            />
            <img
                className = {'back-card ' + props.cardsClass}
                src = {react}
                alt = {'react'}
            />
        </div>
    );
}

export default Card;
