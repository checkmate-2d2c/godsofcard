import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv-defaults';
import cookies from 'cookie-parser';

import genRandomToken from './utils/genRandomToken';

import oauth2Route from './routes/oauth2';
import userRoute from './routes/user';

dotenv.config();

const app = express();
const port = process.env.PORT || 48763;

app.use(express.json());
app.use(cookies());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URI);
  res.header('Access-Control-Allow-Credentials', true);
  next();
})
app.use(session({
  secret: genRandomToken(32),
  name: 'session_id',
  saveUninitialized: false,
  resave: false
}));

app.use('/oauth2', oauth2Route);
app.use('/user', userRoute);

app.listen(port, () =>
  console.log(`Godsofcard backend app listening on port ${port}!`),
);
