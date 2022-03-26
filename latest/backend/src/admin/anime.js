import express from 'express';

import Anime from '../models/anime';

const router = express.Router();

router.get('/', async (req, res) => {
  const animes = await Anime.find({});
  const style = "display: flex; flex-direction: column; align-items: flex-start;";

  return res.send(`
    <h1>Anime</h1>
    <h2>Create</h2>
    <form action="/admin/anime/create" method="POST" style="${style}">
      <input type="text" placeholder="name" name="name"/>
      <input type="submit" value="create"/>
    </form>
    <h2>Update</h2>
    <form action="/admin/anime/update" method="POST" style="${style}">
      <input type="text" placeholder="_id" name="_id"/>
      <h4>Update values:</h4>
      <input type="text" placeholder="name" name="name"/>
      <input type="submit" value="update"/>
    </form>
    <h2>Delete</h2>
    <form action="/admin/anime/delete" method="POST" style="${style}">
      <input type="text" placeholder="_id" name="_id"/>
      <input type="submit" value="delete"/>
    </form>
    <h2>Read</h2>
    <pre>${JSON.stringify(animes, null, 2)}</pre>
  `);
});

router.post('/create', async (req, res) => {
  try {
    const anime = new Anime(req.body);
    await anime.save();
  }
  catch (err) {
    console.error(err);
    return res.send('operation error');
  }
  return res.redirect('/admin/anime');
});

router.post('/update', async (req, res) => {
  try {
    const { _id, name } = req.body;
    const $set = { _id };
    if (name.length !== 0) $set.name = name;
    await Anime.updateOne({ _id }, { $set });
  }
  catch (err) {
    console.error(err);
    return res.send('operation error');
  }
  return res.redirect('/admin/anime');
});

router.post('/delete', async (req, res) => {
  try {
    const { _id } = req.body;
    await Anime.deleteOne({ _id });
  }
  catch (err) {
    console.error(err);
    return res.send('operation error');
  }
  return res.redirect('/admin/anime');
});

export default router;