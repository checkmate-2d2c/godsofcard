import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import MainMenu from '../components/MainMenu';
import oauth2 from '../utils/oauth2';
import { getCachedUser } from '../utils/user';

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function PageRouter() {
  const [userdata, setUserdata] = useState({
    user_id: null,
    username: null,
    avatar_hash: null,
    admin: false,
  });
  const query = useQuery();
  const navigate = useNavigate();

  useEffect(() => {
    (async() => {
      console.log('async side effect');
      if (query.get('action') === 'oauth2') {
        await oauth2({ 
          code: query.get('code'), 
          state: query.get('state')
        });
        navigate("/");
      }
      await getCachedUser({ userdata, setUserdata });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <>
      <NavigationBar navigate={navigate} userdata={userdata} />
      <Routes>
        <Route path="/" element={<MainMenu navigate={navigate} />} />
      </Routes>
      <Footer navigate={navigate} />
    </>
  );
}

export default PageRouter;