import axios from 'axios';

async function getAllNews() {
  const { data: { message, newsList } } = await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/news/all`,
    {}, 
    { withCredentials: true }
  );
  console.log(newsList);
  return message === 'success' ? newsList.reverse() : [];
}

async function getTargetNews({ id }) {
  const { data: { message, news } } = await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/news/${id}`,
    {}, 
    { withCredentials: true }
  );
  console.log(news);
  return message === 'success' ? news : null;
}

export { getAllNews, getTargetNews };