import express from 'express';
import { movieReviews  } from './moviesData.js';
import { getUpcomingMovies } from '../tmdb-api.js';
import { getPopularPeople } from '../tmdb-api.js';
//import { getPersonDetails } from '../tmdb-api.js';
import { getMovieById } from '../tmdb-api.js';
//import { getPersonDetails } from '../tmdb-api.js';
//import { movies, movieDetails, movieReviews  } from './moviesData.js';
import uniqid from 'uniqid';
import movieModel from './movieModel.js';
import asyncHandler from 'express-async-handler';

const router = express.Router(); 

router.get('/', asyncHandler(async (req, res) => {
    const movies = await movieModel.find();
    res.status(200).json(movies);
}));

/* router.get('/', (req, res) => {
    res.json(movies);
});
 */
// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

// Get movie reviews
router.get('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);
    // find reviews in list
    if (movieReviews.id == id) {
        res.status(200).json(movieReviews);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

//Post a movie review
router.post('/:id/reviews', (req, res) => {
    const id = parseInt(req.params.id);
    
    if (movieReviews.id == id) {
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        req.body.id = uniqid();
        movieReviews.results.push(req.body); 
        res.status(201).json(req.body);
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

//upcoming route
router.get('/tmdb/upcoming', asyncHandler( async(req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
  }));

//popular people route
router.get('/tmdb/popular', asyncHandler(async (req, res) => {
    const popularPeople = await getPopularPeople(); 
    res.status(200).json(popularPeople);
  }));

//get details of movie
  router.get('/tmdb/:id', asyncHandler(async (req, res) => {
    const movieId = req.params.id;
    try {
      const movie = await getMovieById(movieId);
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }));
  
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

  


export default router;