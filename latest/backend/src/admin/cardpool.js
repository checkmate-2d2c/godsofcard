import express from 'express';

import Card from '../models/card';
import CardPool from '../models/cardpool';

const router = express.Router();

router.get('/', async (req, res) => {
  const cardPools = await CardPool.find({}).populate('highlight_cards');
  const style = "display: flex; flex-direction: column; align-items: flex-start;";
  
  return res.send(`
    <h1>Card Pool</h1>
    <h2>Create</h2>
    <form action="/admin/cardpool/create" method="POST" style="${style}">
      <input type="text" placeholder="name" name="name"/>
      <input type="text" placeholder="description" name="description"/>
      <input type="text" placeholder="cost" name="cost"/>
      <input type="text" placeholder="limit" name="limit"/>
      <input type="text" placeholder="banner" name="banner"/>
      <div>Probability</div>
      <input type="text" placeholder="S" name="S"/>
      <input type="text" placeholder="A" name="A"/>
      <input type="text" placeholder="B" name="B"/>
      <input type="text" placeholder="C" name="C"/>
      <input type="text" placeholder="D" name="D"/>
      <div><a href="https://www.epochconverter.com/">Unix Timestamp</a></div>
      <input type="text" placeholder="start" name="start"/>
      <input type="text" placeholder="expire" name="expire"/>
      <select name="ten">
        <option value="">ten</option>
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <div>Highligh cards example: "id1,id2,id3"</div>
      <input type="text" placeholder="highlight_cards" name="highlight_cards"/>
      <input type="submit" value="create"/>
    </form>
    <h2>Update</h2>
    <form action="/admin/cardpool/update" method="POST" style="${style}">
      <input type="text" placeholder="_id" name="_id"/>
      <h4>Update values:</h4>
      <input type="text" placeholder="name" name="name"/>
      <input type="text" placeholder="description" name="description"/>
      <input type="text" placeholder="cost" name="cost"/>
      <input type="text" placeholder="limit" name="limit"/>
      <input type="text" placeholder="banner" name="banner"/>
      <div>Probability</div>
      <input type="text" placeholder="S" name="S"/>
      <input type="text" placeholder="A" name="A"/>
      <input type="text" placeholder="B" name="B"/>
      <input type="text" placeholder="C" name="C"/>
      <input type="text" placeholder="D" name="D"/>
      <div><a href="https://www.epochconverter.com/">Unix Timestamp</a></div>
      <input type="text" placeholder="start" name="start"/>
      <input type="text" placeholder="expire" name="expire"/>
      <select name="ten">
        <option value="">ten</option>
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
      <div>Highligh cards example: "id1,id2,id3"</div>
      <input type="text" placeholder="highlight_cards" name="highlight_cards"/>
      <input type="submit" value="update"/>
    </form>
    <h2>Delete</h2>
    <form action="/admin/cardpool/delete" method="POST" style="${style}">
      <input type="text" placeholder="_id" name="_id"/>
      <input type="submit" value="delete"/>
    </form>
    <h2>Read</h2>
    <pre>${JSON.stringify(cardPools, null, 2)}</pre>
  `);
});

router.post('/create', async (req, res) => {
  try {
    const body = req.body;
    body.probability = {};
    body.probability.S = body.S.length ? body.S : 0;
    body.probability.A = body.A.length ? body.A : 0;
    body.probability.B = body.B.length ? body.B : 0;
    body.probability.C = body.C.length ? body.C : 0;
    body.probability.D = body.D.length ? body.D : 0;
    delete body.S;
    delete body.A;
    delete body.B;
    delete body.C;
    delete body.D;
    if (body.highlight_cards.length !== 0) body.highlight_cards = body.highlight_cards.split(',');

    const cardPool = new CardPool(body);
    await cardPool.save();
  }
  catch (err) {
    console.error(err);
    return res.send('operation error');
  }
  return res.redirect('/admin/cardpool');
});

router.post('/update', async (req, res) => {
  try {
    const { _id, name, description, cost, limit, banner, S, A, B, C, D, start, expire, ten, highlight_cards } = req.body;
    const $set = { _id };
    if (name.length !== 0) $set.name = name;
    if (description.length !== 0) $set.description = description;
    if (cost.length !== 0) $set.cost = cost;
    if (limit.length !== 0) $set.limit = limit;
    if (banner.length !== 0) $set.banner = banner;
    if (S.length !== 0) $set['probability.S'] = S;
    if (A.length !== 0) $set['probability.A'] = A;
    if (B.length !== 0) $set['probability.B'] = B;
    if (C.length !== 0) $set['probability.C'] = C;
    if (D.length !== 0) $set['probability.D'] = D;
    if (start.length !== 0) $set.start = start;
    if (expire.length !== 0) $set.expire = expire;
    if (ten.length !== 0) $set.ten = ten === 'true' ? true : false;
    if (highlight_cards.length !== 0) $set.highlight_cards = highlight_cards.split(',');
    await CardPool.updateOne({ _id }, { $set });
  }
  catch (err) {
    console.error(err);
    return res.send('operation error');
  }
  return res.redirect('/admin/cardpool');
});

router.post('/delete', async (req, res) => {
  try {
    const { _id } = req.body;
    await CardPool.deleteOne({ _id });
  }
  catch (err) {
    console.error(err);
    return res.send('operation error');
  }
  return res.redirect('/admin/cardpool');
});

export default router;