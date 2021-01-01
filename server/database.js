import mongoose from 'mongoose';

const DATABASE_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI
    : 'mongodb://localhost:27017/workspace-db';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

export function connect(cb) {
  mongoose.connect(DATABASE_URI);
  const db = mongoose.connection;
  db.on('error', cb);
  db.once('open', () => {
    console.log('Connected to MongoDB.');
    cb();
  });
}
