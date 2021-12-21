import express from 'express';

import oauth2Route from './routes/oauth2';
import userRoute from './routes/user';

const router = express.Router();

router.use('/oauth2', oauth2Route);
router.use('/user', userRoute);

export default router;