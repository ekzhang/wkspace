import express from 'express';
import scraper from '../scraper.js';

import { randomId } from '../utils.js';
import { Workspace, Share } from '../models.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/problem', (req, res) => {
  const type = req.query.type;
  const pid = req.query.id;
  if (!type || !pid)
    return res.status(400).send('Missing `type` or `id` parameter');

  scraper(type, pid)
    .then((value) => res.json(value))
    .catch((e) => res.status(400).send(e.message));
});

router.get('/workspace', async (req, res) => {
  const { ids } = req.query;
  if (typeof ids !== 'string')
    return res.status(400).send('Missing list of ids');
  const docs = await Workspace.find(
    { id: { $in: ids.split(',') } },
    'id updatedAt problem.title solution.language',
    { sort: { updatedAt: -1 } }
  );
  return res.json(docs);
});

router.post('/workspace', async (req, res) => {
  const type = req.body.type;
  const pid = req.body.id;
  if (!type || !pid)
    return res.status(400).send('Missing `type` or `id` parameter');

  let problem;
  try {
    problem = await scraper(type, pid);
  } catch (e) {
    return res.status(400).send(e.message);
  }
  const obj = new Workspace({ problem, id: await randomId() });
  await obj.save();
  return res.json(obj);
});

router.get('/workspace/:id', async (req, res) => {
  if (typeof req.params.id !== 'string')
    return res.status(400).send('Missing `id` parameter');
  return res.json(await Workspace.findOne({ id: req.params.id }));
});

router.delete('/workspace/:id', async (req, res) => {
  if (typeof req.params.id !== 'string')
    return res.status(400).send('Missing `id` parameter');
  return res.json(await Workspace.findOneAndDelete({ id: req.params.id }));
});

router.put('/workspace/:id/save', async (req, res) => {
  if (typeof req.params.id !== 'string')
    return res.status(400).send('Missing `id` parameter');
  const obj = await Workspace.findOneAndUpdate(
    { id: req.params.id },
    { solution: req.body },
    { new: true }
  );
  return res.json(obj);
});

router.post('/share', async (req, res) => {
  const { language, code } = req.body;
  if (typeof language !== 'number' || typeof code !== 'string')
    return res.status(400).send('Missing `language` or `code` parameter');

  const obj = new Share({
    solution: { language, code },
    id: await randomId(),
  });
  await obj.save();
  return res.json(obj);
});

router.get('/share/:id', async (req, res) => {
  if (typeof req.params.id !== 'string')
    return res.status(400).send('Missing `id` parameter');
  return res.json(await Share.findOne({ id: req.params.id }));
});

export default router;
