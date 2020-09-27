import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css';
const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

function Deck (){
  const [ deck, setDeck ] = useState(null);
  const [ drawn, setDrawn ] = useState([]);
  const [ remaining, setRemaining ] = useState(52);

  // state = {deck:null, drawn: [], remaining: 52}

  // componentDidMount(){
  //   let deck =  axios.get(`${API_BASE_URL}/new/shuffle/`)
  //   setState({ deck:deck.data})
  // }
  useEffect(() => {
    async function getDeck (){
      let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
      setDeck(deck.data);
    }
    getDeck();
  }, []);

  const getCard = async () => {
    let id = deck.deck_id;
    try {
      let cardUrl = `${API_BASE_URL}/${id}/draw/`;
      let cardRes = await axios.get(cardUrl);
      if (!cardRes.data.success) {
        throw new Error('No card remaning');
      }
      let card = cardRes.data.cards[0];
      setDrawn([
        ...drawn,
        {
          id: card.code,
          image: card.image,
          name: `${card.value} of ${card.suit}`,
        },
      ]);
      setRemaining(cardRes.data.remaining);
    } catch (err) {
      alert(err);
    }
  };

  const cards = drawn.map((c) => <Card key={c.id} name={c.name} image={c.image} remaining={c.remaining} />);
  return (
    <div className="Deck">
      <h1 className="Deck-title">CARD DEALER</h1>
      <h2 className="Deck-title subtitle">{remaining} cards remanining </h2>
      <button className="Deck-btn" onClick={getCard}>
        Get Card
      </button>
      {/* <button className="Deck-btn" onClick={setDrawn([])}>
        Reset
      </button> */}
      <div className="Deck-cardarea">{cards}</div>
    </div>
  );
}
export default Deck;
