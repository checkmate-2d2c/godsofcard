import express from 'express';

import News from '../models/news';

const router = express.Router();

router.get('/', async (req, res) => {
  const newsList = await News.find({});
  const style = "display: flex; flex-direction: column; align-items: flex-start;";

  return res.send(`
    <h1>News</h1>
    <h2>Create</h2>
    <form action="/admin/news/create" method="POST" style="${style}">
      <input type="text" placeholder="title" name="title"/>
      <input type="text" placeholder="content" name="content"/>
      <input type="submit" value="create"/>
    </form>
    <h2>Update</h2>
    <form action="/admin/news/update" method="POST" style="${style}">
      <input type="text" placeholder="_id" name="_id"/>
      <h4>Update values:</h4>
      <input type="text" placeholder="title" name="title"/>
      <input type="text" placeholder="content" name="content"/>
    </form>
    <h2>Delete</h2>
    <form action="/admin/news/delete" method="POST" style="${style}">
      <input type="text" placeholder="_id" name="_id"/>
      <input type="submit" value="delete"/>
    </form>
    <h2>Read</h2>
    <pre>${JSON.stringify(newsList, null, 2)}</pre>
  `);
});

router.post('/create', async (req, res) => {
  try {
    const news = new News(req.body);
    await news.save();
  }
  catch (err) {
    console.error(err);
    return res.send('operation error');
  }
  return res.redirect('/admin/news');
});

router.post('/update', async (req, res) => {
  try {
    const { _id, title, content } = req.body;
    const $set = { _id };
    if (title.length !== 0) $set.title = title;
    if (content.length !== 0) $set.content = content;
    await News.updateOne({ _id }, { $set });
  }
  catch (err) {
    console.error(err);
    return res.send('operation error');
  }
  return res.redirect('/admin/news');
});

router.post('/delete', async (req, res) => {
  try {
    const { _id } = req.body;
    await News.deleteOne({ _id });
  }
  catch (err) {
    console.error(err);
    return res.send('operation error');
  }
  return res.redirect('/admin/news');
});

export default router;