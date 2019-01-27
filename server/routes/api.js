const assert = require('assert');
const express = require('express');
const router = express.Router();

const scraper = require('../scraper');
const db = require('../database').get();

router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/passwords', (req, res) => {
  // dummy endpoint
  const passwords = [...Array(5)].map(() =>
    'hello world ' + Math.random()
  )
  console.log(passwords);
  res.json(passwords);
});

router.get('/problem', async (req, res) => {
  const type = req.query.type;
  const pid = req.query.id;
  if (!type || !pid)
    return res.status(400).send("Missing `type` or `id` parameter");

  if (type === "CF") {
    // Codeforces
    const match = pid.match(/([0-9]+)([A-Z][A-Z0-9]*)$/);
    if (!match)
      return res.status(400).send("Invalid Codeforces problem ID");
    const contest = match[1];
    const problem = match[2];
    return res.json(await scraper.getCodeforcesProblem({ contest, problem }));
  }
  else {
    return res.status(400).send("Invalid problem type");
  }
});

module.exports = router;
