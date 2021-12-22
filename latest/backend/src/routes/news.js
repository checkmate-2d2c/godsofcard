import express from 'express';
import path from 'path';
import fs from 'fs';

const router = express.Router();

router.get('/all', (req, res) => {
  // This is a temporary solution. Data should be migrated to DB.
  try {
    const newsList = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../jsons/news.json")));
    res.send({ message: 'success', newsList });
  }
  catch(err) {
    res.status(404).send({ message: 'error' });
  }
});

router.get('/:id', (req, res) => {
  // This is a temporary solution. Data should be migrated to DB.
  const newsId = req.params.id;
  try {
    const newsList = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../jsons/news.json")));
    const news = newsList.find(({ id }) => id === newsId);
    if (news !== undefined) {
      return res.send({ message: 'success', news });
    }
  }
  catch(err) {}
  res.status(404).send({ message: 'error' });
});

export default router;