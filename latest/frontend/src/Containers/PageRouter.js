import { Routes, Route, useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import MainMenu from '../components/MainMenu';

function PageRouter() {
  const navigate = useNavigate();
  
  return (
    <>
      <NavigationBar navigate={navigate} />
      <Routes>
        <Route path="/" element={<MainMenu navigate={navigate} />} />
      </Routes>
      <Footer navigate={navigate} />
    </>
  );
}

export default PageRouter;