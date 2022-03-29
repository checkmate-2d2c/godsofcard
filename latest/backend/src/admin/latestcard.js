import express from 'express';

import Card from '../models/card';
import LatestCard from '../models/latestcard';

const router = express.Router();

router.get('/', async (req, res) => {
  const latestcards = await LatestCard.find({}).populate('card');
  const cards = await Card.find({});
  const style = "display: flex; flex-direction: column; align-items: flex-start;";

  const cardDOM = ['<option value="">card</option>'].concat(cards.map(card => `<option value="${card._id}">${card._id} ${card.name}</option>`));
  
  return res.send(`
    <h1>Card</h1>
    <h2>Create</h2>
    <form action="/admin/latestcard/create" method="POST" style="${style}">
      <select name="card">
        ${cardDOM.join('')}
      </select>
      <input type="submit" value="create"/>
    </form>
    <h2>Update</h2>
    <form action="/admin/latestcard/update" method="POST" style="${style}">
      <input type="text" placeholder="_id" name="_id"/>
      <h4>Update values:</h4>
      <select name="card">
        ${cardDOM.join('')}
      </select>
      <input type="submit" value="update"/>
    </form>
    <h2>Delete</h2>
    <form action="/admin/latestcard/delete" method="POST" style="${style}">
      <input type="text" placeholder="_id" name="_id"/>
      <input type="submit" value="delete"/>
    </form>
    <h2>Read</h2>
    <pre>${JSON.stringify(latestcards, null, 2)}</pre>
  `);
});

router.post('/create', async (req, res) => {
  try {
    const latestcard = new LatestCard(req.body);
    await latestcard.save();
  }
  catch (err) {
    console.error(err);
    return res.send('operation error');
  }
  return res.redirect('/admin/latestcard');
});

router.post('/update', async (req, res) => {
  try {
    const { _id, card } = req.body;
    const $set = { _id };
    if (card.length !== 0) $set.card = card;
    await LatestCard.updateOne({ _id }, { $set });
  }
  catch (err) {
    console.error(err);
    return res.send('operation error');
  }
  return res.redirect('/admin/latestcard');
});

router.post('/delete', async (req, res) => {
  try {
    const { _id } = req.body;
    await LatestCard.deleteOne({ _id });
  }
  catch (err) {
    console.error(err);
    return res.send('operation error');
  }
  return res.redirect('/admin/latestcard');
});

export default router;