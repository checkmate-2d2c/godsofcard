import express from 'express';

import Anime from '../models/anime';
import Card, { CardTierList } from '../models/card';

const router = express.Router();

router.get('/', async (req, res) => {
  const cards = await Card.find({}).populate('anime');
  const animes = await Anime.find({});
  const style = "display: flex; flex-direction: column; align-items: flex-start;";

  const animeDOM = ['<option value="">anime</option>'].concat(animes.map(anime => `<option value="${anime._id}">${anime.name}</option>`));
  const tierDOM = ['<option value="">tier</option>'].concat(CardTierList.map(tier => `<option value="${tier}">${tier}</option>`));
  
  return res.send(`
    <h1>Card</h1>
    <h2>Create</h2>
    <form action="/admin/card/create" method="POST" style="${style}">
      <input type="text" placeholder="_id" name="_id"/>
      <input type="text" placeholder="name" name="name"/>
      <input type="text" placeholder="url" name="url"/>
      <select name="tier">
        ${tierDOM.join('')}
      </select>
      <select name="anime">
        ${animeDOM.join('')}
      </select>
      <div>Stats example: "10" or "10,20,30" or ""</div>
      <input type="text" placeholder="hp" name="hp"/>
      <input type="text" placeholder="str" name="str"/>
      <input type="text" placeholder="def" name="def"/>
      <input type="text" placeholder="agi" name="agi"/>
      <input type="submit" value="create"/>
    </form>
    <h2>Update</h2>
    <form action="/admin/card/update" method="POST" style="${style}">
      <input type="text" placeholder="_id" name="_id"/>
      <h4>Update values:</h4>
      <input type="text" placeholder="name" name="name"/>
      <input type="text" placeholder="url" name="url"/>
      <select name="tier">
        ${tierDOM.join('')}
      </select>
      <select name="anime">
        ${animeDOM.join('')}
      </select>
      <div>Stats example: "10" or "10,20,30" or ""</div>
      <input type="text" placeholder="hp" name="hp"/>
      <input type="text" placeholder="str" name="str"/>
      <input type="text" placeholder="def" name="def"/>
      <input type="text" placeholder="agi" name="agi"/>
      <input type="submit" value="update"/>
    </form>
    <h2>Delete</h2>
    <form action="/admin/card/delete" method="POST" style="${style}">
      <input type="text" placeholder="_id" name="_id"/>
      <input type="submit" value="delete"/>
    </form>
    <h2>Read</h2>
    <pre>${JSON.stringify(cards, null, 2)}</pre>
  `);
});

router.post('/create', async (req, res) => {
  console.log(req.body);
  try {
    const body = req.body;
    body.stats = {};
    if (body.hp.length !== 0) body.stats.hp = body.hp.split(',');
    if (body.str.length !== 0) body.stats.str = body.str.split(',');
    if (body.def.length !== 0) body.stats.def = body.def.split(',');
    if (body.agi.length !== 0) body.stats.agi = body.agi.split(',');

    const card = new Card(body);
    await card.save();
  }
  catch (err) {
    console.error(err);
    return res.send('operation error');
  }
  return res.redirect('/admin/card');
});

router.post('/update', async (req, res) => {
  try {
    const { _id, name, url, tier, anime, hp, str, def, agi } = req.body;
    const $set = { _id };
    if (name.length !== 0) $set.name = name;
    if (url.length !== 0) $set.url = url;
    if (tier.length !== 0) $set.tier = tier;
    if (anime.length !== 0) $set.anime = anime;
    if (hp.length !== 0) $set['stats.hp'] = hp.split(',');
    if (str.length !== 0) $set['stats.str'] = str.split(',');
    if (def.length !== 0) $set['stats.def'] = def.split(',');
    if (agi.length !== 0) $set['stats.agi'] = agi.split(',');
    await Card.updateOne({ _id }, { $set });
  }
  catch (err) {
    console.error(err);
    return res.send('operation error');
  }
  return res.redirect('/admin/card');
});

router.post('/delete', async (req, res) => {
  try {
    const { _id } = req.body;
    await Card.deleteOne({ _id });
  }
  catch (err) {
    console.error(err);
    return res.send('operation error');
  }
  return res.redirect('/admin/card');
});

export default router;