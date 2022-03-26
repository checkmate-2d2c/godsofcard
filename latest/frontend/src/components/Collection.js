import { useEffect, useState } from 'react';

import { getCards } from '../ajax/cards';

import '../static/styles/Collection.css';

function Collection(props) {
  const [characterName, setCharacterName] = useState('');
  const [animeName, setAnimeName] = useState('');
  const [tierName, setTierName] = useState('');
  const [cards, setCards] = useState([]);

  const applyFilter = () => {
    const newCards = cards.map((card) => {
      const nameMatch = characterName === '' ? true : card.name.toLowerCase().includes(String(characterName).toLowerCase());
      const animeMatch = animeName === '' ? true: card.anime.toLowerCase().includes(String(animeName).toLowerCase());
      const tierMatch = tierName === '' ? true : card.tier === tierName;
      const match = (nameMatch === true && animeMatch === true && tierMatch === true);
      const newCard = Object.assign({}, card);
      newCard.selected = match ? true : false;
      return newCard;
    });
    setCards(newCards);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    (async() => {
      setCharacterName('');
      setAnimeName('');
      setTierName('');
      const newCards = await getCards(props.scope);
      newCards.forEach(card => card.selected = true);
      setCards(newCards);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.scope]);

  return (
    <>
      <br />
      <div className="collection-title">
        <h1>{props.title}</h1>
        <div></div>
      </div>
      <br />
      <div className="collection-filter">
        <input type="text" id="name-search" value={characterName} placeholder="Character Name" onChange={(e) => setCharacterName(e.target.value)} />
        <input type="text" id="anime-search" value={animeName} placeholder="Anime Name" onChange={(e) => setAnimeName(e.target.value)} />
        <select defaultValue={""} value={tierName} id="tier-search" onChange={(e) => setTierName(e.target.value)}>
          <option value="" disabled>Tier</option>
          <option value="">None</option>
          <option value="S">S</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
        <button id="search" onClick={() => applyFilter()}>Search</button>
      </div>
      <br />
      <div className="card-display">
        {cards.map(({ url, selected }, index) => selected ? <img key={index} src={url} alt="" /> : null)}
      </div>
      <br/>
    </>
  );
}

export default Collection;