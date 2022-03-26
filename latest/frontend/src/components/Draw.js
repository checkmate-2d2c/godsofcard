import { useEffect, useState } from 'react';

import { getCardPools } from '../ajax/cards';
import { getBalance } from '../ajax/user';

import '../static/styles/Draw.css';

function Draw() {
  const [cardPools, setCardPools] = useState([]);
  const [cardPoolIndex, setCardPoolIndex] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    (async() => {
      setCardPools(await getCardPools());
      setBalance(await getBalance());
      window.scrollTo(0, 0);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="draw-background-wrapper">
      <div className="loading hide">
        <h1>Loading</h1>
      </div>
      <div id="content-container" className="">
        <p style={{ color: 'white', right: '10px', position: 'absolute', marginTop: '10px' }} id="remaining">剩餘點數: {balance}pt</p>
        <div style={{ width: '100%', textAlign: 'center', color: 'white' }}>
          <h3>抽牌活動</h3>
          <div style={{ width: '10%', border: 'white 2px solid', margin: 'auto'}}></div>
        </div>

        <div className="content-container">
          <div className="events">
            {cardPools.map(({ banner }, index) => { return <img key={index} src={banner} alt="" /> ; })}
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
      <br/>
    </div>
  );
}

export default Draw;