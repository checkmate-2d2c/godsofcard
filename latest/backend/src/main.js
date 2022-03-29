import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv-defaults';
import cookies from 'cookie-parser';

import genRandomToken from './utils/genRandomToken';

import dbConnect from './databases/mongo';

import apiRoute from './route';
import adminApiRoute from './admin';

dotenv.config();

const app = express();
const adminApp = express();

const port = process.env.PORT || 4000;
const adminPort = process.env.ADMIN_PORT || 5000;

app.use(express.json());
app.use(cookies());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URI);
  res.header('Access-Control-Allow-Headers', 'Accept, Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Credentials', true);
  console.log(`${req.method} ${req.url}`);
  next();
})
app.use(session({
  secret: genRandomToken(32),
  name: 'session_id',
  saveUninitialized: false,
  resave: false
}));

app.use('/api', apiRoute);

app.listen(port, () =>
  console.log(`Godsofcard backend app listening on port ${port}!`),
);

adminApp.use(express.urlencoded({ extended: true }));
adminApp.use('/admin', adminApiRoute);
adminApp.listen(adminPort, () =>
  console.log(`Godsofcard admin app listening on port ${adminPort}!`),
);

dbConnect();