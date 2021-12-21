import axios from 'axios';
import { useEffect } from 'react';

function Login({ userdata, setUserdata }) {
  useEffect(() => {
    (async() => {
      const { data: { logined, data } } = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/user/login`,
        {}, 
        { withCredentials: true }
      );
      if (logined === true) {
        const newUserdata = Object.assign({}, userdata, data);
        console.log(newUserdata);
        setUserdata(newUserdata);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return null;
}

async function Logout({ navigate, setUserdata }) {
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
}

export { Login, Logout };