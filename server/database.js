const { MongoClient } = require('mongodb');

const DATABASE_URI = (process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost:27017/workspace-db');

var _db;

module.exports = {
  connect: function (callback) {
    MongoClient.connect(DATABASE_URI, { useNewUrlParser: true }, function(err, db) {
      _db = db;
      return callback(err);
    });
  },

  get: function() {
    return _db;
  }
}
