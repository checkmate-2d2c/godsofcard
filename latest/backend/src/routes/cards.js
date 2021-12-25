import express from 'express';
import path from 'path';
import fs from 'fs';

import { getLink } from '../utils/googleDriveHandler';

const router = express.Router();

router.get('/all', (req, res) => {
  // This is a temporary solution. Data should be migrated to DB.
  try {
    const cardsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../jsons/cards_info.json")));
    let cardsList = cardsData.map((
      { name, drive_id, tier, anime }) => 
      ({ name, url: getLink(drive_id), tier, anime }));
    res.send({ message: 'success', cardsList });
  }
  catch(err) {
    res.status(404).send({ message: 'error' });
  }
});

export default router;