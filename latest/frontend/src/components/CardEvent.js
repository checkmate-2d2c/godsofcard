import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

const CardEvent = () => {
  return (
    <div className="cardevent">
      <div style={{color: 'white'}}><FontAwesomeIcon icon={faCalendar} />&nbsp;卡池 Card Event</div>
      <div className="arrow-container">
        <FontAwesomeIcon icon={faChevronUp} id="top-nav" />
        <br />
        <FontAwesomeIcon icon={faChevronDown} id="bottom-nav" />
      </div>
      <div className="card-event-container">
        <img src="" alt="" className="top" />
        <img src="" alt="" className="middle" />
        <img src="" alt="" className="bottom" />
      </div>
    </div>
  );
};

export default CardEvent;