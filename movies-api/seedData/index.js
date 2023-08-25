import userModel from '../api/users/userModel.js';
import genreModel from '../api/genres/genreModel.js';
import genres from './genres.js';
import users from './users.js';
import dotenv from 'dotenv';
import dbConnection from '../db/index.js';


dotenv.config();

// deletes all user documents in collection and inserts test data
async function loadUsers() {
   console.log('load user Data');
   try {
     await userModel.deleteMany();
     await users.forEach(user => userModel.create(user));
     console.info(`${users.length} users were successfully stored.`);
   } catch (err) {
     console.error(`failed to Load user Data: ${err}`);
   }
 }

async function loadGenres() {
   console.log('load genre Data');
   try {
      await genreModel.deleteMany();
      await genreModel.collection.insertMany(genres);
      console.info(`${users.length} genres were successfully stored.`);
   } catch (err) {
      console.error(`failed to Load genre Data: ${err}`);
   }
}

if (process.env.SEED_DB) {
   dbConnection
      .then(loadUsers, loadGenres)
      .catch(err => {
         console.error(`Failed to connect to database: ${err}`);
      });
}
/* import userModel from '../api/users/userModel.js';
import users from './users.js';
import dotenv from 'dotenv';

dotenv.config();

// deletes all user documents in collection and inserts test data
async function loadUsers() {
  console.log('load user Data');
  try {
    await userModel.deleteMany();
    await userModel.collection.insertMany(users);
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
}

if (process.env.SEED_DB) {
  loadUsers();
}  */