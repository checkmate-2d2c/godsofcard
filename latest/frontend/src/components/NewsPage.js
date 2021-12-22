import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faSatelliteDish } from '@fortawesome/free-solid-svg-icons';

import { getTargetNews } from '../ajax/news';

import '../static/styles/News.css';

function NewsPage() {
  const [news, setNews] = useState({ title: '', content: '', date: '' });
  const { id } = useParams();

  useEffect(() => {
    (async() => {
      setNews(await getTargetNews({ id }));
      console.log(news);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <a href="/news"><FontAwesomeIcon icon={faArrowAltCircleLeft} id="back-icon" /></a>
      <div style={{ width: '100%', height: '250px', border: 'white 1px solid' }} class="hide">

      </div>
      <br />
      <div class="title">
        <div>
          <h1><FontAwesomeIcon icon={faSatelliteDish} />{news.title}</h1>
          <span>{news.date}</span>
        </div>
      </div>
      <div class="line"></div>
      <br />
      <div class="content">
        <p>{news.content}</p>
      </div>
    </>
  );
}

export default NewsPage;