import axios from "axios";

const drawCard = async ({ amount, cardPoolId }) => {
  const { data: { message, cards } } = await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/draw/`,
    { amount, cardPoolId },
    { withCredentials: true }
  ).catch(err => {
    if (err.response) {
      console.log(err.response);
      return err.response;
    }
    return { data: {} };
  });

  if (message !== 'success') {
    alert(message);
    return [];
  }
  return cards;
};

export { drawCard };