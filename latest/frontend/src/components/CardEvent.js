import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';

import '../static/styles/CardEvent.css';

import { getCardPools } from '../ajax/cards';

function CardEvent() {
  const [cardPools, setCardPools] = useState([]);
  const defaultDisplayClassNames = ['top', 'middle', 'bottom'];

  const setDefaultEvents = (newCardPools) => {
    for (let i = 1; i < 3; i++) {
      newCardPools[i] = newCardPools[i] === undefined ? newCardPools[i-1] : newCardPools[i];
    }

    const newDisplay = [];
    defaultDisplayClassNames.forEach((value, index) => {
      newDisplay.push({ src: newCardPools[(index + newCardPools.length - 1) % newCardPools.length].banner, className: value });
    });

    setCardPools(newDisplay);
  };

  const moveEvents = (direction) => {
    const moveDisplay = cardPools.map(({ src, className }) => ({ src, className: `${className} move${direction}` }));
    const moveDirection = direction === 'U' ? 1 : -1;
    const newDisplay = cardPools.map((_, index) => ({ src: cardPools[(index + cardPools.length + moveDirection) % cardPools.length].src, className: defaultDisplayClassNames[index]}));
    console.log(cardPools);
    console.log(newDisplay);

    setCardPools(moveDisplay);
    
    setTimeout(() => {
      setCardPools(newDisplay);
    }, 200);
  };

  useEffect(() => {
    (async () => {
      const newCardPools = await getCardPools();
      setDefaultEvents(newCardPools);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="cardevent">
        <div style={{color: 'white'}}><FontAwesomeIcon icon={faCalendar} />&nbsp;卡池 Card Event</div>
        <div className="arrow-container" style={{ color: 'white' }}>
          <FontAwesomeIcon icon={faChevronUp} id="top-nav" className="cardevent-arrow" onClick={() => moveEvents('U')} />
          <br />
          <FontAwesomeIcon icon={faChevronDown} id="bottom-nav" className="cardevent-arrow" onClick={() => moveEvents('B')} />
        </div>
        <div className="card-event-container">
          {cardPools.map(({ src, className }, index) => <img key={index} src={src} alt="" className={className} />)}
        </div>
      </div>
    </>
  );
}

export default CardEvent;