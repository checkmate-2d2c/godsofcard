import axios from 'axios';

const getCardPools = async() => {
  const { data: { message, cardPools } } = await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/cards/pool`
  );
  return message === 'success' ? cardPools: [];
};

const getLatestCards = async () => {
  const { data: { message, latestCards } } = await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/cards/latest`
  );
  console.log(latestCards);
  return message === 'success' ? latestCards: [];
}

const getCards = async(scope) => {
  if (scope !== 'all' && scope !== 'user') return [];
  const { data: { message, cards } } = await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/cards/${scope}`,
    scope === 'user' ? { withCredentials: true } : {}
  );
  return message === 'success' ? cards : [];
};

export { getCardPools, getLatestCards, getCards };