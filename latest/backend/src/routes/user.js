import express from 'express';
import { encryptToken, decryptToken } from '../utils/userToken';
import SessionData from '../structs/sessionData';

import User from '../models/user';

const router = express.Router();

router.post('/login', (req, res) => {
  try {
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
          maxAge: 1000 * 60 * 60 * 24, // would expire after 1 day
          sameSite: 'lax',
          httpOnly: true,
          overwrite: true
        }
      )
      Object.assign(req.session, session_data);
      console.log('Retrieve session data success');
      return res.send({ login: true, data: session_data });
    }
  }
  catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'error' });
  }
});

router.post('/logout', (req, res) => {
  try {
    req.session.user_id = undefined;
    req.session.username = undefined;
    req.session.avatar_hash = undefined;
    res.clearCookie('user_token');
    return res.send({ message: 'success' });
  }
  catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'error' });
  }
});

router.get('/balance', async (req, res) => {
  try {
    if (req.cookies.user_token === undefined) {
      return res.status(404).send({ message: 'not login' });
    }
    const session_data = SessionData(decryptToken(req.cookies.user_token));
    const user = await User.findOne({ _id: session_data.user_id }).select({ balance: 1 });
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }

    return res.send({ message: 'success', balance: user.balance });
  }
  catch(err) {
    console.error(err);
    return res.status(500).send({ message: 'error' });
  }  
});


export default router;