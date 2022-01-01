import express from 'express';
import path from 'path';
import fs from 'fs';

import SessionData from '../structs/sessionData';
import { decryptToken } from '../utils/userToken';
import { getLink } from '../utils/googleDriveHandler';
import { ClientData } from '../models/moneyData';
import { NormalOne } from '../models/playerInventory';

const router = express.Router();

router.get('/pool', async(req, res) => {
  // This is a temporary solution. Data should be migrated to DB.
  console.log(req.cookies);
  if (req.cookies.user_token === undefined) {
    return res.status(404).send({ message: 'not login' });
  }
  const session_data = SessionData(decryptToken(req.cookies.user_token));
  try {
    const clientData = await ClientData.findOne({ _id: session_data.user_id });
    const userBalance = clientData === null ? 0 : clientData.money; // this should be fixed to return error.
    let cardsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../jsons/card_pool.json")));
    cardsData = cardsData.filter((card) => {
      const now = Date.now();
      return now >= card.start && (card.expire === 0 || now < card.expire);
    });
    cardsData = cardsData.map((card) => {
      card.limit = card.limit > 0; // this should be fixed to use DB.
      delete card.id;
      delete card.start;
      return card;
    });
    res.send({ message: 'success', cardsList: cardsData, userBalance });
  }
  catch(err) {
    console.log(err);
    res.status(500).send({ message: 'error' });
  }
});

router.get('/user', async(req, res) => {
  // This is a temporary solution. Data should be migrated to DB.
  if (req.cookies.user_token === undefined) {
    return res.status(404).send({ message: 'not login' });
  }
  const session_data = SessionData(decryptToken(req.cookies.user_token));
  try {
    const cardsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../jsons/cards_info.json")));
    const userCardsData = await NormalOne.findOne({ _id: session_data.user_id });
    if (userCardsData === null) {
      return res.status(404).send({ message: 'error' });
    }
    const cardsList = userCardsData.map(({ card_id }) => {
      const { name, drive_id, tier, anime } = cardsData[card_id];
      return { name, url: getLink(drive_id), tier, anime };
    });
    res.send({ message: 'success', cardsList });
  }
  catch(err) {
    res.status(500).send({ message: 'error' });
  }
});

router.get('/all', (_, res) => {
  // This is a temporary solution. Data should be migrated to DB.
  try {
    const cardsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../jsons/cards_info.json")));
    let cardsList = cardsData.map((
      { name, drive_id, tier, anime }) => 
      ({ name, url: getLink(drive_id), tier, anime }));
    res.send({ message: 'success', cardsList });
  }
  catch(err) {
    res.status(500).send({ message: 'error' });
  }
});

export default router;