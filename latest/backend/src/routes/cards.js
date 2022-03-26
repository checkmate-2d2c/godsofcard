import express from 'express';

import SessionData from '../structs/sessionData';
import { decryptToken } from '../utils/userToken';
import { getLink } from '../utils/googleDriveHandler';
import User from '../models/user';
import Card from '../models/card';
import CardPool from '../models/cardpool';

const router = express.Router();

router.get('/pool', async(req, res) => {
  if (req.cookies.user_token === undefined) {
    return res.status(404).send({ message: 'not login' });
  }
  try {
    let cardPools = await CardPool.find({}).populate('highlight_cards');
    cardPools = cardPools.filter((cardPool) => {
      const now = Date.now();
      return now >= cardPool.start && (cardPool.expire === 0 || now < cardPool.expire);
    });
    cardPools = cardPools.map((cardPool) => {
      cardPool.limit = cardPool.limit > 0; // this should be fixed to use DB.
      delete cardPool._id;
      delete cardPool.start;
      return cardPool;
    });
    res.send({ message: 'success', cardPools });
  }
  catch(err) {
    console.log(err);
    res.status(500).send({ message: 'error' });
  }
});

router.get('/user', async(req, res) => {
  if (req.cookies.user_token === undefined) {
    return res.status(404).send({ message: 'not login' });
  }
  const session_data = SessionData(decryptToken(req.cookies.user_token));
  try {
    const user = await User.findOne({ _id: session_data.user_id }).populate({
      path: 'cards',
      populate: {
        path: 'anime'
      }
    });
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }

    res.send({ message: 'success', cards: user.cards });
  }
  catch(err) {
    res.status(500).send({ message: 'error' });
  }
});

router.get('/all', async (_, res) => {
  // This is a temporary solution. Data should be migrated to DB.
  try {
    const cards = await Card.find({}).populate('anime').lean();
    cards.forEach(card => card.anime = card.anime === null ? 'unknown' : card.anime.name);

    res.send({ message: 'success', cards });
  }
  catch(err) {
    res.status(500).send({ message: 'error' });
  }
});

export default router;