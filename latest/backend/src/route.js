import express from 'express';

import oauth2Route from './routes/oauth2';
import userRoute from './routes/user';
import newsRoute from './routes/news';

const router = express.Router();

router.use('/oauth2', oauth2Route);
router.use('/user', userRoute);
router.use('/news', newsRoute);

export default router;