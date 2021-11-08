import mongoose from 'mongoose';

const DATABASE_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI
    : 'mongodb://localhost:27017/workspace-db';

export function connect(cb) {
  mongoose.connect(DATABASE_URI).then(() => {
    const db = mongoose.connection;
    db.on('error', cb);
    db.once('open', () => {
      console.log('Connected to MongoDB.');
      cb();
    });
  });
}
