const assert = require('assert');
const axios = require('axios');
const cheerio = require('cheerio');

cheerio.prototype.justtext = function() {
  return this.clone().children().remove().end().text();
}

cheerio.prototype.textArray = function() {
  return this.map(function() {
    return cheerio(this).text();
  }).toArray();
}

module.exports = {
  getCodeforcesProblem: async function (problem) {
    try {
      const url = `https://codeforces.com/contest/${problem.contest}/problem/${problem.problem}`;
      const response = await axios.get(url);
      assert.equal(response.status, 200);
      const $ = cheerio.load(response.data);
      const statement = $('.problem-statement');
      const header = statement.find('.header');

      let sampleTests = [];
      const tests = statement.find('.sample-test').children();
      for (let i = 0; i < tests.length; i += 2) {
        const input = tests.eq(i).find('pre').html().replace(/<br>/g, '\n').replace(/&#xA0;/g, '\xa0');
        const output = tests.eq(i + 1).find('pre').html().replace(/<br>/g, '\n').replace(/&#xA0;/g, '\xa0');
        sampleTests.push({ input, output });
      }

      return {
        title: header.find('.title').text(),
        timeLimit: header.find('.time-limit').justtext(),
        memoryLimit: header.find('.memory-limit').justtext(),
        input: header.find('.input-file').justtext(),
        output: header.find('.output-file').justtext(),
        statement: {
          text: statement.children().eq(1).children().textArray(),
          inputSpec: statement.find('.input-specification > p').textArray(),
          outputSpec: statement.find('.output-specification > p').textArray(),
          sampleTests,
          notes: statement.find('.note > p').textArray(),
        }
      };
    }
    catch (err) {
      return {
        status: "error",
        message: "Could not get or parse problem"
      };
    }
  }
}
