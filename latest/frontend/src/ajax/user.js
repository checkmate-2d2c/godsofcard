import axios from 'axios';

const Login = async({ userdata, setUserdata }) => {
  const { data: { login, data } } = await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/user/login`,
    {}, 
    { withCredentials: true }
  );
  if (login === true) {
    const newUserdata = Object.assign({}, userdata, data);
    console.log(newUserdata);
    setUserdata(newUserdata);
  }
};

const Logout = async({ navigate, setUserdata }) => {
  await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/user/logout`,
    {},
    { withCredentials: true }
  );
  setUserdata({
    user_id: null,
    username: null,
    avatar_hash: null,
    admin: false
  });
  navigate("/");
};

const getBalance = async() => {
  const { data: { message, balance } } = await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/user/balance`,
    { withCredentials: true }
  );
  return message === 'success' ? balance : 0;
};

export { Login, Logout, getBalance };