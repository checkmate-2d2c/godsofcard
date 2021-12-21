import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Oauth2({ navigate }) {
  const query = useQuery();
  const code = query.get('code');
  const state = query.get('state');

  useEffect(() => {
    console.log('oauth2 side effect');
    console.log(code + ' ' + state);
    (async() => {
      if (code === null || state !== localStorage.getItem('oauth2_state')) return;
      await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/oauth2?code=${code}`,
        { withCredentials: true }
      );
      localStorage.removeItem('oauth2_state'); 
      navigate("/");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return null;
}

export default Oauth2;