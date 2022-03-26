import axios from 'axios';

const getCardPools = async() => {
  const { data: { message, cardPools } } = await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/cards/pool`,
    { withCredentials: true }
  );
  return message === 'success' ? cardPools: [];
};

const getCards = async(scope) => {
  if (scope !== 'all' && scope !== 'user') return [];
  const { data: { message, cards } } = await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/cards/${scope}`,
    { withCredentials: true }
  );
  return message === 'success' ? cards : [];
};

export { getCardPools, getCards };