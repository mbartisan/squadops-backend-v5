import { makeDb } from '../../src/controllers/db';

(async function setupDb() {
  console.log('Setting up database...');
  // database collection will automatically be created if it does not exist
  // indexes will only be added if they don't exist
  const db = makeDb();
  const result = await db.query('CREATE TABLE IF NOT EXISTS `users` ')
    .createIndexes([
      { key: { hash: 1 }, name: 'hash_idx' },
      { key: { postId: -1 }, name: 'postId_idx' },
      { key: { replyToId: -1 }, name: 'replyToId_idx' },
    ]);
  console.log(result);
  console.log('Database setup complete...');
  process.exit();
}());
