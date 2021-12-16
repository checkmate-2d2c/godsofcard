import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const cardUrls = ["https://drive.google.com/uc?id=1JI-73xU86K7bMOnJ9O23YET1lnPX_8BV", 
                  "https://drive.google.com/uc?id=1bW4IxxA6C5SJ9feP-SS5olC4YjMSeZOD"];

const LatetestCard = () => {
  const [cards, setCards] = useState({ display: [], index: null });
  const defaultDisplayClassNames = ['left', 'middle', 'right'];

  const setDefaultCards = () => {
    for (let i = 1; i < 3; i++) {
      cardUrls[i] = cardUrls[i] === undefined ? cardUrls[i-1] : cardUrls[i];
    }

    const newDisplay = []
    defaultDisplayClassNames.forEach((value, index) => {
      newDisplay.push({ src: cardUrls[(index + cardUrls.length - 1) % cardUrls.length], className: value });
    });

    setCards({ display: [...newDisplay], index: 0 });
  };

  const moveCards = (direction) => {
    const moveDisplay = cards.display.map(({ src, className }) => ({ src, className: `${className} move${direction}` }));
    const newIndex = direction === 'L' ? 
      (cards.index + 1) % cardUrls.length :
      (cards.index + cardUrls.length - 1) % cardUrls.length;
    const newDisplay = cards.display.map((_, index) => ({ src: cardUrls[(newIndex + index + cardUrls.length - 1) % cardUrls.length], className: defaultDisplayClassNames[index]}));
    setCards({ display: moveDisplay });
    
    setTimeout(() => {
      setCards({ display: newDisplay, index: newIndex });
    }, 200);
  };

  useEffect(() => {
    setDefaultCards();
  }, []);

  return (
    <div className="latestcard">
      <div style={{color: 'white'}}><FontAwesomeIcon icon={faFolderOpen} />&nbsp;最新卡牌 Lastest Card</div>
      <div className="arrow-container">
        <FontAwesomeIcon icon={faChevronLeft} id="left-nav" onClick={() => moveCards('L')}/>
        <FontAwesomeIcon icon={faChevronRight} id="right-nav" onClick={() => moveCards('R')}/>
      </div>
      <div className="card-container">
        {cards.display.map(({src, className}) => <img src={src} className={className} />)}
      </div>
    </div>
  );
};

export default LatetestCard;