import axios from 'axios';


async function oauth2({ navigate, code, state }) { 
  if (code === null || state !== localStorage.getItem('oauth2_state')) return;
  await axios.get(
    `${process.env.REACT_APP_BACKEND_API}/oauth2?code=${code}`,
    { withCredentials: true }
  );
  localStorage.removeItem('oauth2_state'); 
  navigate("/");
}

export default oauth2;