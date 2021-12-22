import { Route, Routes, useNavigate } from 'react-router-dom';

import MainFrame from './MainFrame';
import Oauth2Wrapper from '../components/Oauth2Wrapper';

function PageRouter() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/*" element={<MainFrame navigate={navigate} />} />
      <Route path="/oauth2" element={<Oauth2Wrapper navigate={navigate} />} />
    </Routes>
  );
}

export default PageRouter;