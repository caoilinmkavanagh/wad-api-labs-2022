import userModel from '../api/users/userModel.js';
import genreModel from '../api/genres/genreModel.js';
import genres from './genres.js';
import users from './users.js';
import dotenv from 'dotenv';
import dbConnection from '../db/index.js';
import movieModel from '../api/movies/movieModel.js';
import movies from './movies.js';

dotenv.config();

// deletes all movies documents in collection and inserts test data
export async function loadMovies() {
   console.log('load seed data');
   console.log(movies.length);
   try {
     await movieModel.deleteMany();
     await movieModel.collection.insertMany(movies);
     console.info(`${movies.length} Movies were successfully stored.`);
   } catch (err) {
     console.error(`failed to Load movie Data: ${err}`);
   }
 }

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
      .then(() => {
         return Promise.all([loadUsers(), loadGenres(), loadMovies()]);
      })
      .then(() => {
         console.log('All seed data loaded successfully.');
      })
      .catch(err => {
         console.error(`Failed: ${err}`);
      });
}


/* if (process.env.SEED_DB) {
   dbConnection
      .then(loadUsers, loadGenres)
      .catch(err => {
         console.error(`Failed to connect to database: ${err}`);
      });
} */
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