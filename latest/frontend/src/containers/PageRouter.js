import { Route, Routes, useNavigate } from 'react-router-dom';

import Oauth2 from '../ajax/Oauth2';
import MainFrame from './MainFrame';

function PageRouter() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<MainFrame navigate={navigate} />} />
      <Route path="/oauth2" element={<Oauth2 navigate={navigate} />} />
    </Routes>
  );
}

export default PageRouter;