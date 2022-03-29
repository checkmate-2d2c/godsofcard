import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import '../static/styles/LatestCard.css';

import { getLatestCards } from '../ajax/cards';

function LatestCard() {
  const [cards, setCards] = useState([]);
  const defaultDisplayClassNames = ['left', 'middle', 'right'];

  const setDefaultCards = (newCards) => {
    for (let i = 1; i < 3; i++) {
      newCards[i] = newCards[i] === undefined ? newCards[i-1] : newCards[i];
    }

    const newDisplay = [];
    defaultDisplayClassNames.forEach((value, index) => {
      newDisplay.push({ src: newCards[(index + newCards.length - 1) % newCards.length].card.url, className: value });
    });

    setCards(newDisplay);
  };

  const moveCards = (direction) => {
    const moveDisplay = cards.map(({ src, className }) => ({ src, className: `${className} move${direction}` }));
    const moveDirection = direction === 'L' ? 1 : -1;
    const newDisplay = cards.map((_, index) => ({ src: cards[(index + cards.length + moveDirection) % cards.length].src, className: defaultDisplayClassNames[index]}));
    console.log(cards);
    console.log(newDisplay);

    setCards(moveDisplay);
    
    setTimeout(() => {
      setCards(newDisplay);
    }, 200);
  };

  useEffect(() => {
    (async () => {
      const newCards = await getLatestCards();
      setDefaultCards(newCards);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="latestcard">
      <div style={{color: 'white'}}><FontAwesomeIcon icon={faFolderOpen} />&nbsp;最新卡牌 Lastest Card</div>
      <div className="arrow-container" style={{ color: 'white' }}>
        <FontAwesomeIcon icon={faChevronLeft} id="left-nav" className="latestcard-arrow" onClick={() => moveCards('L')}/>
        <FontAwesomeIcon icon={faChevronRight} id="right-nav" className="latestcard-arrow" onClick={() => moveCards('R')}/>
      </div>
      <div className="card-container">
        {cards.map(({ src, className }, index) => <img key={index} src={src} alt="" className={className} />)}
      </div>
    </div>
  );
}

export default LatestCard;