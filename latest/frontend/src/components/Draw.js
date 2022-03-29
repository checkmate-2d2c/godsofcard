import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { getCardPools } from '../ajax/cards';
import { getBalance } from '../ajax/user';
import { drawCard } from '../ajax/draw';

import '../static/styles/Draw.css';

function Draw({ userdata }) {
  const [cardPools, setCardPools] = useState([]);
  const [cardPoolIndex, setCardPoolIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [balance, setBalance] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [animeDisplayCardTimeout, setAnimeDisplayCardTimeout] = useState();
  const [animeDisplayCardHidden, setAnimeDisplayCardHidden] = useState(true);
  const [animeDisplaySingleCard, setAnimeDisplaySingleCard] = useState(null);
  const [animeDisplayTenCards, setAnimeDisplayTenCards] = useState([]);
  const [animeClass, setAnimeClass] = useState('video-container hide');
  const animeRef = useRef();

  useEffect(() => {
    (async() => {
      setCardPools(await getCardPools());
      setBalance(await getBalance());
      window.scrollTo(0, 0);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCardPoolChange = (index) => {
    if (index === cardPoolIndex) return;
    setCardPoolIndex(index);
    setLoaded(false);
  }
  
  const setCardPoolDuration = (index) => {
    let ts = cardPools[index].expire;
    let duration = undefined;
    if (ts === 0) duration = '永久';
    else {
      const now = Math.floor(Date.now() / 1000);
      if (ts < now) duration = '已結束';
      else {
        ts -= now;
        const days = Math.floor(ts / 86400);
        ts %= 86400;
        const hours = Math.floor(ts / 3600);
        ts %= 3600;
        const minutes = Math.floor(ts / 60);
        duration = (days ? `${days}天` : '') + (hours ? `${hours}小時` : '') + (minutes ? `${minutes}分鐘` : '')
      }
    }
    return duration;
  }

  const setCardPoolInfo = (index) => {
    return (
      <>
        <h3>{cardPools[index].name}</h3>
        <p>{cardPools[index].description}</p>
        {Object.keys(cardPools[index].probability).map((tier, index2) => 
          <p key={index2}>{tier}級卡牌 : {cardPools[index].probability[tier]}%</p>
        )}
      </>
    );
  }

  const handleDrawCard = async ({ amount, cardPoolId }) => {
    animeRef.current.play();
    const cards = await drawCard({ amount, cardPoolId });
    setBalance(await getBalance());
    console.log(cards);
    if (cards.length) {
      setAnimeClass('video-container');
      if (cards.length === 1) {
        setAnimeDisplaySingleCard(cards[0]);
      }
      else if (cards.length === 10) {
        setAnimeDisplayTenCards(cards);
      }
      animeRef.current.play();
      setAnimeDisplayCardTimeout(setTimeout(() => {
        setAnimeDisplayCardHidden(false);
      }, 5000));
    }
  };

  const handleSkip = () => {
    setAnimeClass('video-container hide');
    if (animeDisplayCardTimeout) {
      animeRef.current.pause();
      animeRef.current.currentTime = 0;
      clearTimeout(animeDisplayCardTimeout);
      setAnimeDisplayCardTimeout(null);
      setAnimeDisplaySingleCard(null);
      setAnimeDisplayTenCards([]);
      setAnimeDisplayCardHidden(true);
    }
  };

  return (
    <>
      {!userdata.user_id ? null : (
        <div className="draw-background-wrapper">
          <div className={animeClass} onClick={handleSkip}>
            <video preload="auto" ref={animeRef}>
              <source src="https://drive.google.com/uc?id=1VNSXQPCWpSEWVdSZVvhrKaJnFVwSMGAF" />
            </video>
            <h5 style={{ color: 'silver', zIndex: 201, position: 'absolute', top: '10px', right: '10px' }}>Click anywhere to skip...</h5>
            {!animeDisplaySingleCard ? null : (
              <div className="draw-anime-card-wrapper-single">
                <div className="draw-img-wrapper" id="draw-dummy-div" />
                <div className="draw-img-wrapper">
                  <img src={animeDisplaySingleCard.url} alt={animeDisplaySingleCard._id} className={animeDisplayCardHidden ? "hide" : null} />
                </div>
              </div>
            )}
            {!animeDisplayTenCards.length ? null : (
              <div className="draw-anime-card-wrapper-ten">
                {animeDisplayTenCards.map((card, index) => (
                  <div key={index} className="draw-img-wrapper">
                    <img src={card.url} alt={card._id} className={animeDisplayCardHidden ? "hide" : null} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div id="content-container" className="">
            <p style={{ color: 'white', right: '10px', position: 'absolute', marginTop: '10px' }} id="remaining">剩餘點數: {balance}pt</p>
            <div style={{ width: '100%', textAlign: 'center', color: 'white' }}>
              <h3>抽牌活動</h3>
              <div style={{ width: '10%', border: 'white 2px solid', margin: 'auto'}}></div>
            </div>

            <div className="draw-content-container">
              <div className="events">
                {cardPools.map(({ banner }, index) => { return <img key={index} src={banner} alt="" className="draw-cardpoolbanner" onClick={() => handleCardPoolChange(index)}/> ; })}
              </div>
              <div className="cd-container" style={loaded ? null : { visibility: 'hidden' }}>
                <br />
                <div className="event_card_display">
                  <div className="arrow-container">
                    <FontAwesomeIcon icon={faChevronLeft} id="left-nav" onClick={() => setCardIndex((cardIndex + cardPools[cardPoolIndex].highlight_cards.length - 1) % cardPools[cardPoolIndex].highlight_cards.length)} />
                    {!cardPools.length ? null : (
                      <>
                        {cardPools[cardPoolIndex].highlight_cards.map((card, index) => (
                          <img key={index} src={card.url} alt="Loading" style={cardIndex === index ? null : { display: 'none' }} onLoad={() => setLoaded(true)} />
                        ))}
                      </>
                    )}
                    <FontAwesomeIcon icon={faChevronRight} id="right-nav" onClick={() => setCardIndex((cardIndex + 1) % cardPools[cardPoolIndex].highlight_cards.length)} />
                  </div>
                </div>
                <br />
                <div className="eventdate">
                  <p>活動限期：{cardPools.length ? setCardPoolDuration(cardPoolIndex) : null}</p>
                </div>
              </div>
          
              <div className="sb-container">
                <div className="sb-container-inner">
                  <br /><br /><br />
                  <div style={{ color: 'white'}} className="probability-container">
                    {cardPools.length ? setCardPoolInfo(cardPoolIndex) : null}
                  </div>
                  <div className="draw-button" style={cardPools.length ? null : { visibility: 'hidden' }}>
                    <button id="single-draw" onClick={() => handleDrawCard({ amount: 1, cardPoolId: cardPools[cardPoolIndex]._id })}>單抽</button>
                    <button id="ten-draw" className={(cardPools.length && cardPools[cardPoolIndex].ten) ? null : "hide"} onClick={() => handleDrawCard({ amount: 10, cardPoolId: cardPools[cardPoolIndex]._id })}>十連抽</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br/>
        </div>
      )}
    </>
  );
}

export default Draw;