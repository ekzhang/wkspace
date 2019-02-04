const assert = require('assert');
const express = require('express');
const scraper = require('../scraper');
const { Workspace } = require('../models');

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
    .then(value => res.json(value))
    .catch(e => res.status(400).send(e));
});

router.get('/workspace', async (req, res) => {
  return res.json(await Workspace.find({}, null, { sort: { updatedAt: -1 } }));
});

router.post('/workspace', async (req, res) => {
  const type = req.body.type;
  const pid = req.body.id;
  if (!type || !pid)
    return res.status(400).send('Missing `type` or `id` parameter');

  try {
    const problem = await scraper(type, pid);
    const obj = new Workspace({ problem });
    await obj.save();
    return res.json(obj);
  }
  catch (e) {
    res.status(400).send(e)
  }
});

router.get('/workspace/:id', async (req, res) => {
  return res.json(await Workspace.findById(req.params.id));
});

router.delete('/workspace/:id', async (req, res) => {
  return res.json(await Workspace.findByIdAndDelete(req.params.id));
});

router.put('/workspace/:id/save', async (req, res) => {
  const obj = await Workspace.findByIdAndUpdate(req.params.id, { solution: req.body }, { new: true });
  return res.json(obj);
});

module.exports = router;
