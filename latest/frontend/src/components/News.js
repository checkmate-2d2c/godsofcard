import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';

import { getAllNews } from '../ajax/news';

import '../static/styles/News.css';

function News() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    (async() => setNewsList(await getAllNews()))();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <br />
      <div className="news-title">
          <h1>新聞</h1>
          <div></div>
      </div>
      <br />
      <div className="news-container">
        {newsList.map(({ id, title, date }) => {
          const url = `/news/${id}`;
          return (
            <a href={url} style={{'text-decoration': 'none'}}>
              <div className="content">
                <div className="news-icon">
                  <FontAwesomeIcon icon={faBullhorn} />
                </div>
                <div className="title">
                  <h1>{title}</h1>
                  <span>{date}</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}

export default News;