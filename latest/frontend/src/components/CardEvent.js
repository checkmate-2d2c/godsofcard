import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';

// import pngs, this should be optimized then
import event1 from '../static/images/cards/events/event1.png';
import event2 from '../static/images/cards/events/event2.png';

const eventUrls = [event1, event2];

function CardEvent() {
  const [events, setEvents] = useState({ display: [], index: null });
  const defaultDisplayClassNames = ['top', 'middle', 'bottom'];

  const setDefaultEvents = () => {
    for (let i = 1; i < 3; i++) {
      eventUrls[i] = eventUrls[i] === undefined ? eventUrls[i-1] : eventUrls[i];
    }

    const newDisplay = []
    defaultDisplayClassNames.forEach((value, index) => {
      newDisplay.push({ src: eventUrls[(index + eventUrls.length - 1) % eventUrls.length], className: value });
    });

    setEvents({ display: [...newDisplay], index: 0 });
  };

  const moveEvents = (direction) => {
    const moveDisplay = events.display.map(({ src, className }) => ({ src, className: `${className} move${direction}` }));
    const newIndex = direction === 'U' ? 
      (events.index + 1) % eventUrls.length :
      (events.index + eventUrls.length - 1) % eventUrls.length;
    const newDisplay = events.display.map((_, index) => ({ src: eventUrls[(newIndex + index + eventUrls.length - 1) % eventUrls.length], className: defaultDisplayClassNames[index]}));
    setEvents({ display: moveDisplay });
    
    setTimeout(() => {
      setEvents({ display: newDisplay, index: newIndex });
    }, 200);
  };

  useEffect(() => {
    setDefaultEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="cardevent">
        <div style={{color: 'white'}}><FontAwesomeIcon icon={faCalendar} />&nbsp;卡池 Card Event</div>
        <div className="arrow-container">
          <FontAwesomeIcon icon={faChevronUp} id="top-nav" onClick={() => moveEvents('U')} />
          <br />
          <FontAwesomeIcon icon={faChevronDown} id="bottom-nav" onClick={() => moveEvents('D')} />
        </div>
        <div className="card-event-container">
          {events.display.map(({ src, className }, index) => <img key={index} src={src} alt="" className={className} />)}
        </div>
      </div>
    </>
  );
}

export default CardEvent;