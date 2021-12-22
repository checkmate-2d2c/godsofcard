import { useEffect } from 'react';
import React from 'react';
import { useLocation } from 'react-router-dom';

import oauth2 from '../ajax/oauth2';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Oauth2Wrapper(props) {
  const query = useQuery();

  useEffect(() => {
    const code = query.get('code');
    const state = query.get('state');
    // console.log(code + ' ' + state);
    (async() => await oauth2({ navigate: props.navigate, code, state }))();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return null;
}

export default Oauth2Wrapper;