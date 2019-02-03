const assert = require('assert');
const express = require('express');
const scraper = require('../scraper');
const { Workspace } = require('../models');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/problem', async (req, res) => {
  const type = req.query.type;
  const pid = req.query.id;
  if (!type || !pid)
    return res.status(400).send('Missing `type` or `id` parameter');

  if (type === 'CF') {
    // Codeforces
    const match = pid.match(/([0-9]+)([A-Z][A-Z0-9]*)$/);
    if (!match)
      return res.status(400).send('Invalid Codeforces problem ID');
    const contest = match[1];
    const problem = match[2];
    return res.json(await scraper.getCodeforcesProblem({ contest, problem }));
  }
  else {
    return res.status(400).send('Invalid problem type');
  }
});

router.get('/workspace', async (req, res) => {
  return res.json(await Workspace.find({}, null, { sort: { updatedAt: -1 } }));
});

router.post('/workspace', async (req, res) => {
  const obj = new Workspace(req.body);
  await obj.save();
  return res.json(obj);
});

router.get('/workspace/:id', async (req, res) => {
  return res.json(await Workspace.findById(req.params.id));
});

router.put('/workspace', async (req, res) => {
  const obj = await Workspace.findByIdAndUpdate(req.body._id, { new: true });
  return res.json(obj);
});

module.exports = router;
