import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import MainMenu from '../components/MainMenu';
import News from '../components/News';
import NewsPage from '../components/NewsPage';
import Community from '../components/Community';
import Support from '../components/Support';

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
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsPage navigate={navigate} />} />
        <Route path="/community" element={<Community />} />
        <Route path="/support" element={<Support />} />
      </Routes>
      <Footer navigate={navigate} />
    </>
  );
}

export default MainFrame;