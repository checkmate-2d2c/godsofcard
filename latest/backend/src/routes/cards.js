import express from 'express';

import SessionData from '../structs/sessionData';
import { decryptToken } from '../utils/userToken';
import User from '../models/user';
import Card from '../models/card';
import CardPool from '../models/cardpool';
import LatestCard from '../models/latestcard';

const router = express.Router();

router.get('/pool', async(req, res) => {
  try {
    let cardPools = await CardPool.find({}).populate('highlight_cards').lean();
    cardPools = cardPools.filter((cardPool) => {
      const now = Math.floor(Date.now() / 1000)
      return now >= cardPool.start && (cardPool.expire === 0 || now < cardPool.expire);
    });
    cardPools = cardPools.map((cardPool) => {
      cardPool.limit = cardPool.limit > 0; // this should be fixed to use DB.
      delete cardPool.start;
      delete cardPool.probability._id;
      return cardPool;
    });
    return res.send({ message: 'success', cardPools });
  }
  catch(err) {
    console.log(err);
    return res.status(500).send({ message: 'error' });
  }
});

router.get('/latest', async(req, res) => {
  try {
    const latestCards = await LatestCard.find({}).populate('card');
    return res.send({ message: 'success', latestCards });
  }
  catch(err) {
    console.log(err);
    return res.status(500).send({ message: 'error' });
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

    return res.send({ message: 'success', cards: user.cards });
  }
  catch(err) {
    return res.status(500).send({ message: 'error' });
  }
});

router.get('/all', async (_, res) => {
  try {
    const cards = await Card.find({}).populate('anime').lean();
    cards.forEach(card => card.anime = card.anime === null ? 'unknown' : card.anime.name);

    return res.send({ message: 'success', cards });
  }
  catch(err) {
    return res.status(500).send({ message: 'error' });
  }
});

export default router;