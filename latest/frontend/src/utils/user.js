import axios from 'axios';

async function getCachedUser({ userdata, setUserdata}) {
  const { data: { login, data } } = await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/user`,
    { withCredentials: true });
  if (login === true) {
    const newUserdata = Object.assign({}, userdata, data);
    console.log(newUserdata);
    setUserdata(newUserdata);
  }
}

export { getCachedUser };