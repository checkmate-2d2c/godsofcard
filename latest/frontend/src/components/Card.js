import { useEffect, useState } from 'react';

import { getCardsPool } from '../ajax/cards';

import '../static/styles/Card.css';

function Card() {
  const [cardsList, setCardsList] = useState([]);
  const [userBalance, setUserBalance] = useState(0);

  const loadImage = async(imageName) => {
    return await import(`../static/images/cards/events/${imageName}`);
  };

  useEffect(() => {
    (async() => {
      const cardsPool = await getCardsPool();
      cardsPool.cardsList = cardsPool.cardsList.map(async(card) => {
        card.image = await loadImage(card.banner);
        return card;
      });
      console.log(cardsPool);
      setCardsList(cardsPool.cardsList);
      setUserBalance(cardsPool.userBalance);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="loading hide">
        <h1>Loading</h1>
      </div>
      <div id="content-container" className="">
        <p style={{ color: 'white', right: '10px', position: 'absolute', marginTop: '10px' }} id="remaining">剩餘點數: {userBalance}pt</p>
        <div style={{ width: '100%', textAlign: 'center', color: 'white' }}>
          <h3>抽牌活動</h3>
          <div style={{ width: '10%', border: 'white 2px solid', margin: 'auto'}}></div>
        </div>

        <div className="content-container">
          <div className="events">
            {cardsList.map((card, index) => { return <img key={index} src={card.banner} alt="" /> ; })}
          </div>
          <div className="cd-container">
            <br />
            <div className="event_card_display">
              <div className="arrow-container">
                <i className="fas fa-chevron-left" id="left-nav"></i>
                <i className="fas fa-chevron-right" id="right-nav"></i>
              </div>
              <h2>Loading</h2>
              <img src="" alt="Loading" className="" />
            </div>
            <br />
            <div className="eventdate">
              <p></p>
            </div>
          </div>
      
          <div className="sb-container">
              <div style={{ color: 'white'}} className="probability-container">
              </div>
              <div className="draw-button">
                  <button id="single-draw">單抽</button>
                  <button id="ten-draw" className="hide">十連抽</button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;