import express from 'express';

import animeRoute from './admin/anime';
import cardRoute from './admin/card';
import cardPoolRoute from './admin/cardpool';
import newsRoute from './admin/news';
import userRoute from './admin/user';
import latestCardRoute from './admin/latestcard';

const router = express.Router();

router.use('/anime', animeRoute);
router.use('/card', cardRoute);
router.use('/cardpool', cardPoolRoute);
router.use('/news', newsRoute);
router.use('/user', userRoute);
router.use('/latestcard', latestCardRoute);

export default router;