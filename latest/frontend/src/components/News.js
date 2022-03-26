import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';

import { getAllNews } from '../ajax/news';

import '../static/styles/News.css';

function News(props) {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    (async() => { 
      setNewsList(await getAllNews());
      window.scrollTo(0, 0);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div id="news-top"/>
      <br />
      <div className="news-title">
          <h1>新聞</h1>
          <div></div>
      </div>
      <br />
      <div className="news-container">
        {newsList.map(({ _id, title, date }, index) => {
          const url = `/news/${_id}`;
          return (
            <button key={index} onClick={() => props.navigate(url)}>
              <div className="content">
                <div className="news-icon">
                  <FontAwesomeIcon icon={faBullhorn} />
                </div>
                <div className="title">
                  <h1>{title}</h1>
                  <span>{date}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <br/>
    </>
  );
}

export default News;