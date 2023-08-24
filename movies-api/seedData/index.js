import userModel from '../api/users/userModel.js';
import users from './users.js';
import dotenv from 'dotenv';
import dbConnection from '../db/index.js';


dotenv.config();

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
   dbConnection
      .then(loadUsers)
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