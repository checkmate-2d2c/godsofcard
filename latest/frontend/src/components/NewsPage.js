import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faSatelliteDish } from '@fortawesome/free-solid-svg-icons';

import { getTargetNews } from '../ajax/news';

import '../static/styles/NewsPage.css';

function NewsPage(props) {
  const [news, setNews] = useState({ title: '', content: '', date: '' });
  const { id } = useParams();

  useEffect(() => {
    (async() => {
      setNews(await getTargetNews({ id }));
      console.log(news);
      window.scrollTo(0, 0);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <FontAwesomeIcon icon={faArrowAltCircleLeft} className="newspage-back-icon" onClick={() => props.navigate("/news")}/>
      <div style={{ width: '100%', height: '250px', border: 'white 1px solid' }} className="hide">

      </div>
      <br />
      <div className="newspage-title">
        <div>
          <h1><FontAwesomeIcon icon={faSatelliteDish} /> {news.title}</h1>
          <span>{news.date}</span>
        </div>
      </div>
      <div className="newspage-line"></div>
      <br />
      <div className="newspage-content">
        <p>{news.content}</p>
      </div>
      <br/>
    </>
  );
}

export default NewsPage;