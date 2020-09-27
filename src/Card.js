import React from 'react';
import './Card.css';

function Card ({ image, name }){
  let angle = Math.random() * 90 - 45;
  let x = Math.random() * 40 - 20;
  let y = Math.random() * 40 - 20;
  let _transform = `translate(${x}px,${y}px) rotate(${angle}deg)`;

  return <img style={{ transform: _transform }} className="card" src={image} alt={name} />;
}
export default Card;
