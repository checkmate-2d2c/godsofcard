import express from 'express';
import path from 'path';
import fs from 'fs';

import News from '../models/news';

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const newsList = await News.find({});
    res.send({ message: 'success', newsList });
  }
  catch(err) {
    res.status(404).send({ message: 'error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const newsId = req.params.id;
    const news = await News.findOne({ _id: newsId });
    if (!news) {
      return res.status(404).send({ message: 'news not found' });
    }
    return res.send({ message: 'success', news });
  }
  catch(err) {
    res.status(404).send({ message: 'error' });
  }
});

export default router;