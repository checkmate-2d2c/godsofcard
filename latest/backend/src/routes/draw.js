import express from 'express';

import SessionData from '../structs/sessionData';
import { decryptToken } from '../utils/userToken';
import User from '../models/user';
import Card from '../models/card';
import CardPool from '../models/cardpool';
import LatestCard from '../models/latestcard';

const router = express.Router();

router.post('/', async(req, res) => {
  try {
    if (req.cookies.user_token === undefined) {
      return res.status(404).send({ message: 'not login' });
    }
    const session_data = SessionData(decryptToken(req.cookies.user_token));

    const user = await User.findOne({ _id: session_data.user_id });
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }

    const { amount, cardPoolId } = req.body;

    if (![1, 10].includes(amount)) {
      return res.status(401).send({ message: 'invalid amount' });
    }

    const cardPool = await CardPool.findOne({ _id: cardPoolId }).lean();
    if (!cardPool) {
      return res.status(401).send({ message: 'invalid cardpool' });
    }
    else if (amount === 10 && cardPool.ten === false) {
      return res.status(401).send({ message: 'invalid amount' });
    }

    if (user.balance < cardPool.cost * amount) {
      return res.status(403).send({ message: 'not enough balance' });
    }

    const tiers = ['D', 'C', 'B', 'A', 'S'];
    const distribution = tiers.map(_ => 0);
    Object.keys(cardPool.probability).forEach(value => {
      const tier_index = tiers.indexOf(value);
      if (tier_index !== -1) {
        distribution[tier_index] = cardPool.probability[value];
      }
    });

    const cardPools = [];
    for (let i = 0; i < tiers.length; i++) {
      const tier = tiers[i];
      const cards = await Card.find({ tier }).select('_id');
      cardPools.push(cards.map(({ _id }) => _id));
    }
    
    const totalDistribution = distribution.reduce((a, b) => a + b);
    const samples = [];
    let cards = [];
    for (let i = 0; i < amount; i++) {
      const sample = Math.floor(Math.random() * totalDistribution);
      samples.push(sample);
    }
    for (let i = 1; i < distribution.length; i++) {
      distribution[i] += distribution[i-1];
    }
    samples.forEach(sample => {
      let tier_index = undefined;
      for (let i = 0; i < distribution.length; i++) {
        if (sample < distribution[i]) {
          tier_index = i;
          break;
        }
      }
      const card_index = Math.floor(Math.random() * cardPools[tier_index].length);
      cards.push(cardPools[tier_index][card_index]);
    });

    const { modifiedCount } = await User.updateOne({ 
      _id: user._id
    }, 
    {
      $inc: { balance: -cardPool.cost * amount },
      $push: { cards }
    });
    if (!modifiedCount) {
      return res.status(403).send({ message: 'internal error' });
    }

    for (let i = 0 ; i < cards.length; i++) {
      cards[i] = await Card.findOne({ _id: cards[i] });
    }

    return res.send({ message: 'success', cards });
  }
  catch(err) {
    console.error(err);
    return res.status(500).send({ message: 'error' });
  }
});

export default router;