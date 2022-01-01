import express from 'express';
import { encryptToken, decryptToken } from '../utils/userToken';
import SessionData from '../structs/sessionData';

const router = express.Router();

router.post('/login', (req, res) => {
  if (req.cookies.user_token === undefined) {
    return res.send({ login: false });
  }
  const session_data = SessionData(decryptToken(req.cookies.user_token));
  if (session_data === null) {
    return res.send({ login: false });
  }
  else {
    const new_user_token = encryptToken(session_data);
    res.cookie(
      'user_token',
      new_user_token,
      {
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        sameSite: 'none',
        secure: true,
        overwrite: true
      }
    )
    Object.assign(req.session, session_data);
    console.log('Retrieve session data success');
    res.send({ login: true, data: session_data });
  }
});

router.post('/logout', (req, res) => {
  req.session.user_id = undefined
  req.session.username = undefined
  req.session.avatar_hash = undefined
  res.clearCookie('user_token');
  res.send({ message: 'success' });
});


export default router;