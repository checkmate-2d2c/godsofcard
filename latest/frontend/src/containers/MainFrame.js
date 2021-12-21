import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import MainMenu from '../components/MainMenu';

function MainFrame({ navigate }) {
  const [userdata, setUserdata] = useState({
    user_id: null,
    username: null,
    avatar_hash: null,
    admin: false
  });
  
  return (
    <>
      <NavigationBar 
        navigate={navigate} 
        userdata={userdata} 
        setUserdata={setUserdata}
      />
      <Routes>
        <Route path="/" element={
          <MainMenu 
            navigate={navigate} 
            userdata={userdata} 
            setUserdata={setUserdata} 
          />} 
        />
      </Routes>
      <Footer navigate={navigate} />
    </>
  );
}

export default MainFrame;