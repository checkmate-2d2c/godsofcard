import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv-defaults';
import { encryptToken } from '../utils/userToken';
import SessionData from '../structs/sessionData';
import User from '../models/user';

dotenv.config();

const router = express.Router();
const redirect_uri = process.env.REDIRECT_URI;
const discordTokenAPI = "https://discord.com/api/oauth2/token";
const discordUserAPI = "https://discord.com/api/users/@me";

async function getDiscordUser(code) {
  let discordUser = null;
  await axios.post(
    discordTokenAPI, 
    new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri,
      scope: 'identify',
    }), 
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  ).then(async({ data }) => {
    return await axios.get(
      discordUserAPI,
      { headers: { authorization: `${data.token_type} ${data.access_token}` } }
    ).then(({ data }) => discordUser = data).catch((err) => {
      console.log('Discord oauth2 failed: get userdata error');
      console.log(err.response.data);
    });
  }).catch((err) => {
    console.log('Discord oauth2 failed: get discord token error');
    console.log(err.response.data);
  });
  return discordUser;
}

router.get('/', async(req, res) => {
  const discordUser = await getDiscordUser(req.query.code);
  if (discordUser === null) {
    return res.status(403).send({ message: 'error' });
  }
  const session_data = SessionData({
    user_id: discordUser.id,
    username: `${discordUser.username}#${discordUser.discriminator}`,
    avatar_hash: discordUser.avatar
  });
  const user_token = encryptToken(session_data);
  res.cookie(
    'user_token', 
    user_token, 
    {
      maxAge: 1000 * 60 * 15, // would expire after 15 minutes
      sameSite: 'lax'
    }
  );
  Object.assign(req.session, session_data);
  console.log('Discord oauth2 success');

  try {
    const user = new User({ _id: session_data.user_id });
    await user.save();
  }
  catch (err) {
    console.log('user already exists');
  }

  res.send({ message: 'success' });
});

export default router;