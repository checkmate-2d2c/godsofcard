import express from 'express';

import User from '../models/user';

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find({});
  const style = "display: flex; flex-direction: column; align-items: flex-start;";

  return res.send(`
    <h1>User</h1>
    <h2>Create</h2>
      <div>This behavior is controlled by Discord OAuth2.</div>
    <h2>Update</h2>
    <form action="/admin/user/update" method="POST" style="${style}">
      <input type="text" placeholder="_id" name="_id"/>
      <h4>Update values:</h4>
      <input type="text" placeholder="balance" name="balance"/>
      <div>Cards example: "id1,id2,id3"</div>
      <input type="text" placeholder="cards" name="cards"/>
      <input type="submit" value="update"/>
    </form>
    <h2>Delete</h2>
    <form action="/admin/user/delete" method="POST" style="${style}">
      <input type="text" placeholder="_id" name="_id"/>
      <input type="submit" value="delete"/>
    </form>
    <h2>Read</h2>
    <pre>${JSON.stringify(users, null, 2)}</pre>
  `);
});

router.post('/update', async (req, res) => {
  try {
    const { _id, balance, cards } = req.body;
    const $set = { _id };
    if (balance.length !== 0) $set.balance = balance;
    if (cards.length !== 0) $set.cards = cards.split(',');
    await User.updateOne({ _id }, { $set });
  }
  catch (err) {
    console.error(err);
    return res.send('operation error');
  }
  return res.redirect('/admin/user');
});

router.post('/delete', async (req, res) => {
  try {
    const { _id } = req.body;
    await User.deleteOne({ _id });
  }
  catch (err) {
    console.error(err);
    return res.send('operation error');
  }
  return res.redirect('/admin/user');
});

export default router;