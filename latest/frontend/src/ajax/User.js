import axios from 'axios';
import { useEffect } from 'react';

function GetCachedUser({ userdata, setUserdata }) {
  useEffect(() => {
    (async() => {
      const { data: { login, data } } = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/user`,
        { withCredentials: true }
      );
      if (login === true) {
        const newUserdata = Object.assign({}, userdata, data);
        console.log(newUserdata);
        setUserdata(newUserdata);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return null;
}

export { GetCachedUser };