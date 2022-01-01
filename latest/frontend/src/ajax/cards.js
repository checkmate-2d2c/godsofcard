import axios from 'axios';

const getCardsPool = async() => {
  const { data: { message, cardsList, userBalance } } = await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/cards/pool`,
    { withCredentials: true }
  );
  cardsList.forEach(card => Object.assign(card, { selected: true }));
  console.log('debug');
  console.log(cardsList);
  console.log(userBalance);
  return message === 'success' ? { cardsList, userBalance } : { cardsList: [], userBalance: 0 };
};

const getCards = async(scope) => {
  if (scope !== 'all' && scope !== 'user') return [];
  const { data: { message, cardsList } } = await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/cards/${scope}`,
    { withCredentials: true }
  );
  cardsList.forEach(card => Object.assign(card, { selected: true }));
  return message === 'success' ? cardsList : [];
};

export { getCardsPool, getCards };