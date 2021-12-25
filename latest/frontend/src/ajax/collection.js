import axios from 'axios';

const getAllCards = async() => {
  const { data: { message, cardsList } } = await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/cards/all`,
    {}, 
    { withCredentials: true }
  );
  cardsList.forEach(card => Object.assign(card, { selected: true }));
  return message === 'success' ? cardsList : [];
};

export { getAllCards };